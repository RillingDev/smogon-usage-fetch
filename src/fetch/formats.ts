import fetch from "node-fetch";
import { parseList } from "../parse/list";
import { checkStatus } from "../util/httpUtil";
import { isFile, removeExtension } from "../util/strUtil";
import { UrlBuilder } from "../url/UrlBuilder";
import { SubFolder } from "../url/SubFolder";
import { formatPair, mapFormats } from "../parse/smogon/format";

/**
 *Loads a list of all available formats for a given timeframe.
 *
 * @public
 * @param timeframe Timeframe to load.
 * @param useMonotype Optional, If monotype formats should be loaded, defaults to false.
 * @return List of formats.
 */
const fetchFormats = async (
    timeframe: string,
    useMonotype: boolean = false
): Promise<formatPair[]> => {
    const urlBuilder = new UrlBuilder();
    urlBuilder.setTimeframe(timeframe);

    if (useMonotype) {
        urlBuilder.setSubFolder(SubFolder.MONOTYPE);
    }

    return fetch(urlBuilder.build())
        .then(checkStatus)
        .then(res => res.text())
        .then(html =>
            mapFormats(
                parseList(html)
                    .filter(isFile)
                    .map(removeExtension)
            )
        );
};

export { fetchFormats };
