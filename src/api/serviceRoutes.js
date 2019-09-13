import axios from 'axios';
import headerFunction from "@/api/headersFunction.js";
import store from '@/store.js/'
//Main Url for Swagger
const url = "http://calendar-backend-calendar-dev.apps.ocp-dev.agilesof.com/api/v1";

const getTimeOffUrl = "/request/all_sorted/approved";
const getAdminListUrl = "/supervisor/all/";
const getRequestDataUrl = "/request/all/";
const getUserDataUrl = "/user/all/";
const getUserRequestsUrl = "/user/requests/";
const postChangePasswordUrl = "/user/change_password/";
const postAdminUrl = "/user/set_admin/";
const postNewAccountUrl = "/user/create/";
const postForTokenUrl = "/token/";
const postSubmitRequestUrl = "/request/create/";
const putEditRequestUrl = "/request/edit/";
const putUpdateStatusUrl = "/request/updatestatus/";
const deleteRequestUrl = "/request/";

export default {

    getTimeOff() {
        const res = axios.get(url + getTimeOffUrl, {
            headers: headerFunction.getHeaders()
        });
        return res;
    },
    getAdminList() {
        const res = axios.get(url + getAdminListUrl, {
            headers: headerFunction.getHeaders()
        })
        return res
    },
    getRequestData() {
        const res = axios.get(url + getRequestDataUrl, {
            headers: headerFunction.getHeaders()
        });
        return res;
    },
    getUserData() {
        const res = axios.get(url + getUserDataUrl, {
            headers: headerFunction.getHeaders()
        });
        return res;
    },
    getUserRequests() {
        const res = axios.get(url + getUserRequestsUrl + store.state.username, {
            headers: headerFunction.getHeaders()
        });
        return res;
    },
    postAdmin(data) {
        const res = axios.post(url + postAdminUrl, data, {
            headers: headerFunction.getHeaders()
        });
        return res
    },
    postNewAccount(data) {
        const res = axios.post(url + postNewAccountUrl, data, {
            headers: headerFunction.getHeaders()
        });
        return res
    },
    postForToken(data) {
        const res = axios.post(url + postForTokenUrl, data, {
            headers: headerFunction.getHeaders()
        });
        return res
    },
    postChangePassword(newPass) {
        const res = axios.post(url + postChangePasswordUrl, newPass, {
            headers: headerFunction.getHeaders()
        });
        return res
    },
    putEditRequest(id, data) {
        const res = axios.put(url + putEditRequestUrl + id, data, {
            headers: headerFunction.getHeaders()
        });
        return res
    },
    postSubmitRequest(data) {
        const res = axios.post(url + postSubmitRequestUrl, data, {
            headers: headerFunction.getHeaders()
        });
        return res
    },
    putUpdateStatus(id, data) {
        const res = axios.put(url + putUpdateStatusUrl + id, data, {
            headers: headerFunction.getHeaders()
        });
        return res
    },
    deleteRequest(id) {
        const res = axios.delete(url + deleteRequestUrl + id, {
            headers: headerFunction.getHeaders()
        });
        return res
    }
}