<template>
  <div class="modal" :class="{'is-active': isActive}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Forgot your Password?</p>
        <button class="delete" aria-label="close" @click="closeForgotPwd()"></button>
      </header>
      <section class="modal-card-body">
        <p>Don't worry! We'll send the account details to your email.</p>
        <br />
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Email" v-model="email" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-info" @click="sendPwdEmail()">Send</button>
        <button class="button" @click="closeForgotPwd()">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import EventBus from "@/assets/models/eventBus";
import axios from "axios";

export default {
  name: "ForgotPwd",
  data() {
    return {
      isActive: false,
      email: ""
    };
  },
  mounted() {
    EventBus.$on("pwd-window-open", () => {
      this.openPwdWindow();
    });
  },
  beforeDestroy() {
    EventBus.$off("pwd-window-open");
  },
  methods: {
    closeForgotPwd() {
      this.isActive = false;
    },
    openPwdWindow() {
      this.isActive = true;
    },
    sendPwdEmail() {
      let userEmail = {
        username: this.email
      };
      axios
        .post(
          "http://calendar-project-calendar-project.apps.us-east-1.online-starter.openshift.com/api/v1/user/forgot_password/",
          userEmail
        )
        .then(() => {
          this.$vs.notify({
            color: "primary",
            position: "top-center",
            icon: "mail",
            time: 4000,
            title: "Email Cofirmation",
            text: "An email has been sent to the supplied email address."
          });
          this.isActive = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  text-align: center;
}
</style>

