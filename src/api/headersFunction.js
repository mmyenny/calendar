let headerFunction = {

    getHeaders(multipart = false) {
        let defaultHeaders = {};
        if (multipart) {
            defaultHeaders = {};
        }
        if (localStorage.token) {
            defaultHeaders = {
                Authorization: `JWT ${localStorage.token}`,
                ...defaultHeaders
            };
        }
        return defaultHeaders;
    }

}

export default headerFunction