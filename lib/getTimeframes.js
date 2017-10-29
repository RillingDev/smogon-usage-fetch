const axiosInstance = require("./axiosInstance");
const parseList = require("./parseList");

module.exports = () => new Promise((resolve, reject) => {
    axiosInstance("/")
        .then(res => {
            resolve(parseList(res.data)
                .map(item => item.substr(0, item.length - 1))
            );
        })
        .catch(reject);
});
