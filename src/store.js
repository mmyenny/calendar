import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
    // Make Axios play nice with Django CSRF
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default new Vuex.Store({
    state: {
        hasTempPassword: null,
        adminList: [],
        isAdminUser: false,
        isAuthenticated: false,
        username: "",
        first_name: "",
        jwt: null,
    },
    mutations: {
        updateAdminUser(state, data) {
            this.state.isAdminUser = data;
        },
        updateAuthentication(state, data) {
            this.state.isAuthenticated = data;
        },
        updateUserName(state, data) {
            this.state.username = data;
        },
        updateHasTempPassword(state, data) {
            this.state.hasTempPassword = data;
        },
        updateToken(state, newToken) {
            this.state.jwt = newToken;
        },
        removeToken() {
            this.state.jwt = null;
        }
    }
});