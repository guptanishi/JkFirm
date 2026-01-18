<template>
  <div class="page-container-modern">
    <div class="page-header">
      <div class="container-modern">
        <div class="header-content">
          <div>
            <h1 class="page-title">
              <i class="fa fa-cube"></i>
              Add New Product
            </h1>
            <p class="page-subtitle">Create a new product in your inventory</p>
          </div>
          <button @click="goBack" class="btn-modern btn-secondary-modern">
            <i class="fa fa-arrow-left"></i>
            Back to Products
          </button>
        </div>
      </div>
    </div>

    <div class="container-modern">
      <div class="form-card-wrapper">
        <div class="card-modern">
          <div class="card-header-modern">
            <i class="fa fa-info-circle"></i>
            Product Information
          </div>
          <div class="card-body-modern">
            <form @submit.prevent="create">
              <div class="grid-modern grid-cols-2">
                <!-- Product Code -->
                <div class="form-group-modern">
                  <label class="form-label-modern">
                    Product Code
                    <span class="required">*</span>
                  </label>
                  <input
                    type="text"
                    v-model="productCode"
                    class="form-input-modern"
                    placeholder="e.g., PROD001"
                    readonly
                  />
                  <span class="form-hint">Auto-generated product code</span>
                </div>

                <!-- Product Name -->
                <div class="form-group-modern">
                  <label class="form-label-modern">
                    Product Name
                    <span class="required">*</span>
                  </label>
                  <input
                    type="text"
                    v-model="productName"
                    class="form-input-modern"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <!-- Unit -->
                <div class="form-group-modern">
                  <label class="form-label-modern">
                    Unit
                    <span class="required">*</span>
                  </label>
                  <select v-model="unit" class="form-select-modern" required>
                    <option value="" disabled>Select Unit</option>
                    <option value="KG">KG</option>
                    <option value="Per Piece">Per Piece</option>
                    <option value="Bori">Bori</option>
                    <option value="Bundle">Bundle</option>
                    <option value="Liter">Liter</option>
                    <option value="Meter">Meter</option>
                  </select>
                </div>

                <!-- Cost Price -->
                <div class="form-group-modern">
                  <label class="form-label-modern">
                    Cost Price (₹)
                    <span class="required">*</span>
                  </label>
                  <div class="input-with-prefix">
                    <span class="input-prefix">₹</span>
                    <input
                      type="number"
                      v-model.number="costPrice"
                      class="form-input-modern input-with-prefix-input"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  <span class="form-hint">Purchase price of the product</span>
                </div>

                <!-- Selling Price -->
                <div class="form-group-modern">
                  <label class="form-label-modern">
                    Selling Price (₹)
                    <span class="required">*</span>
                  </label>
                  <div class="input-with-prefix">
                    <span class="input-prefix">₹</span>
                    <input
                      type="number"
                      v-model.number="sellingPrice"
                      class="form-input-modern input-with-prefix-input"
                      :class="{ 'input-error': errors.sellingPrice }"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  <span v-if="errors.sellingPrice" class="form-error">
                    {{ errors.sellingPrice }}
                  </span>
                  <span v-else-if="profitMargin" class="form-hint success">
                    Profit Margin: {{ profitMargin }}%
                  </span>
                </div>

                <!-- GST -->
                <div class="form-group-modern">
                  <label class="form-label-modern">
                    GST (%)
                    <span class="required">*</span>
                  </label>
                  <select v-model.number="gst" class="form-select-modern" required>
                    <option value="0">0% - No GST</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                </div>

                <!-- HSN Code -->
                <div class="form-group-modern">
                  <label class="form-label-modern">
                    HSN Code
                  </label>
                  <input
                    type="text"
                    v-model="HSN"
                    class="form-input-modern"
                    placeholder="Enter HSN code"
                    pattern="[0-9]*"
                    maxlength="8"
                  />
                  <span class="form-hint">Harmonized System Nomenclature code</span>
                </div>
              </div>

              <!-- Success Message -->
              <div v-if="successMessage" class="alert-modern alert-success">
                <i class="fa fa-check-circle"></i>
                {{ successMessage }}
              </div>

              <!-- Error Message -->
              <div v-if="errorMessage" class="alert-modern alert-error">
                <i class="fa fa-exclamation-circle"></i>
                {{ errorMessage }}
              </div>

              <!-- Action Buttons -->
              <div class="form-actions">
                <button
                  type="button"
                  @click="resetForm"
                  class="btn-modern btn-secondary-modern"
                  :disabled="isLoading"
                >
                  <i class="fa fa-refresh"></i>
                  Reset
                </button>
                <button
                  type="submit"
                  class="btn-modern btn-success-modern"
                  :disabled="isLoading || !isFormValid"
                >
                  <span v-if="!isLoading">
                    <i class="fa fa-check"></i>
                    Create Product
                  </span>
                  <span v-else>
                    <i class="fa fa-spinner fa-spin"></i>
                    Creating...
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Preview Card -->
        <div class="card-modern preview-card">
          <div class="card-header-modern">
            <i class="fa fa-eye"></i>
            Product Preview
          </div>
          <div class="card-body-modern">
            <div class="preview-item">
              <span class="preview-label">Product Code:</span>
              <span class="preview-value">{{ productCode || '-' }}</span>
            </div>
            <div class="preview-item">
              <span class="preview-label">Product Name:</span>
              <span class="preview-value">{{ productName || '-' }}</span>
            </div>
            <div class="preview-item">
              <span class="preview-label">Unit:</span>
              <span class="preview-value">{{ unit || '-' }}</span>
            </div>
            <div class="preview-item">
              <span class="preview-label">Cost Price:</span>
              <span class="preview-value">₹{{ costPrice || '0.00' }}</span>
            </div>
            <div class="preview-item">
              <span class="preview-label">Selling Price:</span>
              <span class="preview-value">₹{{ sellingPrice || '0.00' }}</span>
            </div>
            <div class="preview-item">
              <span class="preview-label">GST:</span>
              <span class="preview-value">{{ gst }}%</span>
            </div>
            <div class="preview-item">
              <span class="preview-label">HSN Code:</span>
              <span class="preview-value">{{ HSN || '-' }}</span>
            </div>
            <div v-if="totalPriceWithGST" class="preview-item highlight">
              <span class="preview-label">Final Price (with GST):</span>
              <span class="preview-value">₹{{ totalPriceWithGST }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createProduct, getLastProductCode, getProducts } from "../repository";

