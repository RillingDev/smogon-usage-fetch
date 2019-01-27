import fetch from "node-fetch";
import { URL_STATS } from "../constants";
import {
    IMetagameData,
    parseMetagamePage
} from "../parse/smogon/page/metagame";
import { checkStatus, urlJoin } from "../util/httpUtil";

const URL_PATH_METAGAME = "metagame";

/**
 * Loads metagame data for the given timeframe and format.
 *
 * @public
 * @return Metagame data.
 */
const fetchMetagame = async (
    timeframe: string,
    format: string
): Promise<IMetagameData> =>
    fetch(urlJoin(URL_STATS, timeframe, URL_PATH_METAGAME, `${format}.txt`))
        .then(checkStatus)
        .then(res => res.text())
        .then(parseMetagamePage);

export { fetchMetagame };
