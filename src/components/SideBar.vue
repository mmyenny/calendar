<template>
  <div>
    <sidebar-menu :menu="menu" :collapsed="true">
      <span slot="toggle-icon">
        <i class="fas fa-arrows-alt-h"></i>
      </span>
    </sidebar-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tempMenu: []
    };
  },
  computed: {
    isAdminUser() {
      return this.$store.state.isAdminUser === true ? true : false;
    },
    menu() {
      let tMenu = [
        {
          header: true,
          title: "Main Navigation",
          hiddenOnCollapse: true
        },
        {
          href: "/calendar",
          title: "Calendar",
          icon: "fas fa-calendar-alt"
        },
        {
          href: "/request-off",
          title: "Request Off",
          icon: "fas fa-user"
        },
        {
          href: "/history",
          title: "History",
          icon: "fas fa-history"
        },
        {
          href: "/",
          title: "Logout",
          icon: "fas fa-sign-out-alt"
        }
      ];
      if (this.$store.state.isAdminUser === true) {
        tMenu.push(
          {
            header: true,
            title: "Admin",
            hiddenOnCollapse: true
          },
          {
            href: "/view-requests",
            title: "Admin View Requests",
            icon: "fas fa-calendar-check"
          },
          {
            href: "/set-admin",
            title: "Set Admin",
            icon: "fas fa-user-cog"
          }
        );
      }
      return tMenu;
    }
  }
};
</script>

<style>
/* .vsm--toggle-btn {
  display: none !important;
} */
/* .v-sidebar-menu {
  width: 25vw !important;
} */
</style>