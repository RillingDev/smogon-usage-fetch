import {
    fetchChaos,
    fetchFormats,
    fetchTimeframes,
    fetchUsage
} from "../../src/main";

const main = async () => {
    const timeframes = await fetchTimeframes();
    console.log("TIMEFRAMES", timeframes);

    const formats = await fetchFormats(timeframes[0]);
    console.log("FORMATS", formats);

    const usage = await fetchUsage(timeframes[0], formats[0]);
    console.log("USAGE", usage);

    const chaos = await fetchChaos(timeframes[0], formats[0]);
    console.log("CHAOS", chaos);
};

main()
    .then(() => console.log("done"))
    .catch(console.error);
