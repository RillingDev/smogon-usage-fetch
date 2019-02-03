import { isNil } from "lightdash";
import { isFile, removeExtension } from "../../../util/strUtil";
import { parseList } from "../../list";

type formatsData = formatDataPair[];

type formatDataPair = [string, IFormatData];

interface IFormatData {
    ranks: string[];
    monotype: string[];
}

/**
 * Creates an empty format data object.
 *
 * @private
 * @return New, empty format data object.
 */
const createFormatData = (): IFormatData => {
    return { ranks: [], monotype: [] };
};

/**
 * Determines the data stored in a format line.
 *
 * @private
 * @param formatLine Format line to check.
 * @return Object containing name, rank and optional monotype.
 */
const determineFormatLineData = (formatLine: string) => {
    const split = formatLine.split("-");

    if (split.length < 2 || split.length > 3) {
        throw new Error(`Not a valid format: '${formatLine}'.`);
    }
    const name = split[0];
    let monotype;
    let rank;
    if (split.length === 3) {
        monotype = split[1];
        rank = split[2];
    } else {
        monotype = null;
        rank = split[1];
    }

    return { name, rank, monotype };
};

/**
 * Maps a list of format lines to a combined format list.
 *
 * @private
 * @param formatLines Format lines to use.
 * @return List of combined formats.
 */
const mapFormats = (formatLines: string[]): formatDataPair[] => {
    const formats = new Map<string, IFormatData>();

    for (const formatLine of formatLines) {
        const { name, rank, monotype } = determineFormatLineData(formatLine);
        const current = formats.has(name)
            ? formats.get(name)!
            : createFormatData();

        current.ranks.push(rank);
        if (!isNil(monotype)) {
            current.monotype.push(monotype);
        }

        formats.set(name, current);
    }

    return Array.from(formats.entries());
};

/**
 * Parses a smogon format list page.
 *
 * @private
 * @param html HTML of the format list page.
 * @returns Parsed formats.
 */
const parseFormatsPage = (html: string): formatsData =>
    mapFormats(
        parseList(html)
            .filter(isFile)
            .map(removeExtension)
    );

export { parseFormatsPage, formatsData, formatDataPair, IFormatData };
