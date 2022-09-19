<template>
  <div id="content" style="min-height: 100%; position: relative; margin: 20px">
    <div class="container bold" style="border: 2px solid #000; height: 1080px">
      <div
        class="row justify-content-end"
        style="border-bottom: 3px solid #000"
      >
        <div class="col-4">
          <img
            src="../../public/JK-Logo.png"
            alt="..."
            class="img-thumbnail imageStyle"
          />
        </div>
        <div class="col-8" style="margin-top: 20px">
          <div class="row">
            <div class="col-9 text-center text-danger">
              <h5>Tax Invoice</h5>
            </div>
            <div class="col-3 justify-content-start">
              <h5>{{ invoiceType }}</h5>
            </div>
          </div>
          <div class="row justify-content-center text-danger">
            <h3>
              <b>JAGDISH KRISHI YANTRA UDYOG</b>
            </h3>
          </div>
          <div class="row justify-content-center text-danger">
            <h5>G-35, Industrial Area, Panki III, Kanpur</h5>
          </div>
          <div class="row justify-content-start">Contact No. : 09415926676</div>
          <div class="row justify-content-start">
            Email: jagdishkrishiyantraudyog@gmail.com
          </div>
          <div class="row justify-content-start">
            <b>GST No : 09AHKPG1772G1ZA</b>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="col-6 justify-content-start"
          v-if="invoiceData.customer != undefined"
        >
          <div class="row">
            <div class="col-5">Invoice No :</div>
            <div class="col-7">{{ invoiceData.invoiceNumber }}</div>
          </div>
          <div class="row">
            <div class="col-5">Customer Name :</div>
            <div class="col-7">{{ invoiceData.customer["customerName"] }}</div>
          </div>
          <div class="row">
            <div class="col-5">Address:</div>
            <div class="col-7">
              {{ invoiceData.customer["address"] }}
              {{ invoiceData.customer["city"] }}
              {{ invoiceData.customer["state"] }}
            </div>
          </div>
          <div class="row">
            <div class="col-5">Contact No:</div>
            <div class="col-7">
              {{ invoiceData.customer["contact"] }}
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="row" v-if="invoiceData.customer != undefined">
            <div class="col-5">Invoice Date:</div>
            <div class="col-7">
              {{ this.customFormatter(invoiceData.invoiceDate) }}
            </div>
          </div>
          <div class="row" v-if="invoiceData.customer != undefined">
            <div class="col-5">GST/Adhar No:</div>
            <div class="col-7">{{ invoiceData.customer["gstNumber"] }}</div>
          </div>
        </div>
      </div>

      <div>
        <div class="row top-buffer lightBold">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Product/HSN</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th
                  v-if="invoiceData.delMode == 'within state'"
                  colspan="2"
                  style="text-align: center"
                >
                  SGST
                </th>
                <th v-else colspan="2" style="text-align: center">IGST</th>
                <th
                  v-if="invoiceData.delMode == 'within state'"
                  colspan="2"
                  style="text-align: center"
                >
                  CGST
                </th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody class="bold bigFont">
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>Per%</td>
                <td>Amt</td>
                <td v-if="invoiceData.delMode == 'within state'">Per%</td>
                <td v-if="invoiceData.delMode == 'within state'">Amt</td>
                <td v-if="invoiceData.delMode == 'within state'">&nbsp;</td>
              </tr>
              <tr
                v-for="(product, index) in invoiceData.products"
                :key="product.productCode"
              >
                <td>{{ index + 1 }}.</td>
                <td>{{ product.productName }} - {{ product.HSN }}</td>
                <td>Rs. {{ parseFloat(product.price).toFixed(2) }}</td>
                <td>{{ product.quantity }} {{ product.unit }}</td>
                <td>{{ product.price * product.quantity }}</td>
                <td v-if="invoiceData.delMode == 'within state'">
                  {{ product.vat / 2 }} %
                </td>
                <td v-else>{{ product.vat }} %</td>
                <td v-if="invoiceData.delMode == 'within state'">
                  {{
                    parseFloat(
                      (product.price * product.quantity * (product.vat / 2)) /
                        100
                    ).toFixed(2)
                  }}
                </td>
                <td v-else>
                  {{
                    parseFloat(
                      (product.price * product.quantity * product.vat) / 100
                    ).toFixed(2)
                  }}
                </td>
                <td v-if="invoiceData.delMode == 'within state'">
                  {{ product.vat / 2 }}%
                </td>
                <td v-if="invoiceData.delMode == 'within state'">
                  {{
                    parseFloat(
                      (product.price * product.quantity * (product.vat / 2)) /
                        100
                    ).toFixed(2)
                  }}
                </td>
                <td>{{ parseFloat(product.total).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="row top-buffer bigFont">
          <div class="col-6">
            <span>Chargable Amount In Words</span>
            <br />
            <span>
              <strong
                >RUPEES
                {{
                  numberToEnglish(Math.ceil(invoiceData.totalAmount))
                    | upperCase
                }}
                ONLY</strong
              >
            </span>
          </div>
          <div class="col-6" style="border-style: none none solid solid">
            <div class="row">
              <div class="col-6" style="border-right: 1px solid #000">
                <div
                  v-if="invoiceData.delMode == 'within state'"
                  class="row"
                  style="margin-left: 30px"
                >
                  SGST Total
                </div>
                <div v-else class="row" style="margin-left: 30px">
                  IGST Total
                </div>
                <div
                  v-if="invoiceData.delMode == 'within state'"
                  class="row"
                  style="margin-left: 30px"
                >
                  CGST Total
                </div>
                <div v-else class="row" style="margin-left: 30px">&nbsp;</div>
                <div class="row" style="margin-left: 30px">Grand Total</div>
              </div>
              <div class="col-6">
                <div
                  v-if="invoiceData.delMode == 'within state'"
                  class="row"
                  style="margin-left: 30px"
                >
                  {{ parseFloat(this.sumOfSGST()).toFixed(2) }}
                </div>
                <div v-else class="row" style="margin-left: 30px">
                  {{ parseFloat(this.sumOfGST()).toFixed(2) }}
                </div>
                <div
                  v-if="invoiceData.delMode == 'within state'"
                  class="row"
                  style="margin-left: 30px"
                >
                  {{ parseFloat(this.sumOfCGST()).toFixed(2) }}
                </div>
                <div v-else class="row" style="margin-left: 30px">&nbsp;</div>

                <div class="row" style="margin-left: 30px">
                  {{
                    parseFloat(Math.ceil(invoiceData.totalAmount)).toFixed(2)
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="row top-buffer"
        style="position: absolute; bottom: 0; width: 100%; margin-top: 50px"
      >
        <div class="col-8">
          <p>
            *Terms and conditions*
            <br />
            <span>1- All disputes subject to Kanpur Juridiction only.</span>
            <br />
            <span>2-A/C No- 20292185271</span>
            <br />
            <span>3- IFSC: IDIB000K579</span>
            <br />
            <span>Bank- Indian Bank</span>
          </p>
        </div>
        <div class="col-4" style="margin-top: 70px">
          <span style="border-top: 1px solid #000">Authorised Signatory</span>
        </div>
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
  date: new Date(),
};

export default {
  name: "PdfGenerator",
  props: ["info", "invoiceType"],

  data() {
    return {
      invoiceData: {},
      SGST: [],
      CGST: [],
    };
  },
  watch: {
    invoiceType(newValue, oldValue) {
      if (newValue != oldValue) {
        this.openNewTab();
      }
    },
  },
  mounted() {
    EventBus.$on("showContent", () => {
      if (document.getElementById("content") != null)
        document.getElementById("content").style.display = "block";
    });
    this.openNewTab();
  },

  methods: {
    customFormatter(date) {
      return moment(date).format("DD/MM/YYYY");
    },

    sumOfSGST() {
      let SGST = 0;
      if (this.invoiceData) {
        this.invoiceData.products.forEach((product) => {
          SGST =
            SGST + (product.price * product.quantity * (product.vat / 2)) / 100;
        });
      }
      console.log(SGST);
      return SGST;
    },
    sumOfCGST() {
      let CGST = 0;
      if (this.invoiceData) {
        this.invoiceData.products.forEach((product) => {
          CGST =
            CGST + (product.price * product.quantity * (product.vat / 2)) / 100;
        });
      }
      console.log(CGST);
      return CGST;
    },

    sumOfGST() {
      let GST = 0;
      if (this.invoiceData != undefined) {
        if (this.invoiceData.products != undefined) {
          this.invoiceData.products.forEach((product) => {
            GST = GST + (product.price * product.quantity * product.vat) / 100;
          });
        }
      }
      console.log(GST);
      return GST;
    },

    openNewTab() {
      //alert("dsfsdf");
      this.invoiceData = this.info;
      console.log(this.invoiceData);
      var element = document.getElementById("content");
      var doc = new jsPDF("p", "in", "a4");
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      var opt = {
        fileName: `invoice${state.date}.pdf`,
        html2canvas: {
          scale: 5,
        },
        jsPDF: doc,
      };
      html2pdf()
        .set(opt)
        .from(element)
        .toPdf()
        .get("pdf")
        .then(function (pdf) {
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
    },
  },
};
</script>

 <style>
#content {
  font-family: "Helvetica", "Arial", sans-serif;
  font-size: 9pt;

}

.bold {
  font-weight: 900;
  font-family: "Times New Roman", Times, serif;
}

.lightBold {
  font-weight: 500;
  font-family: "Times New Roman", Times, serif;
}

.imageStyle {
  margin-top: 50px;
  padding: 10px;
}
.top-buffer {
  border-top: solid 2px #000;
  margin-top: 20px;
}

div.absolute {
  position: fixed;
  bottom: 0;
}
.ml-50 {
  margin-left: 30px;
}
.bigFont {
  font-size: 9pt;
}
</style>