import { checkStatus, urlJoin } from "../util/httpUtil";
import { URL_STATS } from "../constants";
import fetch from "node-fetch";

const URL_PATH_CHAOS = "chaos";

/**
 * Loads the chaos data for a given timeframe and format.
 *
 * @return Object containing chaos data.
 */
const fetchChaos = async (timeframe: string, format: string): Promise<any> =>
    fetch(urlJoin(URL_STATS, timeframe, URL_PATH_CHAOS, `${format}.json`))
        .then(checkStatus)
        .then(res => res.json());

export { fetchChaos };
