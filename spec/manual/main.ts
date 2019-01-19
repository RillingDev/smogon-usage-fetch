import {
    fetchChaos,
    fetchFormats,
    fetchLeads, fetchMetagame,
    fetchTimeframes,
    fetchUsage
} from "../../src/main";

fetchTimeframes()
    .then(timeframes => console.log("TIMEFRAMES", timeframes))
    .catch(console.error);

fetchFormats("2018-07")
    .then(formats => console.log("FORMATS", formats))
    .catch(console.error);

fetchUsage("2018-07", "gen7ou-0")
    .then(usage => console.log("USAGE", usage))
    .catch(console.error);

fetchLeads("2018-07", "gen7ou-0")
    .then(leads => console.log("LEADS", leads))
    .catch(console.error);

fetchChaos("2018-07", "gen7ou-0")
    .then(chaos => console.log("CHAOS", chaos))
    .catch(console.error);

fetchMetagame("2018-07", "gen7ou-0")
    .then(chaos => console.log("CHAOS", chaos))
    .catch(console.error);
