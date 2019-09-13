<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Employee Calendar</p>
      </header>
      <div class="card-content">
        <FullCalendar
          defaultView="dayGridMonth"
          :plugins="calendarPlugins"
          :weekends="true"
          :events="newEvents"
          :fixedWeekCount="false"
          @eventClick="openMoreInfo"
        />
      </div>
    </div>
    <MoreInfo :eventData="selectedEvent" :isOpen="showMoreInfo"></MoreInfo>
  </div>
</template>
<script>
import moment from "moment";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import mockData from "@/assets/models/mockCalendarData.json";
import api from "@/api/serviceRoutes.js";
import MoreInfo from "@/views/MoreInfo.vue";
import EventBus from "@/assets/models/eventBus";
import dateHelper from "@/assets/mixin.js";

export default {
  name: "Calendar",
  mixins: [dateHelper],
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    MoreInfo
  },
  data() {
    return {
      calendarPlugins: [
        // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin // needed for dateClick
      ],
      newEvents: [],
      filterDate: undefined,
      selectedMonth: new Date(),
      currentMonthAndYear: moment(this.selectedMonth).format("MMM YYYY"),
      tempRequest: [],
      showMoreInfo: false,
      selectedEvent: {},
      tempD: ""
    };
  },
  mounted() {
    this.getApprovedRequests();
    EventBus.$on("modal-change", changeVal => {
      this.toggleModal(changeVal);
    });
  },
  beforeDestroy() {
    EventBus.$off("modal-change");
  },
  methods: {
    getApprovedRequests() {
      api
        .getTimeOff()
        .then(response => {
          this.tempRequest = response.data.requests;
          this.parseRequestData(this.tempRequest);
        })
        .catch(error => {
          /*eslint-disable*/
          console.log(error.response.data);
        });
    },
    parseRequestData(requestData) {
      this.newEvents = [];

      if (requestData.length > 0) {
        requestData.forEach(val => {
          const tempObj = {};
          tempObj.title = `${val.user.first_name} ${val.user.last_name}`;
          tempObj.start = val.date_start;
          tempObj.end = val.date_end;
          tempObj.tempEnd2 = this.formatDateMixin(val.date_end, "calDate");
          tempObj.tempEnd1 = this.formatDateMixin(val.date_end, "calDate");
          tempObj.tempStart = this.formatDateMixin(val.date_start, "Time");
          tempObj.tempEnd = this.formatDateMixin(val.date_end, "Time");
          tempObj.allDay = val.all_day;
          tempObj.id = val.id;
          tempObj.color = this.whichColor(val);
          tempObj.reason = val.reason;
          tempObj.supervisor = val.supervisor;
          tempObj.authorized_by = val.authorized_by;
          tempObj.notes = val.notes;
          this.newEvents.push(tempObj);
        });
      }
    },
    isAllDay(val) {
      let allDayVal = true;
      if (val.date_start === val.date_end) {
        allDayVal = false;
      }
      return allDayVal;
    },
    whichColor(val) {
      switch (val.reason) {
        case "Vacation":
          return "green";
        case "Sick":
          return "blue";
        case "Maternity Leave":
          return "purple";
        case "Other":
          return "red";
        default:
      }
    },
    toggleModal(val) {
      this.showMoreInfo = val;
    },
    openMoreInfo(info) {
      this.tempD = info;

      let tempObj = {
        start: info.event.start,
        end: info.event.end,
        timeStart: info.event.extendedProps.tempStart,
        timeEnd: info.event.extendedProps.tempEnd,
        reason: info.event.extendedProps.reason,
        supervisor: info.event.extendedProps.supervisor,
        authorized_by: info.event.extendedProps.authorized_by,
        notes: info.event.extendedProps.notes
      };
      this.selectedEvent = Object.assign({}, tempObj);
      this.showMoreInfo = true;
    }
  }
};
</script>

<style lang="scss">
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";
</style>