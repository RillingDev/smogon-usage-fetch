import fetch from "node-fetch";
import { IFormatData } from "../parse/smogon/format";
import {
    IMetagameData,
    parseMetagamePage
} from "../parse/smogon/page/metagame";
import { ITimeframeData } from "../parse/smogon/timeframe";
import { Extension } from "../url/Extension";
import { SubFolder } from "../url/SubFolder";
import { UrlBuilder } from "../url/UrlBuilder";
import { checkStatus } from "../util/httpUtil";

/**
 * Loads metagame data for the given timeframe and format.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param format Format to load.
 * @param customBaseUrl Optional, prefixes the fetched URL with this base URL
 * @return Metagame data.
 */
const fetchMetagame = async (
    timeframe: ITimeframeData,
    format: IFormatData,
    customBaseUrl: string
): Promise<IMetagameData> => {
    const urlBuilder = new UrlBuilder();

    if (customBaseUrl) {
        urlBuilder.setCustomBaseUrl(customBaseUrl);
    }

    return fetch(
        urlBuilder
            .setSubFolder(SubFolder.METAGAME)
            .setExtension(Extension.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build()
    )
        .then(checkStatus)
        .then(res => res.text())
        .then(parseMetagamePage);
}

export { fetchMetagame };
