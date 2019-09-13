<template>
  <div class="modal" v-bind:class="{'is-active':isRequestModalOpen}">
    <div class="modal-background"></div>
    <div class="modal-card wide-modal">
      <header class="modal-card-head">
        <p class="modal-card-title">Request Time Off</p>
        <button class="delete" aria-label="close" @click="closeModal()"></button>
      </header>
      <section class="modal-card-body">
        <div class="columns is-mobile">
          <div class="column is-one-half">
            <div class="field">
              <label class="label">Start Date/Time</label>
              <flat-pickr
                :config="config"
                id="datetime-input"
                class="form-control"
                v-model="requestData.date_start"
                placeholder="Start Date/Time"
              ></flat-pickr>
            </div>
          </div>
          <div class="column is-one-half">
            <div class="field">
              <label class="label">End Date/Time</label>
              <flat-pickr
                :config="config"
                id="datetime-input"
                class="form-control"
                v-model="requestData.date_end"
                placeholder="End Date/Time"
              ></flat-pickr>
            </div>
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column is-one-half">
            <div class="field">
              <label class="label">Reason</label>
              <div class="control is-expanded">
                <multiselect
                  v-model="requestData.reason"
                  :options="reason_list"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :showLabels="false"
                  :max-height="150"
                  :multiple="false"
                  placeholder="Select Reason"
                  :taggable="false"
                ></multiselect>
              </div>
            </div>
          </div>
          <div class="column is-one-half">
            <div class="field">
              <label class="label">Supervisor</label>
              <div class="control is-expanded">
                <multiselect
                  v-model="requestData.supervisor"
                  :options="adminList"
                  :multiple="true"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :showLabels="false"
                  :max-height="150"
                  :limit="2"
                  :custom-label="customAdminList"
                  placeholder="Select Supervisor"
                  :taggable="false"
                  track-by="username"
                ></multiselect>
                <template
                  slot="option"
                  slot-scope="{ option }"
                >{{ option.first_name }} {{ option.last_name}}</template>
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-mobile">
          <div class="column is-one-full">
            <div class="field">
              <label class="label">Additional Notes</label>
              <div class="control">
                <textarea class="textarea" placeholder="Text area" v-model="requestData.notes"></textarea>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-medium is-info" @click="saveEditRequest()">Save changes</button>
        <button class="button is-medium is-danger" @click="closeModal()">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import api from "@/api/serviceRoutes.js";
import EventBus from "@/assets/models/eventBus";
import RequestOffData from "@/assets/models/requestOff";

export default {
  name: "RequestOffModal",
  props: {
    requestData: {
      type: Object,
      default() {
        return new RequestOffData();
      }
    },
    isRequestModalOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      adminList: [],
      formatAmPm: true,
      config: {
        enableTime: true,
        altInput: true,
        altFormat: "d M y H:i (Z)",
        dateFormat: "Z"
      },
      reason_list: ["Maternity Leave", "Sick", "Vacation", "Other"]
    };
  },
  computed: {
    format() {
      return this.formatAmPm ? "12" : "24";
    }
  },
  mounted() {
    this.getAdmins();
  },
  methods: {
    customAdminList({ first_name, last_name, username }) {
      if (username) {
        return `${first_name} ${last_name}`;
      }
    },
    getAdmins() {
      api
        .getAdminList()
        .then(response => {
          this.adminList = response.data.supervisors;
          this.adminList.forEach(item => {
            item.email = item.username;
          });
        })
        .catch(err => {
          /*eslint-disable*/
          console.log(err);
        });
    },
    saveEditRequest() {
      let saveObj = Object.assign({}, this.requestData);
      EventBus.$emit("request-modal-save", saveObj);
    },
    closeModal() {
      EventBus.$emit("edit-request-modal-close");
    }
  }
};
</script>
<style lang="scss" scoped>
.wide-modal {
  width: 60%;
  height: 65%;
  .modal-card-body {
    background-color: #f3f6f8;
  }
  .footer {
    background-color: #f3f6f8;
  }
}
</style>