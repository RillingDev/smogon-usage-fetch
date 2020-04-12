import { request } from "../http/request";
import { parseLeadsPage } from "../parse/smogon/page/leads";
import { ApiPath, FileType, UrlBuilder } from "../http/UrlBuilder";
/**
 * Loads leads data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return Leads data.
 */
const fetchLeads = async (timeframe, format, customBaseUrl) => {
    const urlBuilder = new UrlBuilder();
    if (customBaseUrl) {
        urlBuilder.setCustomBaseUrl(customBaseUrl);
    }
    const url = urlBuilder
        .setPath(ApiPath.LEADS)
        .setFileType(FileType.TEXT)
        .setTimeframe(timeframe)
        .setFormat(format)
        .build();
    const response = await request(url, FileType.TEXT);
    return parseLeadsPage(response.data);
};
export { fetchLeads };
//# sourceMappingURL=leads.js.map