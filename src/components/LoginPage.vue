<template>
  <div class="container">
    <div class="row align-self-center" style="margin-top: 150px">
      <div class="col-4"></div>
      <div class="col-4">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">UserName</label>
            <input type="text" class="form-control" v-model="username" placeholder="Enter username" />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" class="btn btn-primary" @click="submit">Submit</button>
        </form>
      </div>
      <div class="col-4"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    submit() {
      if (this.username == "admin" && this.password == "1234") {
        localStorage.username = this.username;
        localStorage.password = this.password;

        this.$router.push({
          name: "homePage"
        });
        //alert(localStorage.username);
      } else {
        localStorage.username = "";
        localStorage.password = "";
        alert("Invalid Username or Password! Please try again");
      }
    }
  }
};
</script>