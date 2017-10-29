const axiosInstance = require("./axiosInstance");
const parseList = require("./parseList");

module.exports = (timeframe) => new Promise((resolve, reject) => {
    axiosInstance(`${timeframe}/`)
        .then(res => {
            resolve(parseList(res.data)
                .filter(item => !item.endsWith("/")) //exclude sub-directories
                .map(item => item.replace(".txt", ""))
            );
        })
        .catch(reject);
});
