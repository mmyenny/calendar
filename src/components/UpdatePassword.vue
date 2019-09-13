<template>
  <div>
    <div v-if="isModalActive" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered">Update Password</p>
          <button class="delete" aria-label="close" @click="closeWindow()"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="email"
                placeholder="Email"
                v-model="myNewPass.myEmail"
                name="email"
                v-validate="'required|email'"
                :class="{'input': true, 'is-danger': errors.has('email') }"
              />
              <span
                v-show="errors.has('email')"
                class="help has-text-danger"
              >{{errors.first('email') }}</span>

              <span class="icon is-small is-left">
                <i class="fas fa-envelope" aria-hidden="true"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check" aria-hidden="true"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="input"
                type="password"
                placeholder="New Password"
                v-model="myNewPass.myNewPassword"
                name="password"
                ref="pw_confirm"
                v-validate="{ required: true, min: 8,
                  regex:/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/ }"
                :class="{'input': true, 'is-danger': errors.has('password') }"
              />
              <span
                v-show="errors.has('password')
            && !(errors.items[0].rule === 'regex')"
                class="help has-text-danger"
              >{{errors.first('password') }}</span>
              <span
                v-show="errors.has('password')
   
                && errors.items[0].rule === 'regex'"
                class="help has-text-danger"
              >{{pwErrorMessage}}</span>
              <span class="icon is-small is-left">
                <i class="fas fa-lock" aria-hidden="true"></i>
              </span>
            </p>
          </div>

          <div class="field">
            <p class="control has-icons-left">
              <input
                class="input"
                type="password"
                placeholder="Confirm Password"
                name="password_repeat"
                data-vv-as="password"
                v-model="myNewPass.confirmPassword"
                :class="{'input': true, 'is-danger': errors.has('password_repeat') }"
                v-validate="'required|confirmed:pw_confirm|min:8'"
              />
              <span
                v-show="errors.has('password_repeat')"
                class="help has-text-danger"
              >{{errors.first('password_repeat') }}</span>
              <span class="icon is-small is-left">
                <i class="fas fa-lock" aria-hidden="true"></i>
              </span>
            </p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="changePassword()" class="button is-info">Save changes</button>
          <button @click="closeWindow()" class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/serviceRoutes.js";
import NewPassObj from "@/assets/models/NewPass.js";
export default {
  name: "UpdatePassword",
  data() {
    return {
      isModalActive: this.$store.state.hasTempPassword,
      myNewPass: {
        username: "string",
        password: "string",
        new_password: "string",
        confirmPassword: ""
      },
      pwErrorMessage:
        "The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)"
    };
  },
  methods: {
    /*eslint-disable*/
    changePassword() {
      this.$validator.validate().then(valid => {
        if (valid) {
          let passObj = new NewPassObj();
          passObj.username = this.myNewPass.myEmail;
          passObj.password = this.myNewPass.myTempPassword;
          passObj.new_password = this.myNewPass.myNewPassword;
          this.isModalActive = false;
          api
            .postChangePassword(passObj)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },

    closeWindow() {
      this.isModalActive = false;
    }
  }
};
</script>

<style>
</style>