const axios = require("axios");

const AXIOS_CONFIG = {
    baseURL: "http://www.smogon.com/stats/",
    timeout: 900000, // 15 minutes timeout, because the smogon server is quite slow
    responseType: "text"
};

module.exports = axios.create(AXIOS_CONFIG);
