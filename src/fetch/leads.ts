import fetch from "node-fetch";
import { FormatData } from "../parse/smogon/format";
import { LeadsData, parseLeadsPage } from "../parse/smogon/page/leads";
import { TimeframeData } from "../parse/smogon/timeframe";
import { ApiPath, FileType, UrlBuilder } from "../url/UrlBuilder";
import { checkStatus } from "../util/httpUtil";

/**
 * Loads leads data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return Leads data.
 */
const fetchLeads = async (
    timeframe: TimeframeData,
    format: FormatData,
    customBaseUrl?: string
): Promise<LeadsData> => {
    const urlBuilder = new UrlBuilder();

    if (customBaseUrl) {
        urlBuilder.setCustomBaseUrl(customBaseUrl);
    }

    return fetch(
        urlBuilder
            .setPath(ApiPath.LEADS)
            .setFileType(FileType.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build()
    )
        .then(checkStatus)
        .then((res) => res.text())
        .then(parseLeadsPage);
};

export { fetchLeads };
