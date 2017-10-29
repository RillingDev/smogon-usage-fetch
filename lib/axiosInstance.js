const axios = require("axios");

const AXIOS_CONFIG = {
    timeout: 12000,
    baseURL: "https://www.smogon.com/stats/",
    responseType: "text"
};

module.exports = axios.create(AXIOS_CONFIG);
