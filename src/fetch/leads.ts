import fetch from "node-fetch";
import { URL_STATS } from "../constants";
import { ILeadsData, parseLeadsPage } from "../parse/smogon/page/leads";
import { checkStatus, urlJoin } from "../util/httpUtil";

const URL_PATH_LEADS = "leads";

/**
 * Loads leads data for the given timeframe and format.
 *
 * @public
 * @return Leads data.
 */
const fetchLeads = async (
    timeframe: string,
    format: string
): Promise<ILeadsData> =>
    fetch(urlJoin(URL_STATS, timeframe, URL_PATH_LEADS, `${format}.txt`))
        .then(checkStatus)
        .then(res => res.text())
        .then(parseLeadsPage);

export { fetchLeads };