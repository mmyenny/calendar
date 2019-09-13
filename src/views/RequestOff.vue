<template>
  <div class="container">
    <RequestOffModal
      :isRequestModalOpen="openRequestModal" 
    ></RequestOffModal>
  </div>
</template>
<script>

import api from "@/api/serviceRoutes.js";
import RequestOffModal from "@/views/RequestOffModal.vue";
import EventBus from '@/assets/models/eventBus';

export default {
  name: "RequestOff",
   components: {
    RequestOffModal
  },
  data() {
    return {
      adminNameList: [],
      openRequestModal: false,
    };
  },
  computed: {
    format() {
      return this.formatAmPm ? "12" : "24";
    }
  },
  mounted() {
    this.getAdmins();
    EventBus.$on('edit-request-modal-close', () => {
      this.closeRequestModal();
    });
    EventBus.$on('request-modal-save', (saveObj) => {
      this.submitRequestOff(saveObj);
    });
  },
  beforeDestroy() {
    EventBus.$off('edit-request-modal-close');
    EventBus.$off('request-modal-save');
  },
  methods: {
    closeRequestModal() {
      this.openRequestModal = false;
      this.$router.push({ name: "Calendar" });
    },
    customAdminList({ first_name, last_name, email }) {
      if (email) {
        return `${first_name} ${last_name}`;
      }
    },
    getAdmins() {
      api
        .getAdminList()
        .then(response => {
          this.adminNameList = response.data.supervisors;
          this.openRequestModal = true;
        })
        .catch(err => {
          /*eslint-disable*/
          console.log(err);
        });
    },
    mapEmails(dataArray) {
      let tempEmails = [];
      if (dataArray && dataArray.length > 0) {
        tempEmails = dataArray.map(item => item.email);
      }
      return tempEmails;
    },
    submitRequestOff(saveObj) {
      let data = {
        username: this.$store.state.username,
        date_start: saveObj.date_start,
        date_end: saveObj.date_end,
        reason: saveObj.reason,
        supervisor: this.mapEmails(saveObj.supervisor),
        notes: saveObj.notes,
        all_day: false
      };
      api
        .postSubmitRequest(data)
        .then(response => {
          this.$vs.notify({
            color: "primary",
            position: "top-center",
            time: 4000,
            title: "Time Off Request Pending",
            text: "Your request was received an is pending approval."
          });
          this.closeRequestModal();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
</style>
