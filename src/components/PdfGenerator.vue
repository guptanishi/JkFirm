<template>
  <div id="content" style="min-height:100%;
   position:relative; margin:20px">
    <div class="container" style="border: 2px solid #000; height: 1080px; ">
      <div class="row justify-content-end" style="border-bottom:2px solid #000">
        <div class="col-4">
          <img src="../../public/JK-Logo.png" alt="..." class="img-thumbnail imageStyle" />
        </div>
        <div class="col-8" style="margin-top:20px">
          <div class="row">
            <div class="col-9 text-center text-danger">
              <h5>Tax Invoice</h5>
            </div>
            <div class="col-3 justify-content-start">
              <h5>{{invoiceType}}</h5>
            </div>
          </div>
          <div class="row justify-content-center text-danger">
            <h4>JAGDISH KRISHI YANTRA UDYOG</h4>
          </div>
          <div class="row justify-content-center text-danger">
            <h5>G-35, Industrial Area, Panki III, Kanpur</h5>
          </div>
          <div class="row justify-content-start">Contact No. : 09415926676</div>
          <div class="row justify-content-start">Email: jagdishkrishiyantraudyog@gmail.com</div>
          <div class="row justify-content-start">
            <b>GST No : 09AHKPG1772G1ZA</b>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6 justify-content-start" v-if="invoiceData.customer !=undefined">
          <div class="row">Invoice No : {{invoiceData.invoiceNumber}}</div>
          <div class="row">Customer Name : {{invoiceData.customer["customerName"]}}</div>
          <div
            class="row"
          >Address: {{invoiceData.customer["address"]}} {{invoiceData.customer["city"]}} {{invoiceData.customer["state"]}}</div>
          <div class="row">Contact No: {{invoiceData.customer["contact"]}}</div>
        </div>
        <div class="col-4">
          <div class="row justify-content-end" v-if="invoiceData.customer !=undefined">
            <div>Invoice Date: {{this.customFormatter(invoiceData.invoiceDate)}}</div>
            <br />
            <div>GST/Adhar No: {{invoiceData.customer["gstNumber"]}}</div>
          </div>
        </div>
      </div>

      <div>
        <div class="row top-buffer">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Product/HSN</th>
                <th>Price</th>
                <th>unit</th>
                <th>quantity</th>
                <th>Total</th>
                <th v-if="invoiceData.delMode == 'outside state'" colspan="2">SGST</th>
                <th v-else>GST</th>
                <th v-if="invoiceData.delMode == 'outside state'" colspan="2">CGST</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td v-if="invoiceData.delMode == 'outside state'">Per%</td>
                <td v-if="invoiceData.delMode == 'outside state'">Amt</td>
                <td v-else>&nbsp;</td>
                <td v-if="invoiceData.delMode == 'outside state'">Per%</td>
                <td v-if="invoiceData.delMode == 'outside state'">Amt</td>
                <td>&nbsp;</td>
              </tr>
              <tr v-for="(product,index) in invoiceData.products" :key="product.productCode">
                <td>{{ index + 1}}.</td>
                <td>{{ product.productName }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.unit }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ product.price * product.quantity }}</td>
                <td v-if="invoiceData.delMode == 'outside state'">{{ product.vat / 2 }}</td>
                <td
                  v-if="invoiceData.delMode == 'outside state'"
                >{{ (product.price * product.quantity * product.vat)/100 }}</td>
                <td v-else>{{ product.vat }}%</td>
                <td v-if="invoiceData.delMode == 'outside state'">{{ product.vat / 2 }}</td>
                <td
                  v-if="invoiceData.delMode == 'outside state'"
                >{{ (product.price * product.quantity * product.vat)/100 }}</td>
                <td>{{ product.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="row top-buffer">
          <div class="col-6">
            <span>Chargable Amount In Words</span>
            <br />
            <span>
              <strong>{{numberToEnglish( Number(invoiceData.totalAmount)) | upperCase}} ONLY</strong>
            </span>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-6">
                <div class="row text-center">Grand Total</div>
              </div>
              <div class="col-6">
                <div class="row text-center">{{invoiceData.totalAmount}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row top-buffer" style="position: absolute; bottom: 0;width: 100%;margin-top:50px">
        <div class="col-9">
          <p>
            *Terms and conditions*
            <br />
            <span>1- All disputes subject to Kanpur Juridiction only.</span>
            <br />
            <span>2-A/C No- 20292185271</span>
            <br />
            <span>3- IFSC: ALLA0211265</span>
            <br />
            <span>Bank- Allahabad Bank</span>
          </p>
        </div>
        <div class="col-3">Authorised Signatory</div>
      </div>
    </div>
  </div>
</template>

<script>
import vue from "vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import moment from "moment";
import { EventBus } from "../../event-bus.js";

var state = {
  date: new Date()
};

export default {
  name: "PdfGenerator",
  props: ["info", "invoiceType"],

  data() {
    return {
      invoiceData: {}
    };
  },
  watch: {
    invoiceType(newValue, oldValue) {
      if (newValue != oldValue) {
        this.openNewTab();
      }
    }
  },
  mounted() {
    EventBus.$on("showContent", () => {
      document.getElementById("content").style.display = "block";
    });
    this.openNewTab();
  },

  methods: {
    customFormatter(date) {
      return moment(date).format("DD/MM/YYYY");
    },

    openNewTab() {
      this.invoiceData = this.info;
      var element = document.getElementById("content");
      var doc = new jsPDF("p", "mm", "a4");
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      var opt = {
        fileName: `invoice${state.date}.pdf`,
        html2canvas: {
          scale: 1
        },
        jsPDF: doc
      };
      html2pdf()
        .from(element)
        .toPdf()
        .get("pdf")
        .then(function(pdf) {
          window.open(pdf.output("bloburl"), "_blank");
          EventBus.$emit("hideContent");
        });
    },

    numberToEnglish(amount) {
      var words = new Array();
      words[0] = "";
      words[1] = "One";
      words[2] = "Two";
      words[3] = "Three";
      words[4] = "Four";
      words[5] = "Five";
      words[6] = "Six";
      words[7] = "Seven";
      words[8] = "Eight";
      words[9] = "Nine";
      words[10] = "Ten";
      words[11] = "Eleven";
      words[12] = "Twelve";
      words[13] = "Thirteen";
      words[14] = "Fourteen";
      words[15] = "Fifteen";
      words[16] = "Sixteen";
      words[17] = "Seventeen";
      words[18] = "Eighteen";
      words[19] = "Nineteen";
      words[20] = "Twenty";
      words[30] = "Thirty";
      words[40] = "Forty";
      words[50] = "Fifty";
      words[60] = "Sixty";
      words[70] = "Seventy";
      words[80] = "Eighty";
      words[90] = "Ninety";
      amount = amount.toString();
      var atemp = amount.split(".");
      var number = atemp[0].split(",").join("");
      var n_length = number.length;
      var words_string = "";
      if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
          received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
          n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
          if (i == 0 || i == 2 || i == 4 || i == 7) {
            if (n_array[i] == 1) {
              n_array[j] = 10 + parseInt(n_array[j]);
              n_array[i] = 0;
            }
          }
        }
        let value = "";
        for (var i = 0; i < 9; i++) {
          if (i == 0 || i == 2 || i == 4 || i == 7) {
            value = n_array[i] * 10;
          } else {
            value = n_array[i];
          }
          if (value != 0) {
            words_string += words[value] + " ";
          }
          if (
            (i == 1 && value != 0) ||
            (i == 0 && value != 0 && n_array[i + 1] == 0)
          ) {
            words_string += "Crores ";
          }
          if (
            (i == 3 && value != 0) ||
            (i == 2 && value != 0 && n_array[i + 1] == 0)
          ) {
            words_string += "Lakhs ";
          }
          if (
            (i == 5 && value != 0) ||
            (i == 4 && value != 0 && n_array[i + 1] == 0)
          ) {
            words_string += "Thousand ";
          }
          if (
            i == 6 &&
            value != 0 &&
            n_array[i + 1] != 0 &&
            n_array[i + 2] != 0
          ) {
            words_string += "Hundred and ";
          } else if (i == 6 && value != 0) {
            words_string += "Hundred ";
          }
        }
        words_string = words_string.split("  ").join(" ");
      }
      return words_string;
    }
  }
};
</script>

 <style>
.border {
  border: solid 4px #000;
}
.imageStyle {
  margin-top: 50px;
  padding: 10px;
}
.top-buffer {
  border-top: solid 4px #000;
  margin-top: 20px;
}

div.absolute {
  position: fixed;
  bottom: 0;
}
</style>