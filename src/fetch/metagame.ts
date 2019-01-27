import fetch from "node-fetch";
import {
    IMetagameData,
    parseMetagamePage
} from "../parse/smogon/page/metagame";
import { checkStatus } from "../util/httpUtil";
import { UrlBuilder } from "../url/UrlBuilder";
import { SubFolder } from "../url/SubFolder";
import { Extension } from "../url/Extension";

/**
 * Loads metagame data for the given timeframe and format.
 *
 * @public
 * @return Metagame data.
 */
const fetchMetagame = async (
    timeframe: string,
    format: string,
    rank: string = "0",
    monotype?: string
): Promise<IMetagameData> =>
    fetch(
        new UrlBuilder()
            .setSubFolder(SubFolder.METAGAME)
            .setExtension(Extension.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .setRank(rank)
            .setMonotype(monotype)
            .build()
    )
        .then(checkStatus)
        .then(res => res.text())
        .then(parseMetagamePage);

export { fetchMetagame };
