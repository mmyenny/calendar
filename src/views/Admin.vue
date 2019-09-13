<template>
  <div>
    <section>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Admin Settings</p>
        </header>
        <div class="card-content">
          <b-table
            :data="users"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :pagination-position="paginationPosition"
            :default-sort-direction="defaultSortDirection"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            :bordered="true"
            default-sort="first_name"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
          >
            <template slot-scope="props">
              <b-table-column
                field="first_name"
                label="First Name"
                sortable
              >{{ props.row.first_name }}</b-table-column>
              <b-table-column field="last_name" label="Last Name" sortable>{{ props.row.last_name }}</b-table-column>
              <b-table-column field="username" width="80" label="Email" sortable centered>
                <span>{{ props.row.username }}</span>
              </b-table-column>

              <b-table-column field="is_staff" label="Set as Admin" sortable>
                <div class="field">
                  <b-switch
                    type="is-info"
                    v-model="props.row.is_staff"
                    @input="adminStatus(props.row.username, props.row.is_staff)"
                  >
                    <div v-if="props.row.is_staff">Admin</div>
                    <div v-else>Not Admin</div>
                  </b-switch>
                </div>
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "@/api/serviceRoutes.js";

export default {
  name: "Admin",
  data() {
    return {
      users: [],
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 5
    };
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    loadUsers() {
      api
        .getUserData()
        .then(response => {
          let data = response.data;
          this.users = data.users;
        })
        .catch(error => {
          /*eslint-disable*/
          console.log(error.response.data);
        });
    },
    adminStatus(user, is) {
      let data = {
        username: user,
        is_staff: is
      };
      api
        .postAdmin(data)
        .then((res) => {
          this.loadUsers();
          this.$vs.notify({
            color: "primary",
            position: "top-center",
            time: 4000,
            title: "Success!"
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.table {
  margin: 50px !important;
}
</style>
