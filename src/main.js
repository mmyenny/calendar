import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import Bulma from 'bulma/css/bulma.css';
import Vuesax from 'vuesax';
import 'material-icons/iconfont/material-icons.css';
import 'vuesax/dist/vuesax.css'; //Vuesax styles
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import VueSidebarMenu from 'vue-sidebar-menu';
import { library, dom } from '@fortawesome/fontawesome-svg-core'
// add fas, fab, far packs to library
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fab, fas, far)
dom.watch();
import store from '@/store';
import moment from 'moment'
import VeeValidate from 'vee-validate';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import VueFlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

Vue.use(VueFlatPickr);
Vue.component('multiselect', Multiselect);
Vue.use(VeeValidate);

Vue.prototype.moment = moment

Vue.use(VueSidebarMenu);
Vue.use(Vuesax);
Vue.use(Bulma);
Vue.use(Buefy);

Vue.config.productionTip = false;

Vue.filter('formatDate', (value, args) => {
    switch (args) {
        case 'milDateTime':
            if (value) {
                return moment(value).format('DD MMM YY HH:mm (Z)')
            }
            break
        case 'milDate':
            if (value) {
                return moment(value).format('DD MMM YY')
            }
            break
        case 'shortDate':
            if (value) {
                return moment(value).format('MMM Do, YYYY')
            }
            break
        case 'shortDateNumeric':
            if (value) {
                return moment(value).format('L')
                    //format 08/30/2019
            }
            break
        case 'shortDateTime':
            if (value) {
                return moment(value).format('DD MMM [at] HH:mm (Z)')
            }
            break
        case 'Time':
            if (value) {
                return moment(value).format('LT')
            }
            break
        case 'convertDate':
            if (value) {
                return (
                    moment(value).fromNow() +
                    ' at ' +
                    moment(value).format('MMM Do YYYY HH:mm (Z)')
                )
            }
            break
        case 'dtg':
            if (value) {
                return moment(value)
                    .utc()
                    .format('DDHHmm[Z]MMMYY')
            }
            break
        default:
            return value
    }
});
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');