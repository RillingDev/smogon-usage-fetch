const axiosInstance = require("./axiosInstance");
const parseList = require("./parseList");

module.exports = () =>
    new Promise((resolve, reject) => {
        axiosInstance("/")
            .then(res => {
                const result = parseList(res.data).map(item =>
                    item.substr(0, item.length - 1)
                );

                resolve(result);
            })
            .catch(reject);
    });
