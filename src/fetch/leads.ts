import fetch from "node-fetch";
import { IFormatData } from "../parse/smogon/format";
import { ILeadsData, parseLeadsPage } from "../parse/smogon/page/leads";
import { ITimeframeData } from "../parse/smogon/timeframe";
import { Extension } from "../url/Extension";
import { SubFolder } from "../url/SubFolder";
import { UrlBuilder } from "../url/UrlBuilder";
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
    timeframe: ITimeframeData,
    format: IFormatData,
    customBaseUrl?: string
): Promise<ILeadsData> => {
    const urlBuilder = new UrlBuilder();

    if (customBaseUrl) {
        urlBuilder.setCustomBaseUrl(customBaseUrl);
    }

    return fetch(
        urlBuilder
            .setSubFolder(SubFolder.LEADS)
            .setExtension(Extension.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build()
    )
        .then(checkStatus)
        .then(res => res.text())
        .then(parseLeadsPage);
}

export { fetchLeads };
