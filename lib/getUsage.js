const axiosInstance = require("./axiosInstance");
const parseTable = require("./parseTable");

module.exports = (timeframe, modes) => new Promise((resolve, reject) => {
    axiosInstance(`${timeframe}/${modes}.txt`)
        .then(res => {
            resolve(parseTable(res.data));
        })
        .catch(reject);
});
