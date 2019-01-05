import fetch from "node-fetch";
import { URL_STATS } from "../constants";
import { urlJoin } from "../util/urlUtil";
import { IUsagePageData, parseUsagePage } from "../parse/showdown/table";

/**
 * Loads usage data for the given timeframe and format.
 *
 * @return Usage data.
 */
const fetchUsage = async (
    timeframe: string,
    format: string
): Promise<IUsagePageData> =>
    fetch(urlJoin(URL_STATS, timeframe, `${format}.txt`))
        .then(res => res.text())
        .then(parseUsagePage);

export { fetchUsage };
