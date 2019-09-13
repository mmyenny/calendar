import Vue from 'vue';
import Router from 'vue-router';
import SetAdmin from "@/views/Admin.vue";
import Calendar from "@/views/Calendar.vue";
import Login from "@/views/Login.vue";
import RequestOff from "@/views/RequestOff.vue";
import ViewRequests from "@/views/ViewRequest.vue";
import History from "@/views/History.vue";
import store from "@/store.js";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '*',
            name: '404',
            beforeEnter: async function(to, from, next) {
                next({
                    path: "/"
                });
            }
        },
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/calendar',
            name: 'Calendar',
            component: Calendar,
            beforeEnter: async function(to, from, next) {
                if (store.state.isAuthenticated) {
                    next(true);
                } else {
                    // User has no access to the app, redirect to dashboard
                    next({
                        path: "/"
                    });
                }
            }
        },
        {
            path: '/request-off',
            name: 'RequestOff',
            component: RequestOff,
            beforeEnter: async function(to, from, next) {
                if (store.state.isAuthenticated) {
                    next(true);
                } else {
                    // User has no access to the app, redirect to dashboard
                    next({
                        path: "/"
                    });
                }
            }
        },
        {
            path: '/history',
            name: 'History',
            component: History,
            beforeEnter: async function(to, from, next) {
                if (store.state.isAuthenticated) {
                    next(true);
                } else {
                    // User has no access to the app, redirect to dashboard
                    next({
                        path: "/"
                    });
                }
            }
        },
        {
            path: '/view-requests',
            name: 'ViewRequests',
            component: ViewRequests,
            beforeEnter: async function(to, from, next) {
                if (store.state.isAdminUser) {
                    next(true);
                } else {
                    // User has no access to the app, redirect to dashboard
                    next({
                        path: "/"
                    });
                }
            }
        },
        {
            path: '/set-admin',
            name: 'SetAdmin',
            component: SetAdmin,
            beforeEnter: async function(to, from, next) {
                if (store.state.isAdminUser) {
                    next(true);
                } else {
                    // User has no access to the app, redirect to dashboard
                    next({
                        path: "/"
                    });
                }
            }
        },
    ]
});