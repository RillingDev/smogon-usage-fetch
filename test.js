const {
    getTimeframes,
    getFormats,
    getUsage
} = require("./index");

// Normal API Access
/* getTimeframes()
    .then(data => console.log("Timeframes:", data)); */

/* getFormats("2017-03")
    .then(data => console.log("Modes for timeframe 2017-03:", data))
    .catch(console.error); */

/* getUsage("2017-03", "battlefactory-1760")
    .then(data => console.log("Usage data for 2017-03 battlefactory-1760:", data)); */


// Example: load latest OU data
getTimeframes()
    .then(timeframes => {
        const latest = timeframes[timeframes.length - 1];

        getUsage(latest, "gen7ou-0")
            .then(data => console.log(data.stats));
    });

/* getTimeframeModeStats("2017-03/leads", "gen1ou-0")
    .then(data => console.log(data)); */
