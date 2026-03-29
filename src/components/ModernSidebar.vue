<template>
  <div class="modern-sidebar" v-if="isAuthenticated">
    <div class="sidebar-header">
      <div class="brand">
        <div class="brand-icon">JK</div>
        <h2 class="brand-name">JKFirm</h2>
      </div>
    </div>

    <nav class="sidebar-nav">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        active-class="nav-item-active"
      >
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
        <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <div class="user-profile">
        <div class="user-avatar">{{ userInitial }}</div>
        <div class="user-info">
          <div class="user-name">{{ username }}</div>
          <button @click="logout" class="logout-btn">
            <i class="fa fa-sign-out"></i> Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModernSidebar",
  data() {
    return {
      navItems: [
        {
          path: "/taxInvoice",
          label: "New Invoice",
          icon: "fa fa-plus-circle",
        },
        { path: "/getInvoices", label: "Invoices", icon: "fa fa-file-text-o" },
        { path: "/loadProducts", label: "Products", icon: "fa fa-cube" },
        {
          path: "/createProduct",
          label: "Add Product",
          icon: "fa fa-plus-square",
        },
        { path: "/getCustomers", label: "Customers", icon: "fa fa-users" },
        {
          path: "/createCustomer",
          label: "Add Customer",
          icon: "fa fa-user-plus",
        },
      ],
    };
  },
  computed: {
    isAuthenticated() {
      return localStorage.username && this.$route.name !== "login";
    },
    username() {
      return localStorage.username || "Admin";
    },
    userInitial() {
      return this.username.charAt(0).toUpperCase();
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.modern-sidebar {
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%);
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.sidebar-header {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.sidebar-nav {
  flex: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.2s;
  border-left: 3px solid transparent;
  font-weight: 500;
  position: relative;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-left-color: #60a5fa;
}

.nav-item-active {
  background: rgba(96, 165, 250, 0.2);
  color: white;
  border-left-color: #60a5fa;
}

.nav-item i {
  font-size: 1.25rem;
  width: 24px;
  text-align: center;
}

.nav-badge {
  margin-left: auto;
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.125rem;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.logout-btn:hover {
  color: white;
}

@media (max-width: 968px) {
  .modern-sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }

  .sidebar-nav {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
  }

  .nav-item {
    flex: 1 1 auto;
    justify-content: center;
    border-left: none;
    border-bottom: 3px solid transparent;
  }

  .nav-item-active {
    border-left: none;
    border-bottom-color: #60a5fa;
  }
}
</style>
