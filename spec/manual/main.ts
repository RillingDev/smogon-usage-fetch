/* eslint-disable @typescript-eslint/unbound-method */
import { SmogonApiClient } from "../../src/main";

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
