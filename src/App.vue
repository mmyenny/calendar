<template>
  <div id="app">
    <side-bar v-if="showSideBar"></side-bar>
    <div class="load-spot">
      <update-password v-if="showUpdatePassword" />
      <router-view />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import UpdatePassword from "@/components/UpdatePassword.vue";
export default {
  name: "App",
  components: {
    SideBar,
    UpdatePassword
  },
  computed: {
    showUpdatePassword() {
      if (
        this.$route.path === "/calendar" &&
        this.$store.state.hasTempPassword
      ) {
        return true;
      } else {
        return false;
      }
    },
    showSideBar() {
      if (this.$route.path === "/") {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/main.scss";
</style>
