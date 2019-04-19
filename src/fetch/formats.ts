import fetch from "node-fetch";
import { IFormatsData, parseFormatsPage } from "../parse/smogon/page/formats";
import { SubFolder } from "../url/SubFolder";
import { UrlBuilder } from "../url/UrlBuilder";
import { checkStatus } from "../util/httpUtil";

/**
 * Loads a list of all available formats for a given timeframe.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param useMonotype Optional, If monotype formats should be loaded, defaults to false.
 * @return List of formats.
 */
const fetchFormats = async (
    timeframe: string,
    useMonotype: boolean = false
): Promise<IFormatsData> => {
    const urlBuilder = new UrlBuilder();
    urlBuilder.setTimeframe(timeframe);

    if (useMonotype) {
        urlBuilder.setSubFolder(SubFolder.MONOTYPE);
    }

    return fetch(urlBuilder.build())
        .then(checkStatus)
        .then(res => res.text())
        .then(parseFormatsPage);
};

export { fetchFormats };
