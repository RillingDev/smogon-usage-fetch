# smogon-usage-fetch

JavaScript API to fetch [smogon usage stats](http://www.smogon.com/stats/) as JavaScript objects.

## Usage

```typescript
import { SmogonApiClientConfig } from "smogon-usage-fetch";

const client = new SmogonApiClient();

/*
 * Timeframes
 */
client
	.fetchTimeframes()
	.then((timeframes) => console.log("TIMEFRAMES", timeframes))
	.catch(console.error);

/*
 * Formats
 */
client
	.fetchFormats({ year: "2019", month: "01" })
	.then((formats) => console.log("FORMATS", formats))
	.catch(console.error);

client
	.fetchFormats({ year: "2019", month: "01" }, true)
	.then((formats) => console.log("FORMATS MONO", formats))
	.catch(console.error);

/*
 * Usage
 */
client
	.fetchUsages({ year: "2019", month: "01" }, { name: "gen7ou" })
	.then((usage) => console.log("USAGE", usage))
	.catch(console.error);

client
	.fetchUsages(
		{ year: "2019", month: "01" },
		{ name: "gen7monotype", rank: "0", monotype: "monowater" }
	)
	.then((usage) => console.log("USAGE MONOTYPE", usage))
	.catch(console.error);

/*
 * Moveset / Chaos (contain the same data)
 */
client
	.fetchMovesets({ year: "2019", month: "01" }, { name: "gen7ou" })
	.then((moveset) => console.log("MOVESETS", moveset))
	.catch(console.error);

/*
 * Leads
 */
client
	.fetchLeads({ year: "2019", month: "01" }, { name: "gen7ou" })
	.then((leads) => console.log("LEADS", leads))
	.catch(console.error);

/*
 * Metagame
 */
client
	.fetchMetagame({ year: "2019", month: "01" }, { name: "gen7ou" })
	.then((meta) => console.log("META", meta))
	.catch(console.error);
```

### Configuring Connection to Smogon

This library is usable in the browser, but may need slight modifications (for example, an intermediate server to avoid CORS issues). The client constructor options let you set a custom base URL that should be used instead of the default Smogon URL.

```typescript
const client = new SmogonApiClient({
	customBaseUrl: new URL("https://my-url"),
});

/*
 * Timeframes
 */
client
	.fetchTimeframes()
	.then((timeframes) => console.log("TIMEFRAMES", timeframes))
	.catch(console.error);
```