export default {
  name: "createProduct",
  data() {
    return {
      productCode: "",
      productName: "",
      unit: "",
      costPrice: 0,
      sellingPrice: 0,
      gst: 0,
      HSN: "",
      products: [],
      errors: {
        sellingPrice: ""
      },
      successMessage: "",
      errorMessage: "",
      isLoading: false
    };
  },
  computed: {
    isFormValid() {
      return (
        this.productCode &&
        this.productName &&
        this.unit &&
        this.costPrice > 0 &&
        this.sellingPrice > 0 &&
        !this.errors.sellingPrice
      );
    },
    profitMargin() {
      if (this.costPrice > 0 && this.sellingPrice > 0) {
        const margin = ((this.sellingPrice - this.costPrice) / this.costPrice) * 100;
        return margin.toFixed(2);
      }
      return null;
    },
    totalPriceWithGST() {
      if (this.sellingPrice > 0) {
        const gstAmount = (this.sellingPrice * this.gst) / 100;
        return (this.sellingPrice + gstAmount).toFixed(2);
      }
      return null;
    }
  },
  watch: {
    sellingPrice(newVal) {
      if (newVal < this.costPrice && newVal > 0) {
        this.errors.sellingPrice = "Selling price should be greater than cost price";
      } else {
        this.errors.sellingPrice = "";
      }
    }
  },
  mounted() {
    this.loadProductCode();
  },
  methods: {
    loadProductCode() {
      getLastProductCode()
        .then(data => {
          if (data.length === 0) {
            this.productCode = this.generateProductCode(0);
          } else {
            let lastnumber = data[0].productCode;
            let counter = Number(lastnumber.substring(4, lastnumber.length));
            this.productCode = this.generateProductCode(counter + 1);
          }
        })
        .catch((error) => {
          console.error("Error loading product code:", error);
          // Generate a default code if API fails
          this.productCode = this.generateProductCode(0);
          this.errorMessage = "Using default product code. Please check your connection.";
        });
    },
    generateProductCode(number) {
      return "PROD" + this.zeroPad(number, 4);
    },
    zeroPad(num, places) {
      return String(num).padStart(places, "0");
    },
    async create() {
      if (!this.isFormValid) {
        this.errorMessage = "Please fill all required fields correctly";
        return;
      }

      this.isLoading = true;
      this.successMessage = "";
      this.errorMessage = "";

      const productData = {
        productCode: this.productCode,
        productName: this.productName,
        unit: this.unit,
        costPrice: this.costPrice,
        sellingPrice: this.sellingPrice,
        gst: this.gst,
        HSN: this.HSN
      };

      try {
        const response = await createProduct(productData);
        
        if (response.status === 200) {
          this.successMessage = "Product created successfully!";
          
          // Reset form after 2 seconds and load next product code
          setTimeout(() => {
            this.resetForm();
            this.loadProductCode();
            this.successMessage = "";
          }, 2000);
        }
      } catch (error) {
        this.errorMessage = "Failed to create product. Please try again.";
      } finally {
        this.isLoading = false;
      }
    },
    resetForm() {
      this.productName = "";
      this.unit = "";
      this.costPrice = 0;
      this.sellingPrice = 0;
      this.gst = 0;
      this.HSN = "";
      this.errors.sellingPrice = "";
      this.successMessage = "";
      this.errorMessage = "";
    },
    goBack() {
      this.$router.push({ name: "loadproductList" });
    }
  }
};
</script>

