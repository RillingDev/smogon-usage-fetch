# smogon-usage-fetch

NodeJS API to fetch [smogon usage stats](http://www.smogon.com/stats/) as JSON.

## Usage

```typescript
import {
    fetchChaos,
    fetchFormats,
    fetchLeads,
    fetchMetagame,
    fetchTimeframes,
    fetchUsage
} from "smogon-usage-fetch";

/*
 * Timeframes
 */
fetchTimeframes()
    .then(timeframes => console.log("TIMEFRAMES", timeframes))
    .catch(console.error);

/*
 * Formats
 */
fetchFormats({ year: "2019", month: "01" })
    .then(formats => console.log("FORMATS", formats))
    .catch(console.error);

fetchFormats({ year: "2019", month: "01" }, true)
    .then(formats => console.log("FORMATS MONO", formats))
    .catch(console.error);

/*
 * Usage
 */
fetchUsage({ year: "2019", month: "01" }, { name: "gen7ou" })
    .then(usage => console.log("USAGE", usage))
    .catch(console.error);

fetchUsage(
    { year: "2019", month: "01" },
    { name: "gen7monotype", rank: "0", monotype: "monowater" }
)
    .then(usage => console.log("USAGE MONOTYPE", usage))
    .catch(console.error);

/*
 * Moveset / Chaos (contain the same data)
 */
fetchChaos({ year: "2019", month: "01" }, { name: "gen7ou" })
    .then(chaos => console.log("CHAOS", chaos))
    .catch(console.error);
// fetchChaos("2018-07", "gen7ou")
//     .then(chaos => console.log("CHAOS", chaos))
//     .catch(console.error);

/*
 * Leads
 */
fetchLeads({ year: "2019", month: "01" }, { name: "gen7ou" })
    .then(leads => console.log("LEADS", leads))
    .catch(console.error);

/*
 * Metagame
 */
fetchMetagame({ year: "2019", month: "01" }, { name: "gen7ou" })
    .then(meta => console.log("META", meta))
    .catch(console.error);


```

## Browser Usage

This library is still usable in the browser, but will need slight modifications due to CORS issues. The last argument of the fetch functions will let you pass in a prefix to the base URL, giving you the option of using a CORS proxy. 

**Important:** Keep in mind that this approach is only as stable as the CORS proxy is. That means that you should expect downtime with this method, depending on your proxy of choice.

```typescript

// The cors.io proxy is used in these examples, but
// you can use any proxy you like.

fetchTimeframes("https://cors.io/?")
    .then(timeframes => console.log("TIMEFRAMES", timeframes))
    .catch(console.error);

fetchFormats({ year: "2019", month: "01" }, true, "https://cors.io/?")
    .then(formats => console.log("FORMATS MONO", formats))
    .catch(console.error);

fetchUsage({ year: "2019", month: "01" }, { name: "gen7ou" }, "https://cors.io/?")
    .then(usage => console.log("USAGE", usage))
    .catch(console.error);

fetchChaos({ year: "2019", month: "01" }, { name: "gen7ou" }, "https://cors.io/?")
    .then(chaos => console.log("CHAOS", chaos))
    .catch(console.error);

fetchLeads({ year: "2019", month: "01" }, { name: "gen7ou" }, "https://cors.io/?")
    .then(leads => console.log("LEADS", leads))
    .catch(console.error);

fetchMetagame({ year: "2019", month: "01" }, { name: "gen7ou" }, "https://cors.io/?")
    .then(meta => console.log("META", meta))
    .catch(console.error);


```
