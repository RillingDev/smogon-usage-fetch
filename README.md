# smogon-usage-fetch

API to fetch[ smogon usage stats](http://www.smogon.com/stats/)

## Usage

All methods return promises.

```js
const {
    getTimeframes,
    getTimeframeModes,
    getTimeframeModeStats
} = require("./index");

// Normal API Access
getTimeframes()
    .then(data => console.log("Timeframes:", data));

getTimeframeModes("2017-03")
    .then(data => console.log("Modes for timeframe 2017-03:", data));

getTimeframeModeStats("2017-03", "battlefactory-1760")
    .then(data => console.log("Usage data for 2017-03 battlefactory-1760:", data));


// Example: load latest OU data
getTimeframes()
    .then(timeframes => {
        const latest = timeframes[timeframes.length - 1];

        getTimeframeModeStats(latest, "gen7ou-0")
            .then(data => console.log(data.stats));
    });

```
