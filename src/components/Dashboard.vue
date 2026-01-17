<template>
  <div class="container-fluid mt-4">
    <div class="row mb-4">
      <div class="col-12">
        <h2 class="text-center">Business Dashboard</h2>
      </div>
    </div>

    <!-- Year and Month Selectors -->
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="form-group">
          <label for="yearSelect"><strong>Select Year:</strong></label>
          <select id="yearSelect" v-model="selectedYear" @change="onFilterChange" class="form-control">
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label for="monthSelect"><strong>Select Month:</strong></label>
          <select id="monthSelect" v-model="selectedMonth" @change="onFilterChange" class="form-control">
            <option value="">All</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Sales by Item Section -->
    <div class="row mb-5">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">
              <i class="fas fa-chart-bar mr-2"></i>
              Quantity Sold per Item {{ selectedMonth ? '(Monthly View)' : '(Yearly View)' }}
            </h5>
          </div>
          <div class="card-body">
            <div v-if="loadingSales" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <p class="mt-2">Loading sales data...</p>
            </div>
            <div v-else-if="salesData.length === 0" class="alert alert-info text-center">
              <i class="fas fa-info-circle mr-2"></i>
              No sales data available for the selected period.
            </div>
            <div v-else>
              <div v-if="!selectedMonth && salesData.length > 10" class="alert alert-info mb-3">
                <small><i class="fas fa-info-circle mr-2"></i>Showing top 10 products by quantity for better visualization</small>
              </div>
              <canvas ref="salesChart" height="80"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Customers Section -->
    <div class="row mb-5">
      <!-- Top Customers by Quantity -->
      <div class="col-md-6 mb-4">
        <div class="card shadow-sm">
          <div class="card-header bg-success text-white">
            <h5 class="mb-0">
              <i class="fas fa-users mr-2"></i>
              Top 10 Customers by Quantity
            </h5>
          </div>
          <div class="card-body">
            <div v-if="loadingQuantity" class="text-center py-5">
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <p class="mt-2">Loading data...</p>
            </div>
            <div v-else-if="topCustomersQuantity.length === 0" class="alert alert-info text-center">
              <i class="fas fa-info-circle mr-2"></i>
              No customer data available.
            </div>
            <div v-else>
              <canvas ref="quantityChart" height="200"></canvas>
              <div class="mt-4">
                <vue-good-table
                  :columns="quantityColumns"
                  :rows="topCustomersQuantity"
                  :pagination-options="{
                    enabled: false
                  }"
                  styleClass="vgt-table table-sm table-striped"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Customers by Revenue -->
      <div class="col-md-6 mb-4">
        <div class="card shadow-sm">
          <div class="card-header bg-info text-white">
            <h5 class="mb-0">
              <i class="fas fa-dollar-sign mr-2"></i>
              Top 10 Customers by Revenue
            </h5>
          </div>
          <div class="card-body">
            <div v-if="loadingRevenue" class="text-center py-5">
              <div class="spinner-border text-info" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <p class="mt-2">Loading data...</p>
            </div>
            <div v-else-if="topCustomersRevenue.length === 0" class="alert alert-info text-center">
              <i class="fas fa-info-circle mr-2"></i>
              No customer data available.
            </div>
            <div v-else>
              <canvas ref="revenueChart" height="200"></canvas>
              <div class="mt-4">
                <vue-good-table
                  :columns="revenueColumns"
                  :rows="topCustomersRevenue"
                  :pagination-options="{
                    enabled: false
                  }"
                  styleClass="vgt-table table-sm table-striped"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSalesByItem, getTopCustomersByQuantity, getTopCustomersByRevenue } from "../repository";
import Chart from 'chart.js/auto';

