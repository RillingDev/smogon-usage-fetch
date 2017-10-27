const {
    getTimeframeModeStats
} = require("./index");

getTimeframeModeStats("2016-03", "ou-0")
    .then(d => console.log(d));
