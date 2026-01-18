<template>
  <div class="login-container">
    <div class="login-card-wrapper">
      <!-- Left Side - Branding -->
      <div class="login-brand">
        <div class="brand-content">
          <div class="brand-icon-large">JK</div>
          <h1 class="brand-title">JKFirm</h1>
          <p class="brand-subtitle">Invoice Management System</p>
          
          <div class="features-list">
            <div class="feature-item">
              <i class="fa fa-check-circle"></i>
              <span>Fast Invoice Generation</span>
            </div>
            <div class="feature-item">
              <i class="fa fa-check-circle"></i>
              <span>Inventory Management</span>
            </div>
            <div class="feature-item">
              <i class="fa fa-check-circle"></i>
              <span>Customer Tracking</span>
            </div>
            <div class="feature-item">
              <i class="fa fa-check-circle"></i>
              <span>Analytics Dashboard</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Login Form -->
      <div class="login-form-container">
        <div class="login-form-content">
          <h2 class="login-title">Welcome Back</h2>
          <p class="login-subtitle">Sign in to your account to continue</p>

          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group-modern">
              <label class="form-label-modern">Username</label>
              <div class="input-with-icon">
                <i class="fa fa-user input-icon"></i>
                <input
                  type="text"
                  v-model="username"
                  class="form-input-modern input-with-icon-input"
                  placeholder="Enter your username"
                  required
                  autocomplete="username"
                />
              </div>
            </div>

            <div class="form-group-modern">
              <label class="form-label-modern">Password</label>
              <div class="input-with-icon">
                <i class="fa fa-lock input-icon"></i>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  class="form-input-modern input-with-icon-input"
                  placeholder="Enter your password"
                  required
                  autocomplete="current-password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="password-toggle"
                  tabindex="-1"
                >
                  <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                </button>
              </div>
            </div>

            <div v-if="errorMessage" class="alert-error">
              <i class="fa fa-exclamation-circle"></i>
              {{ errorMessage }}
            </div>

            <button
              type="submit"
              class="btn-modern btn-primary-modern btn-login"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Sign In</span>
              <span v-else><i class="fa fa-spinner fa-spin"></i> Signing In...</span>
            </button>
          </form>

          <div class="login-footer">
            <p class="demo-credentials">
              <i class="fa fa-info-circle"></i>
              Demo: <strong>admin</strong> / <strong>1234</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      errorMessage: '',
      isLoading: false
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = '';
      this.isLoading = true;

      // Simulate API call with delay
      setTimeout(() => {
        if (this.username === 'admin' && this.password === '1234') {
          localStorage.username = this.username;
          localStorage.password = this.password;
          this.$router.push({ name: 'dashboard' });
        } else {
          this.errorMessage = 'Invalid username or password. Please try again.';
        }
        this.isLoading = false;
      }, 800);
    }
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.login-container::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  border-radius: 50%;
  top: -200px;
  right: -200px;
  animation: float 6s ease-in-out infinite;
}

.login-container::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  border-radius: 50%;
  bottom: -100px;
  left: -100px;
  animation: float 8s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.login-card-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1100px;
  width: 100%;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 1;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-brand {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  padding: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.login-brand::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  border-radius: 50%;
  top: -100px;
  right: -100px;
}

.brand-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.brand-icon-large {
  width: 96px;
  height: 96px;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 3rem;
  margin: 0 auto 2rem;
  box-shadow: 0 10px 30px rgba(96, 165, 250, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.brand-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.brand-subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: 3rem;
}

.features-list {
  text-align: left;
  display: inline-block;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  opacity: 0;
  animation: fadeInLeft 0.6s ease-out forwards;
}

.feature-item:nth-child(1) { animation-delay: 0.2s; }
.feature-item:nth-child(2) { animation-delay: 0.3s; }
.feature-item:nth-child(3) { animation-delay: 0.4s; }
.feature-item:nth-child(4) { animation-delay: 0.5s; }

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.feature-item i {
  color: #60a5fa;
  font-size: 1.25rem;
}

.login-form-container {
  padding: 4rem;
  display: flex;
  align-items: center;
  background: white;
}

.login-form-content {
  width: 100%;
}

.login-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--gray-900);
}

.login-subtitle {
  color: var(--gray-600);
  margin-bottom: 2rem;
  font-size: 0.9375rem;
}

.login-form {
  margin-bottom: 1.5rem;
}

.input-with-icon {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-400);
  font-size: 1rem;
  z-index: 1;
}

.input-with-icon-input {
  padding-left: 3rem !important;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--gray-400);
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s;
  z-index: 1;
}

.password-toggle:hover {
  color: var(--gray-600);
}

.alert-error {
  background-color: var(--error-50);
  color: var(--error-700);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-lg);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  border-left: 3px solid var(--error-500);
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.btn-login {
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 600;
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-footer {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--gray-200);
}

.demo-credentials {
  font-size: 0.875rem;
  color: var(--gray-600);
  margin: 0;
}

.demo-credentials i {
  color: var(--primary-500);
  margin-right: 0.5rem;
}

.demo-credentials strong {
  color: var(--gray-900);
  font-family: var(--font-mono);
  background-color: var(--gray-100);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
}

@media (max-width: 968px) {
  .login-card-wrapper {
    grid-template-columns: 1fr;
  }

  .login-brand {
    padding: 3rem 2rem;
  }

  .brand-icon-large {
    width: 72px;
    height: 72px;
    font-size: 2rem;
  }

  .brand-title {
    font-size: 2rem;
  }

  .login-form-container {
    padding: 3rem 2rem;
  }
}

@media (max-width: 640px) {
  .login-container {
    padding: 1rem;
  }

  .login-brand {
    padding: 2rem 1.5rem;
  }

  .brand-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .features-list {
    display: none;
  }

  .login-form-container {
    padding: 2rem 1.5rem;
  }

  .login-title {
    font-size: 1.5rem;
  }
}
</style>
