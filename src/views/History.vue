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
              <b-table-column field="time" width="175" label="Request Time">
                <span v-if="isAllDay(props.row.date_start, props.row.date_end)">All Day</span>
                <span
                  v-else
                >{{props.row.date_start | formatDate('Time')}} - {{props.row.date_end | formatDate('Time')}}</span>
              </b-table-column>
              <b-table-column field="reason" label="Reason" sortable>
                <a @click="openReasonModal(props.row.notes)">{{ props.row.reason }}</a>
              </b-table-column>
              <b-table-column field="status" label="Status" sortable>
                <a
                  v-if="props.row.status == 'Denied'"
                  @click="openDeniedModal(props.row.denial_notes)"
                >{{ props.row.status }} by {{props.row.authorized_by.first_name}} {{props.row.authorized_by.last_name}}</a>
                <div
                  v-else-if="props.row.status == 'Approved'"
                >{{ props.row.status }} by {{props.row.authorized_by.first_name}} {{props.row.authorized_by.last_name}}</div>
                <div v-else>{{ props.row.status }}</div>
              </b-table-column>
              <b-table-column field="edit" width="80" label="Edit">
                <a class="button is-info" @click="editRequest(props.row)">
                  <i class="far fa-edit fa-lg" aria-hidden="true"></i>
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
          <button class="delete" aria-label="close" @click="closeModal()"></button>
        </header>
        <section class="modal-card-body">
          <p>{{deniedNotes}}</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="closeModal">Close</button>
        </footer>
      </div>
    </div>
    <!-- modal end -->

    <!-- Edit request modal -->
    <RequestOffModal :isRequestModalOpen="editRequestOpen" :requestData="selectedRequest"></RequestOffModal>
    <!-- modal end -->
  </div>
</template>

<script>
import moment from "moment";
import serviceApi from "@/api/serviceRoutes.js";
import api from "@/api/serviceRoutes.js";
import RequestOffModal from "@/views/RequestOffModal.vue";
import EventBus from "@/assets/models/eventBus";
import dateHelper from "@/assets/mixin.js";

export default {
  name: "History",
  mixins: [dateHelper],
  components: {
    RequestOffModal
  },
  data() {
    return {
      updateRequest: null,
      tempD: "2019-08-01T",
      activeConfirm: false,
      isActive: false,
      isDenied: false,
      editRequestOpen: false,
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
      perPage: 10,
      selectedRequest: {}
    };
  },
  mounted() {
    this.loadUserRequest();
    EventBus.$on("edit-request-modal-close", () => {
      this.closeRequestModal();
    });
    EventBus.$on("request-modal-save", saveObj => {
      this.processEditRequestSave(saveObj);
    });
  },
  beforeDestroy() {
    EventBus.$off("edit-request-modal-close");
    EventBus.$off("request-modal-save");
  },
  computed: {
    formatDate(value) {
      let tempVal = "";
      if (value) {
        tempVal = moment(String(value)).format("MM/DD/YYYY");
      }
      return tempVal;
    }
  },
  methods: {
    isAllDay(start, end) {
      if (
        this.formatDateMixin(start, "Time") == "12:00 PM" &&
        this.formatDateMixin(end, "Time") == "12:00 PM"
      ) {
        return true;
      }
    },
    closeRequestModal() {
      this.editRequestOpen = false;
    },
    loadUserRequest() {
      api
        .getUserRequests()
        .then(response => {
          this.requests = response.data.requests;
        })
        .catch(error => {
          /*eslint-disable*/
          console.log(error.response.data);
        });
    },
    loadRequests() {
      serviceApi
        .getRequestData()
        .then(response => {
          this.requests = response.data.requests;
        })
        .catch(error => {
          /*eslint-disable*/
          console.log(error.response.data);
        });
    },
    editRequest(data) {
      let tempObj = {
        id: data.id,
        all_day: false,
        date_start: new Date(moment(data.date_start)),
        date_end: new Date(moment(data.date_end)),
        supervisor: data.supervisor,
        reason: data.reason,
        notes: data.notes
      };
      this.selectedRequest = Object.assign({}, tempObj);
      this.editRequestOpen = true;
    },
    mapEmails(dataArray) {
      let tempEmails = [];
      if (dataArray && dataArray.length > 0) {
        tempEmails = dataArray.map(item => item.username);
      }
      return tempEmails;
    },
    processEditRequestSave(saveObj) {
      let data = {
        id: saveObj.id,
        date_start: saveObj.date_start,
        date_end: saveObj.date_end,
        all_day: saveObj.all_day,
        supervisor: this.mapEmails(saveObj.supervisor),
        reason: saveObj.reason,
        notes: saveObj.notes
      };
      api
        .putEditRequest(data.id, data)
        .then(res => {
          this.closeRequestModal();
          this.loadUserRequest();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    openReasonModal(content) {
      this.isActive = true;
      this.showNotes = content;
    },
    openDeniedModal(content) {
      this.isDenied = true;
      this.deniedNotes = content;
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