<style scoped>
.container-modern {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-header {
  background: white;
  border-bottom: 1px solid var(--gray-200);
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.page-title i {
  color: var(--primary-500);
}

.page-subtitle {
  color: var(--gray-600);
  font-size: 1rem;
}

.form-card-wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.required {
  color: var(--error-500);
  margin-left: 0.25rem;
}

.form-hint {
  display: block;
  font-size: 0.75rem;
  color: var(--gray-500);
  margin-top: 0.25rem;
}

.form-hint.success {
  color: var(--success-600);
  font-weight: 500;
}

.form-error {
  display: block;
  font-size: 0.75rem;
  color: var(--error-600);
  margin-top: 0.25rem;
  font-weight: 500;
}

.input-error {
  border-color: var(--error-500) !important;
}

.input-error:focus {
  box-shadow: 0 0 0 3px var(--error-50) !important;
}

.input-with-prefix {
  position: relative;
  display: flex;
  align-items: center;
}

.input-prefix {
  position: absolute;
  left: 1rem;
  color: var(--gray-500);
  font-weight: 500;
  z-index: 1;
}

.input-with-prefix-input {
  padding-left: 2.5rem !important;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--gray-200);
}

.preview-card {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.preview-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--gray-100);
}

.preview-item:last-child {
  border-bottom: none;
}

.preview-item.highlight {
  background: var(--primary-50);
  padding: 1rem;
  border-radius: var(--radius-md);
  margin-top: 1rem;
  border: 1px solid var(--primary-200);
}

.preview-label {
  font-size: 0.875rem;
  color: var(--gray-600);
  font-weight: 500;
}

.preview-value {
  font-size: 0.875rem;
  color: var(--gray-900);
  font-weight: 600;
  font-family: var(--font-mono);
}

.preview-item.highlight .preview-value {
  color: var(--primary-700);
  font-size: 1.125rem;
}

@media (max-width: 1024px) {
  .form-card-wrapper {
    grid-template-columns: 1fr;
  }

  .preview-card {
    position: relative;
    top: 0;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .grid-modern.grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions button {
    width: 100%;
  }
}
</style>
