import { isNil } from "lightdash";
import { isFile, removeExtension } from "../../../util/strUtil";
import { parseApacheDirectoryListing } from "../../list";
import { IFormatData, normalizeRank, splitFormatLineData } from "../format";

interface IFormatsData {
    combined: ICombinedFormatData[];
    full: IFormatData[];
}

interface ICombinedFormatData {
    name: string;
    ranks: string[];
    monotype: string[];
}

/**
 * Creates an new format data object.
 *
 * @private
 * @param name Name of the format.
 * @return New format data object.
 */
const createFormatData = (name: string): ICombinedFormatData => {
    return { name, ranks: [], monotype: [] };
};

/**
 * Creates a merged list from a full list of formats.
 *
 * @private
 * @param formats Format data to use.
 * @return List of combined formats.
 */
const createCombinedFormats = (
    formats: IFormatData[]
): ICombinedFormatData[] => {
    const combinedMap = new Map<string, ICombinedFormatData>();

    formats.forEach(({ name, rank, monotype }) => {
        rank = normalizeRank(rank);

        if (!combinedMap.has(name)) {
            combinedMap.set(name, createFormatData(name));
        }
        const current = combinedMap.get(name)!;
        if (!current.ranks.includes(rank)) {
            current.ranks.push(rank);
        }
        if (!isNil(monotype) && !current.monotype.includes(monotype)) {
            current.monotype.push(monotype);
        }
    });

    return Array.from(combinedMap.values());
};

/**
 * Maps a list of format lines to a full and a combined format list.
 *
 * @private
 * @param formatLines Format lines to use.
 * @return Object containing full and combined formats.
 */
const mapFormats = (formatLines: string[]): IFormatsData => {
    const full = formatLines.map(splitFormatLineData);
    const combined = createCombinedFormats(full);
    return { full, combined };
};

/**
 * Parses a smogon format list page.
 *
 * @private
 * @param html HTML of the format list page.
 * @returns Parsed formats.
 */
const parseFormatsPage = (html: string): IFormatsData =>
    mapFormats(
        parseApacheDirectoryListing(html)
            .filter(isFile)
            .map(removeExtension)
    );

export { parseFormatsPage, IFormatsData, ICombinedFormatData };
