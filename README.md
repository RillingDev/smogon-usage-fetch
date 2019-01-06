# smogon-usage-fetch

NodeJS API to fetch [smogon usage stats](http://www.smogon.com/stats/) as JSON.

## Usage

```typescript
import {
    fetchChaos,
    fetchFormats,
    fetchLeads,
    fetchTimeframes,
    fetchUsage
} from "smogon-usage-fetch";

fetchTimeframes()
    .then(timeframes => console.log("TIMEFRAMES", timeframes))
    .catch(console.error);

fetchFormats("2015-07")
    .then(formats => console.log("FORMATS", formats))
    .catch(console.error);

fetchUsage("2015-07", "ou-0")
    .then(usage => console.log("USAGE", usage))
    .catch(console.error);

fetchLeads("2015-07", "ou-0")
    .then(leads => console.log("LEADS", leads))
    .catch(console.error);

fetchChaos("2015-07", "ou-0")
    .then(chaos => console.log("CHAOS", chaos))
    .catch(console.error);

```
