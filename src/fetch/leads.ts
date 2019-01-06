import fetch from "node-fetch";
import { URL_STATS } from "../constants";
import { checkStatus, urlJoin } from "../util/httpUtil";
import { ILeadsPageData, parseLeadsPage } from "../parse/smogon/leads";

const URL_PATH_LEADS = "leads";

/**
 * Loads leads data for the given timeframe and format.
 *
 * @return Leads data.
 */
const fetchLeads = async (
    timeframe: string,
    format: string
): Promise<ILeadsPageData> =>
    fetch(urlJoin(URL_STATS, timeframe, URL_PATH_LEADS, `${format}.txt`))
        .then(checkStatus)
        .then(res => res.text())
        .then(parseLeadsPage);

export { fetchLeads };
