<template>
  <div id="app">
    <ModernSidebar v-if="showSidebar" />
    <div :class="['main-content', { 'with-sidebar': showSidebar }]">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ModernSidebar from './components/ModernSidebar.vue';

export default {
  name: "app",
  components: {
    ModernSidebar
  },
  data() {
    return {
      isAuthenticated: false,
      name: localStorage.username !== undefined ? localStorage.username : "",
      showName: false
    };
  },
  computed: {
    showSidebar() {
      return this.$route.name !== 'login' && this.$route.name !== 'homePage' && localStorage.username;
    }
  },
  watch: {
    $route(to, from) {
      if (to !== from) {
        this.name = localStorage.username;
      }
      
      this.isAuthenticated = to.name !== "login" && to.name !== "homePage";
      this.showName = to.name !== "login";
    }
  },
  methods: {
    navigateToDashboard() {
      if (this.$route.name !== 'dashboard') {
        this.$router.push({ name: 'dashboard' });
      }
    },
    logout() {
      localStorage.username = "";
      localStorage.password = "";
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>

<style>
#app {
  min-height: 100vh;
}

.main-content {
  min-height: 100vh;
  transition: margin-left 0.3s ease;
  background: var(--gray-50);
}

.main-content.with-sidebar {
  margin-left: 280px;
}

@media (max-width: 968px) {
  .main-content.with-sidebar {
    margin-left: 0;
    margin-top: 0;
  }
}
</style>
