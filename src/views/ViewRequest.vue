<template>
  <div>
    <section>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Employee Requests</p>
        </header>
        <div class="card-content">
          <b-table
            :data="requests"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :pagination-position="paginationPosition"
            :default-sort-direction="defaultSortDirection"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            :bordered="true"
            default-sort="user.first_name"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
          >
            <template slot-scope="props">
              <b-table-column
                field="user.first_name"
                label="First Name"
                sortable
              >{{ props.row.user.first_name }}</b-table-column>
              <b-table-column
                field="user.last_name"
                label="Last Name"
                sortable
              >{{ props.row.user.last_name }}</b-table-column>
              <b-table-column
                field="date_start"
                width="80"
                label="Request Start Date"
                sortable
                centered
              >
                <span>{{props.row.date_start | formatDate('shortDateNumeric')}}</span>
              </b-table-column>
              <b-table-column
                field="date_end"
                width="80"
                label="Request End Date"
                sortable
                centered
              >
                <span>{{props.row.date_end | formatDate('shortDateNumeric')}}</span>
              </b-table-column>

              <b-table-column field="time" width="100" label="Request Time">
                <span v-if="isAllDay(props.row.date_start, props.row.date_end)">All Day</span>
                <span v-else>
                  <span>{{props.row.date_start | formatDate('Time')}}-</span>
                  <span>{{props.row.date_end | formatDate('Time')}}</span>
                </span>
              </b-table-column>

              <b-table-column field="reason" label="Reason" sortable>
                <a @click="openModal(props.row.notes)">{{ props.row.reason }}</a>
              </b-table-column>
              <b-table-column field="status" label="Status" sortable>{{ props.row.status }}</b-table-column>
              <b-table-column field="id" width="200" label="Approve/Deny">
                <button class="button is-info" @click="clickApprove(props.row.id)">Approve</button>
                <button class="button is-danger" @click="clickDeny(props.row.id)">Deny</button>
              </b-table-column>
              <b-table-column field="delete" width="80" label="Delete">
                <a class="button is-danger" @click="deleteRequest(props.row.id)">
                  <i class="far fa-trash-alt" aria-hidden="true"></i>
                </a>
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </section>
    <!-- modal -->
    <div class="modal" v-bind:class="{'is-active':isActive}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Notes</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <p>{{showNotes}}</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="closeModal">Close</button>
        </footer>
      </div>
    </div>
    <!-- modal end -->

    <!-- denied notes modal -->
    <div class="modal" v-bind:class="{'is-active':isDenied}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Reason the request is denied</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <textarea class="textarea" placeholder="Text area" v-model="deniedNotes"></textarea>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-info" @click="denyRequestOff()">Deny Request Off</button>
          <button class="button" @click="closeModal">Close</button>
        </footer>
      </div>
    </div>
    <!-- modal end -->
  </div>
</template>

<script>
import api from "@/api/serviceRoutes.js";
import dateHelper from "@/assets/mixin.js";

export default {
  mixins: [dateHelper],
  data() {
    return {
      tempD: "2019-08-01T",
      activeConfirm: false,
      isActive: false,
      isDenied: false,
      selectedRequestId: "",
      requests: [],
      showNotes: "",
      deniedNotes: "",
      users: [],
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 8
    };
  },
  mounted() {
    this.loadRequests();
  },
  computed: {},
  methods: {
    isAllDay(start, end) {
      if (
        this.formatDateMixin(start, "Time") == "12:00 PM" &&
        this.formatDateMixin(end, "Time") == "12:00 PM"
      ) {
        return true;
      }
    },
    loadRequests() {
      api
        .getRequestData()
        .then(response => {
          this.requests = response.data.requests;
        })
        .catch(error => {
          /*eslint-disable*/
          console.log(error.response.data);
        });
    },
    clickApprove(id) {
      let data = {
        status: "Approved"
      };
      api
        .putUpdateStatus(id, data)
        .then(() => {
          this.loadRequests();
          this.$vs.notify({
            color: "primary",
            position: "top-center",
            time: 4000,
            title: "Confirm Approval",
            text: "Confirm Approval"
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    clickDeny(id) {
      this.isDenied = true;
      this.selectedRequestId = id;
    },
    denyRequestOff() {
      let data = {
        status: "Denied",
        denial_notes: this.deniedNotes
      };
      api
        .putUpdateStatus(this.selectedRequestId, data)
        .then(() => {
          this.isDenied = false;
          this.loadRequests();
          this.$vs.notify({
            color: "primary",
            position: "top-center",
            time: 4000,
            title: "Denied",
            text: "Denied"
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteRequest(id) {
      if (window.confirm("Are you sure you want to delete this request?")) {
        api
          .deleteRequest(id)
          .then(() => {
            this.loadRequests();
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    openModal(content) {
      this.isActive = true;
      this.showNotes = content;
    },
    closeModal() {
      this.isActive = false;
      this.isDenied = false;
    }
  }
};
</script>

<style>
</style>
