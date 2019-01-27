# smogon-usage-fetch

NodeJS API to fetch [smogon usage stats](http://www.smogon.com/stats/) as JSON.

## Usage

```typescript
import {
    fetchChaos,
    fetchFormats,
    fetchLeads,
    fetchTimeframes,
    fetchUsage,
    fetchMetagame
} from "smogon-usage-fetch";

fetchTimeframes()
    .then(timeframes => console.log("TIMEFRAMES", timeframes))
    .catch(console.error);



fetchFormats("2018-07")
    .then(formats => console.log("FORMATS", formats))
    .catch(console.error);

fetchFormats("2018-07",true)
    .then(formats => console.log("FORMATS MONO", formats))
    .catch(console.error);



fetchUsage("2018-07", "gen7ou")
    .then(usage => console.log("USAGE", usage))
    .catch(console.error);

fetchUsage("2018-07", "gen7monotype", "0", "monowater")
    .then(usage => console.log("USAGE MONOTYPE", usage))
    .catch(console.error);



fetchLeads("2018-07", "gen7ou")
    .then(leads => console.log("LEADS", leads))
    .catch(console.error);

fetchChaos("2018-07", "gen7ou")
    .then(chaos => console.log("CHAOS", chaos))
    .catch(console.error);

fetchMetagame("2018-07", "gen7ou")
    .then(meta => console.log("META", meta))
    .catch(console.error);


```
