export default class UserData {
    constructor() {
        this.resetData();
    }

    resetData() {
        this.id = null;
        this.is_superuser = null;
        this.username = null;
        this.first_name = null;
        this.last_name = null;
        this.password = null;
    }
}