export default {
  name: "Dashboard",
  data() {
    return {
      selectedYear: new Date().getFullYear(),
      selectedMonth: "",
      years: [],
      salesData: [],
      topCustomersQuantity: [],
      topCustomersRevenue: [],
      loadingSales: false,
      loadingQuantity: false,
      loadingRevenue: false,
      salesChart: null,
      quantityChart: null,
      revenueChart: null,
      quantityColumns: [
        {
          label: "Customer ID",
          field: "customerId",
          width: "30%"
        },
        {
          label: "Customer Name",
          field: "customerName",
          width: "50%"
        },
        {
          label: "Total Quantity",
          field: "totalQuantity",
          type: "number",
          width: "20%",
          formatFn: (value) => Math.round(value)
        }
      ],
      revenueColumns: [
        {
          label: "Customer ID",
          field: "customerId",
          width: "30%"
        },
        {
          label: "Customer Name",
          field: "customerName",
          width: "50%"
        },
        {
          label: "Total Revenue (₹)",
          field: "totalRevenue",
          type: "number",
          width: "20%",
          formatFn: (value) => "₹" + Math.round(value).toLocaleString('en-IN')
        }
      ]
    };
  },
  mounted() {
    this.initializeYears();
    this.loadAllData();
  },
  beforeDestroy() {
    this.destroyCharts();
  },
  methods: {
    initializeYears() {
      const currentYear = new Date().getFullYear();
      const startYear = 2020;
      this.years = [];
      for (let year = currentYear; year >= startYear; year--) {
        this.years.push(year);
      }
    },
    onFilterChange() {
      this.loadAllData();
    },
    async loadAllData() {
      await Promise.all([
        this.loadSalesData(),
        this.loadTopCustomersQuantity(),
        this.loadTopCustomersRevenue()
      ]);
    },
    async loadSalesData() {
      this.loadingSales = true;
      try {
        const month = this.selectedMonth ? parseInt(this.selectedMonth) : null;
        console.log("Loading sales data for year:", this.selectedYear, "month:", month);
        this.salesData = await getSalesByItem(this.selectedYear, month);
        console.log("Sales data received:", this.salesData);
        
        // Wait for DOM update before rendering
        await this.$nextTick();
        
        // Double check canvas is available
        if (this.$refs.salesChart) {
          console.log("Canvas element is ready, rendering chart...");
          this.renderSalesChart();
        } else {
          console.error("Canvas element not found after nextTick!");
          // Try one more time after a short delay
          setTimeout(() => {
            if (this.$refs.salesChart) {
              console.log("Canvas element ready after timeout, rendering chart...");
              this.renderSalesChart();
            }
          }, 100);
        }
      } catch (error) {
        console.error("Error loading sales data:", error);
        this.salesData = [];
      } finally {
        this.loadingSales = false;
      }
    },
    async loadTopCustomersQuantity() {
      this.loadingQuantity = true;
      try {
        console.log("Loading top customers by quantity for year:", this.selectedYear);
        this.topCustomersQuantity = await getTopCustomersByQuantity(this.selectedYear);
        console.log("Top customers quantity received:", this.topCustomersQuantity);
        this.$nextTick(() => {
          this.renderQuantityChart();
        });
      } catch (error) {
        console.error("Error loading top customers by quantity:", error);
        this.topCustomersQuantity = [];
      } finally {
        this.loadingQuantity = false;
      }
    },
    async loadTopCustomersRevenue() {
      this.loadingRevenue = true;
      try {
        console.log("Loading top customers by revenue for year:", this.selectedYear);
        this.topCustomersRevenue = await getTopCustomersByRevenue(this.selectedYear);
        console.log("Top customers revenue received:", this.topCustomersRevenue);
        this.$nextTick(() => {
          this.renderRevenueChart();
        });
      } catch (error) {
        console.error("Error loading top customers by revenue:", error);
        this.topCustomersRevenue = [];
      } finally {
        this.loadingRevenue = false;
      }
    },
    renderSalesChart() {
      try {
        if (this.salesChart) {
          this.salesChart.destroy();
        }

        if (this.salesData.length === 0) {
          console.log("Cannot render sales chart - no data");
          return;
        }

        if (!this.$refs.salesChart) {
          console.error("Cannot render sales chart - canvas element not found");
          return;
        }

        const ctx = this.$refs.salesChart.getContext('2d');
        if (!ctx) {
          console.error("Cannot get 2D context from canvas");
          return;
        }

        if (this.selectedMonth) {
          // Monthly view: Bar chart
          const labels = this.salesData.map(item => item.productName);
          const data = this.salesData.map(item => item.totalQuantity);

          console.log("Rendering monthly bar chart with", this.salesData.length, "products");

          this.salesChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: 'Quantity Sold',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'top'
                },
                title: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Quantity'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Products'
                  }
                }
              }
            }
          });
          console.log("Monthly chart rendered successfully");
        } else {
          // Yearly view: Line chart with multiple products
          console.log("Rendering yearly line chart with", this.salesData.length, "products");
          
          // Limit to top 10 products for better visualization
          const topProducts = this.salesData.slice(0, 10);
          console.log("Limited to top 10 products:", topProducts.map(p => p.productName));

          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const colors = [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(199, 199, 199, 0.6)',
            'rgba(83, 102, 255, 0.6)',
            'rgba(255, 99, 255, 0.6)',
            'rgba(99, 255, 132, 0.6)'
          ];

          const datasets = topProducts.map((product, index) => {
            const monthlyQuantities = new Array(12).fill(0);
            
            if (product.monthlyData && Array.isArray(product.monthlyData)) {
              product.monthlyData.forEach(monthData => {
                if (monthData.month >= 1 && monthData.month <= 12) {
                  monthlyQuantities[monthData.month - 1] = monthData.quantity;
                }
              });
            }

            console.log(`Product ${product.productName}:`, monthlyQuantities);

            return {
              label: product.productName,
              data: monthlyQuantities,
              borderColor: colors[index % colors.length].replace('0.6', '1'),
              backgroundColor: colors[index % colors.length],
              tension: 0.3,
              fill: false
            };
          });

          console.log("Created datasets:", datasets.length);

          if (datasets.length === 0) {
            console.error("No datasets to render!");
            return;
          }

          this.salesChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: monthNames,
              datasets: datasets
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    boxWidth: 20,
                    padding: 10
                  }
                },
                title: {
                  display: false
                },
                tooltip: {
                  mode: 'index',
                  intersect: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Quantity'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Month'
                  }
                }
              }
            }
          });

          console.log("Yearly chart rendered successfully");
        }
      } catch (error) {
        console.error("Error rendering sales chart:", error);
        console.error(error.stack);
      }
    },
    renderQuantityChart() {
      if (this.quantityChart) {
        this.quantityChart.destroy();
      }

      if (this.topCustomersQuantity.length === 0 || !this.$refs.quantityChart) return;

      const ctx = this.$refs.quantityChart.getContext('2d');
      const labels = this.topCustomersQuantity.map(item => item.customerName);
      const data = this.topCustomersQuantity.map(item => item.totalQuantity);

      this.quantityChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Total Quantity',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Quantity'
              }
            }
          }
        }
      });
    },
    renderRevenueChart() {
      if (this.revenueChart) {
        this.revenueChart.destroy();
      }

      if (this.topCustomersRevenue.length === 0 || !this.$refs.revenueChart) return;

      const ctx = this.$refs.revenueChart.getContext('2d');
      const labels = this.topCustomersRevenue.map(item => item.customerName);
      const data = this.topCustomersRevenue.map(item => item.totalRevenue);

      this.revenueChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Total Revenue (₹)',
            data: data,
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return '₹' + Math.round(context.parsed.x).toLocaleString('en-IN');
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Revenue (₹)'
              },
              ticks: {
                callback: function(value) {
                  return '₹' + value.toLocaleString('en-IN');
                }
              }
            }
          }
        }
      });
    },
    destroyCharts() {
      if (this.salesChart) {
        this.salesChart.destroy();
      }
      if (this.quantityChart) {
        this.quantityChart.destroy();
      }
      if (this.revenueChart) {
        this.revenueChart.destroy();
      }
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 8px;
  margin-bottom: 20px;
}

.card-header {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

canvas {
  max-height: 400px;
}
</style>
