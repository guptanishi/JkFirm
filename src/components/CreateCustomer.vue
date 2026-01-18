<template>
  <div class="page-container-modern">
    <div class="page-header">
      <div class="container-modern">
        <div class="header-content">
          <div>
            <h1 class="page-title">
              <i class="fa fa-user-plus"></i>
              Add New Customer
            </h1>
            <p class="page-subtitle">Add a new customer to your database</p>
          </div>
          <button @click="goBack" class="btn-modern btn-secondary-modern">
            <i class="fa fa-arrow-left"></i>
            Back to Customers
          </button>
        </div>
      </div>
    </div>

    <div class="container-modern">
      <div class="form-card-wrapper">
        <div class="card-modern">
          <div class="card-header-modern">
            <i class="fa fa-info-circle"></i>
            Customer Information
          </div>
          <div class="card-body-modern">
            <form @submit.prevent="create">
              <!-- Basic Information -->
              <div class="form-section">
                <h3 class="section-title">Basic Information</h3>
                <div class="grid-modern grid-cols-2">
                  <!-- Customer ID -->
                  <div class="form-group-modern">
                    <label class="form-label-modern">
                      Customer ID
                      <span class="required">*</span>
                    </label>
                    <input
                      type="text"
                      v-model="customerId"
                      class="form-input-modern"
                      placeholder="e.g., CUST001"
                      readonly
                    />
                    <span class="form-hint">Auto-generated customer ID</span>
                  </div>

                  <!-- Customer Name -->
                  <div class="form-group-modern">
                    <label class="form-label-modern">
                      Customer Name
                      <span class="required">*</span>
                    </label>
                    <input
                      type="text"
                      v-model="customerName"
                      class="form-input-modern"
                      placeholder="Enter customer name"
                      required
                    />
                  </div>
                </div>
              </div>

              <!-- Address Information -->
              <div class="form-section">
                <h3 class="section-title">Address Details</h3>
                <div class="grid-modern grid-cols-1">
                  <!-- Address -->
                  <div class="form-group-modern">
                    <label class="form-label-modern">
                      Street Address
                      <span class="required">*</span>
                    </label>
                    <input
                      type="text"
                      v-model="address"
                      class="form-input-modern"
                      placeholder="Enter street address"
                      required
                    />
                  </div>
                </div>

                <div class="grid-modern grid-cols-3">
                  <!-- City -->
                  <div class="form-group-modern">
                    <label class="form-label-modern">
                      City
                      <span class="required">*</span>
                    </label>
                    <input
                      type="text"
                      v-model="city"
                      class="form-input-modern"
                      placeholder="Enter city"
                      required
                    />
                  </div>

                  <!-- State -->
                  <div class="form-group-modern">
                    <label class="form-label-modern">
                      State
                      <span class="required">*</span>
                    </label>
                    <input
                      type="text"
                      v-model="state"
                      class="form-input-modern"
                      placeholder="Enter state"
                      required
                    />
                  </div>

                  <!-- Pincode -->
                  <div class="form-group-modern">
                    <label class="form-label-modern">
                      Pincode
                      <span class="required">*</span>
                    </label>
                    <input
                      type="text"
                      v-model="pincode"
                      class="form-input-modern"
                      placeholder="000000"
                      pattern="[0-9]{6}"
                      maxlength="6"
                      required
                    />
                  </div>
                </div>
              </div>

              <!-- Contact Information -->
              <div class="form-section">
                <h3 class="section-title">Contact Details</h3>
                <div class="grid-modern grid-cols-2">
                  <!-- Contact Number -->
                  <div class="form-group-modern">
                    <label class="form-label-modern">
                      Contact Number
                      <span class="required">*</span>
                    </label>
                    <div class="input-with-prefix">
                      <span class="input-prefix">+91</span>
                      <input
                        type="tel"
                        v-model="contact"
                        class="form-input-modern input-with-prefix-input"
                        placeholder="0000000000"
                        pattern="[0-9]{10}"
                        maxlength="10"
                        required
                      />
                    </div>
                    <span class="form-hint">10-digit mobile number</span>
                  </div>

                  <!-- Email -->
                  <div class="form-group-modern">
                    <label class="form-label-modern">
                      Email Address
                    </label>
                    <input
                      type="email"
                      v-model="emailId"
                      class="form-input-modern"
                      placeholder="customer@example.com"
                    />
                  </div>
                </div>
              </div>

              <!-- Business Information -->
              <div class="form-section">
                <h3 class="section-title">Business Details</h3>
                <div class="grid-modern grid-cols-1">
                  <!-- GST Number -->
                  <div class="form-group-modern">
                    <label class="form-label-modern">
                      GST Number
                      <span class="required">*</span>
                    </label>
                    <input
                      type="text"
                      v-model="gstNumber"
                      class="form-input-modern"
                      :class="{ 'input-error': errors.length > 0 }"
                      placeholder="22AAAAA0000A1Z5"
                      maxlength="15"
                      required
                      @input="validateGST"
                    />
                    <span v-if="errors.length > 0" class="form-error">
                      {{ errors[0] }}
                    </span>
                    <span v-else class="form-hint">
                      15-character GST identification number
                    </span>
                  </div>
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
                    Create Customer
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
            Customer Preview
          </div>
          <div class="card-body-modern">
            <div class="preview-avatar">
              <div class="avatar-circle">
                {{ customerInitial }}
              </div>
              <div class="avatar-name">{{ customerName || 'Customer Name' }}</div>
            </div>

            <div class="preview-section">
              <div class="preview-section-title">Basic Info</div>
              <div class="preview-item">
                <span class="preview-label">Customer ID:</span>
                <span class="preview-value">{{ customerId || '-' }}</span>
              </div>
              <div class="preview-item">
                <span class="preview-label">Name:</span>
                <span class="preview-value">{{ customerName || '-' }}</span>
              </div>
            </div>

            <div class="preview-section">
              <div class="preview-section-title">Address</div>
              <div class="preview-item">
                <span class="preview-label">Street:</span>
                <span class="preview-value">{{ address || '-' }}</span>
              </div>
              <div class="preview-item">
                <span class="preview-label">City:</span>
                <span class="preview-value">{{ city || '-' }}</span>
              </div>
              <div class="preview-item">
                <span class="preview-label">State:</span>
                <span class="preview-value">{{ state || '-' }}</span>
              </div>
              <div class="preview-item">
                <span class="preview-label">Pincode:</span>
                <span class="preview-value">{{ pincode || '-' }}</span>
              </div>
            </div>

            <div class="preview-section">
              <div class="preview-section-title">Contact</div>
              <div class="preview-item">
                <span class="preview-label">Phone:</span>
                <span class="preview-value">{{ contact ? '+91 ' + contact : '-' }}</span>
              </div>
              <div class="preview-item">
                <span class="preview-label">Email:</span>
                <span class="preview-value">{{ emailId || '-' }}</span>
              </div>
            </div>

            <div class="preview-section">
              <div class="preview-section-title">Business</div>
              <div class="preview-item">
                <span class="preview-label">GST No:</span>
                <span class="preview-value">{{ gstNumber || '-' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createCustomer, getLastCustomerId, getCustomers } from "../repository";

export default {
  name: "createCustomer",
  data() {
    return {
      customerId: "",
      customerName: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      contact: "",
      emailId: "",
      gstNumber: "",
      errors: [],
      customers: [],
      successMessage: "",
      errorMessage: "",
      isLoading: false
    };
  },
  computed: {
    isFormValid() {
      return (
        this.customerId &&
        this.customerName &&
        this.address &&
        this.city &&
        this.state &&
        this.pincode &&
        this.contact &&
        this.gstNumber &&
        this.errors.length === 0
      );
    },
    customerInitial() {
      return this.customerName ? this.customerName.charAt(0).toUpperCase() : 'C';
    }
  },
  mounted() {
    this.loadCustomerId();
  },
  methods: {
    loadCustomerId() {
      getLastCustomerId()
        .then(data => {
          if (data.length === 0) {
            this.customerId = this.generateCustomerId(0);
          } else {
            let lastnumber = data[0].customerId;
            let counter = Number(lastnumber.substring(4, lastnumber.length));
            this.customerId = this.generateCustomerId(counter + 1);
          }
        })
        .catch((error) => {
          console.error("Error loading customer ID:", error);
          // Generate a default ID if API fails
          this.customerId = this.generateCustomerId(0);
          this.errorMessage = "Using default customer ID. Please check your connection.";
        });
    },
    generateCustomerId(number) {
      return "CUST" + this.zeroPad(number, 4);
    },
    zeroPad(num, places) {
      return String(num).padStart(places, "0");
    },
    validateGST() {
      this.errors = [];
      if (this.gstNumber && this.gstNumber.length === 15) {
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (!gstRegex.test(this.gstNumber)) {
          this.errors.push("Invalid GST number format");
        }
      }
    },
    async create() {
      if (!this.isFormValid) {
        this.errorMessage = "Please fill all required fields correctly";
        return;
      }

      this.isLoading = true;
      this.successMessage = "";
      this.errorMessage = "";

      const customerData = {
        customerId: this.customerId,
        customerName: this.customerName,
        address: this.address,
        city: this.city,
        state: this.state,
        pincode: this.pincode,
        contact: this.contact,
        emailId: this.emailId,
        gstNumber: this.gstNumber
      };

      try {
        const response = await createCustomer(customerData);
        
        if (response.status === 200) {
          this.successMessage = "Customer created successfully!";
          
          // Reset form after 2 seconds and load next customer ID
          setTimeout(() => {
            this.resetForm();
            this.loadCustomerId();
            this.successMessage = "";
          }, 2000);
        }
      } catch (error) {
        this.errorMessage = "Failed to create customer. Please try again.";
      } finally {
        this.isLoading = false;
      }
    },
    resetForm() {
      this.customerName = "";
      this.address = "";
      this.city = "";
      this.state = "";
      this.pincode = "";
      this.contact = "";
      this.emailId = "";
      this.gstNumber = "";
      this.errors = [];
      this.successMessage = "";
      this.errorMessage = "";
    },
    goBack() {
      this.$router.push({ name: "getCustomers" });
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

.form-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--gray-200);
}

.form-section:last-of-type {
  border-bottom: none;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title::before {
  content: '';
  width: 4px;
  height: 1.125rem;
  background: var(--primary-500);
  border-radius: 2px;
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
  padding-left: 3.5rem !important;
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

.preview-avatar {
  text-align: center;
  padding: 2rem 0;
  border-bottom: 1px solid var(--gray-200);
  margin-bottom: 1.5rem;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-500), var(--accent-500));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 auto 1rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.avatar-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--gray-900);
}

.preview-section {
  margin-bottom: 1.5rem;
}

.preview-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.preview-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  gap: 1rem;
}

.preview-label {
  font-size: 0.875rem;
  color: var(--gray-600);
  font-weight: 500;
  flex-shrink: 0;
}

.preview-value {
  font-size: 0.875rem;
  color: var(--gray-900);
  font-weight: 600;
  text-align: right;
  word-break: break-word;
}

@media (max-width: 1024px) {
  .form-card-wrapper {
    grid-template-columns: 1fr;
  }

  .preview-card {
    position: relative;
    top: 0;
  }

  .grid-modern.grid-cols-3 {
    grid-template-columns: 1fr;
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
