export default class RequestOffData {
    constructor() {
        this.resetData();
    }

    resetData() {
        this.id = null;
        this.date_start = "";
        this.date_end = "";
        this.all_day = false;
        this.status = "";
        this.reason = "";
        this.supervisor = [];
        this.notes = null;
    }
}