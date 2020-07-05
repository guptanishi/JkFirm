<template>
  <div id="content" class="container" style="border: solid 4px #000; position: relative">
    <div class="row justify-content-end">
      <div class="col-4">
        <img src="../../public/download.png" alt="..." class="img-thumbnail imageStyle" />
      </div>
      <div class="col-8">
        <div class="row justify-content-center text-danger">
          <h5>Tax Invoice</h5>
        </div>
        <div class="row justify-content-center text-danger">
          <h4>JAGDISH KRISHI YANTRA UDYOG</h4>
        </div>
        <div class="row justify-content-center text-danger">
          <h5>G-35, Industrial Area, Panki III, Kanpur</h5>
        </div>
        <div class="row justify-content-start">
          <span>Contact No. : 09415926676</span>
          <br />
          <span>Email: jagdishkrishiyantraudyog@gmail.com</span>
          <span>
            <b>GST No : 09AHKPG1772G1ZA</b>
          </span>
        </div>
      </div>
    </div>
    <div class="row top-buffer">
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
    <div class="row top-buffer">
      <table class="table table-bordered" style="padding: 10px">
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
            <td v-else>>&nbsp;</td>
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
            <td v-if="invoiceData.delMode == 'outside state'">{{ product.vat / 2 }}%</td>
            <td
              v-if="invoiceData.delMode == 'outside state'"
            >{{ (product.price * product.quantity * product.vat)/100 }}</td>
            <td v-else>{{ product.vat }}%</td>
            <td v-if="invoiceData.delMode == 'outside state'">{{ product.vat / 2 }}%</td>
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
          <strong>{{invoiceData.totalAmount | toWords | upperCase}} ONLY</strong>
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
    <!-- <div class="row" style="position: absolute; bottom: 5px; background-color: green">
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
    </div>-->
  </div>
</template>

<script>
import vue from "vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import moment from "moment";

export default {
  name: "pdfGenerator",
  props: ["info"],
  data() {
    return {
      invoiceData: {}
    };
  },
  mounted() {
    this.invoiceData = this.info;
    var element = document.getElementById("content");
    var doc = new jsPDF("p", "mm", [297, 210]);
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    var opt = {
      margin: 2,
      filename: "myfile.pdf",
      html2canvas: {
        scale: 1
      },
      jsPDF: doc
    };

    html2pdf(element, opt);
  },
  methods: {
    customFormatter(date) {
      return moment(date).format("DD/MM/YYYY");
    }
  }
};
</script>

 <style>
.border {
  border: solid 4px #000;
}
.imageStyle {
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