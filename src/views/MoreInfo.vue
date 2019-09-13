<template>
  <div class="modal" :class="{'is-active':isOpen}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-centered">Event Details</p>
        <button class="delete" aria-label="close" @click="closeMoreInfo()"></button>
      </header>
      <section class="modal-card-body">
        <ul>
          <li>
            <strong>Start Date Off:</strong>
            {{eventData.start | formatDate('shortDate')}}
          </li>
          <li>
            <strong>End Date Off:</strong>
            {{eventData.end | formatDate('shortDate')}}
          </li>
          <li>
            <strong>Time Off:</strong>
            <span
              v-if="eventData.timeStart == '12:00 PM'  && eventData.timeEnd == '12:00 PM'"
            >&nbsp;All day</span>
            <span v-else>{{eventData.timeStart}} - {{eventData.timeEnd}}</span>
          </li>
          <li>
            <strong>Reason:</strong>
            {{eventData.reason}}
          </li>
          <li>
            <strong>Supervisors Notified:</strong>

            <p
              v-for="supervisor in eventData.supervisor"
              :key="supervisor.username"
            >{{supervisor.first_name}} {{supervisor.last_name}}</p>
          </li>
          <li v-if="eventData && eventData.authorized_by">
            <strong>Authorized By:</strong>
            {{eventData.authorized_by.first_name}} {{eventData.authorized_by.last_name}}
          </li>
          <li v-if="checkDisplayNotes(eventData.notes)">
            <strong>Notes:</strong>
            {{eventData.notes}}
          </li>
        </ul>
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="closeMoreInfo()">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
import EventBus from "@/assets/models/eventBus";

export default {
  name: "MoreInfo",
  props: {
    eventData: {
      type: Object,
      default: () => {}
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeMoreInfo() {
      EventBus.$emit("modal-change", false);
    },
    checkDisplayNotes(data) {
      if (!data == "") {
        return true;
      }
    }
  }
};
</script>
  
