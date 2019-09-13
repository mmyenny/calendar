<template>
  <div class="section">
    <div class="container has-text-centered image is-128x128">
      <img src="@/assets/socom_logo.png" alt="Socom Logo" />
    </div>
    <br />
    <div class="container box" style="max-width: 550px;">
      <h1 class="title is-1 has-text-centered">J6T Calendar</h1>
      <div v-show="toggleLogin">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="email"
              placeholder="Email"
              v-model="userInfo.username"
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
              placeholder="Password"
              @keyup.enter="checkUser()"
              v-model="userInfo.password"
              name="password"
              v-validate="'required'"
              :class="{'input': true, 'is-danger': errors.has('password') }"
            />
            <span
              v-show="errors.has('password')"
              class="help has-text-danger"
            >{{errors.first('password') }}</span>

            <span class="icon is-small is-left">
              <i class="fas fa-lock" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <div class="level">
          <div class="level-left">
            <a disabled @click="toggleLogin = !toggleLogin">Create Account</a>
          </div>

          <div class="level-right">
            <a disabled @click="showForgotPwd()">Forgot Password?</a>
          </div>
        </div>
        <ForgotPwd></ForgotPwd>
        <div class="field">
          <p class="has-text-centered">
            <button
              class="button is-info is-rounded has-text-weight-medium"
              @click="checkUser()"
            >Login</button>
          </p>
        </div>
      </div>
      <div v-show="!toggleLogin">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="First Name"
              v-model="userData.first_name"
              name="First Name"
              v-validate="'required'"
              :class="{'input': true, 'is-danger': errors.has('First Name') }"
            />
            <span
              v-show="errors.has('First Name')"
              class="help has-text-danger"
            >{{errors.first('First Name') }}</span>
            <span class="icon is-small is-left">
              <i class="fas fa-user" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="Last Name"
              v-model="userData.last_name"
              name="Last Name"
              v-validate="'required'"
              :class="{'input': true, 'is-danger': errors.has('Last Name') }"
            />
            <span
              v-show="errors.has('Last Name')"
              class="help has-text-danger"
            >{{errors.first('Last Name') }}</span>
            <span class="icon is-small is-left">
              <i class="fas fa-user" aria-hidden="true"></i>
            </span>
            <span class="icon is-small is-left">
              <i class="fas fa-user" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              class="input"
              type="email"
              placeholder="Email"
              v-model="userData.email"
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
              placeholder="Password"
              v-model="userData.password"
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
              v-model="userData.confirmPassword"
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
        <div class="level">
          <div class="level-item">
            <a disabled @click="toggleLogin = !toggleLogin">Back to Login</a>
          </div>
        </div>
        <div class="field">
          <p class="has-text-centered">
            <button
              class="button is-info is-rounded has-text-weight-medium"
              @click="submitCreateAccount()"
            >Create Account</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ForgotPwd from "@/views/ForgotPwd.vue";
import EventBus from "@/assets/models/eventBus";
import User from "@/assets/models/UserClass.js";
import api from "@/api/serviceRoutes.js";

export default {
  name: "Login",
  components: {
    ForgotPwd
  },
  mounted() {
    this.$store.commit("removeToken");
    localStorage.removeItem('token');
  },
  data() {
    return {
      userInfo: {
        username: "",
        password: ""
      },
      userData: {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        confirmPassword: ""
      },
      pwErrorMessage:
        "The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)",
      toggleLogin: true
    };
  },
  methods: {
    checkUser() {
      const dt = {
        username: this.userInfo.username,
        password: this.userInfo.password
      };
      api
        .postForToken(dt)
        .then(response => {
          localStorage.setItem('token', response.data.access);
          this.$store.commit("updateToken", response.data.access);
          const json_data = JSON.parse(atob(response.data.access.split(".")[1]));
          this.$store.commit("updateAdminUser", json_data.isAdminUser);
          this.$store.commit("updateAuthentication", json_data.isAuthenticated);
          this.$store.commit("updateUserName", json_data.username);
          this.$store.commit("updateHasTempPassword", json_data.has_tempPassword);
          this.$router.push({ name: "Calendar" });
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log("Error");
          // eslint-disable-next-line no-console
          console.log(error.response.data);
          this.$vs.notify({
            color: "danger",
            position: "top-center",
            time: 4000,
            title: "Incorrect email or password"
          });
        });
    },
    submitCreateAccount() {
      this.$validator.validate().then(valid => {
        if (valid) {
          let user = new User();
          user.first_name = this.userData.first_name;
          user.last_name = this.userData.last_name;
          user.username = this.userData.email;
          user.password = this.userData.password;

          api
            .postNewAccount(user)
            .then(() => {
              this.$vs.notify({
                color: "primary",
                position: "top-center",
                time: 5000,
                title: "Check your Email"
              });
              this.$router.push({ name: "Login" });
            })
            .catch(error => {
              // eslint-disable-next-line no-console
              console.log("Error");
              // eslint-disable-next-line no-console
              console.log(error.response.data);
            });
        }
      });
    },
    showForgotPwd() {
      EventBus.$emit("pwd-window-open");
    }
  }
};
</script>

<style>
</style>


