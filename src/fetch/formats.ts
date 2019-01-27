import fetch from "node-fetch";
import { parseList } from "../parse/list";
import { checkStatus } from "../util/httpUtil";
import { isFile, removeExtension } from "../util/strUtil";
import { UrlBuilder } from "../url/UrlBuilder";

/**
 * Loads a list of all available formats for a given timeframe.
 *
 * @public
 * @return List of format names.
 */
const fetchFormats = async (
    timeframe: string,
    useMonotype?: boolean
): Promise<string[]> =>
    fetch(new UrlBuilder().setTimeframe(timeframe).build())
        .then(checkStatus)
        .then(res => res.text())
        .then(html =>
            parseList(html)
                .filter(isFile)
                .map(removeExtension)
        );

export { fetchFormats };
