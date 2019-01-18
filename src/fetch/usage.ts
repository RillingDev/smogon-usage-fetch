import fetch from "node-fetch";
import { URL_STATS } from "../constants";
import { IUsageData, parseUsagePage } from "../parse/smogon/page/usage";
import { checkStatus, urlJoin } from "../util/httpUtil";

/**
 * Loads usage data for the given timeframe and format.
 *
 * @public
 * @return Usage data.
 */
const fetchUsage = async (
    timeframe: string,
    format: string
): Promise<IUsageData> =>
    fetch(urlJoin(URL_STATS, timeframe, `${format}.txt`))
        .then(checkStatus)
        .then(res => res.text())
        .then(parseUsagePage);

export { fetchUsage };
