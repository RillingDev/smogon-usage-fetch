import { groupMapReducingBy } from "lightdash";
import { compact, isNil } from "lodash";

const RANK_DEFAULT = "0";

const FORMAT_DELIMITER = "-";
const FORMAT_ELEMENTS_LOWER_BOUND = 2;
const FORMAT_ELEMENTS_UPPER_BOUND = 3;

const FORMAT_INDEX_NAME = 0;
const FORMAT_INDEX_MONOTYPE = 1;
const FORMAT_INDEX_RANK = 2;
const FORMAT_INDEX_RANK_ALTERNATE = 1;

interface IFormatsData {
    combined: ICombinedFormatData[];
    full: IFormatData[];
}

interface ICombinedFormatData {
    name: string;
    ranks: string[];
    monotype: string[];
}

interface IFormatData {
    name: string;
    rank?: string;
    monotype?: string | null;
}

/**
 * Normalizes a rank to "0" if it is not set.
 *
 * @private
 * @param rank Rank to normalize
 * @return Normalized rank.
 */
const normalizeRank = (rank?: string): string =>
    isNil(rank) ? RANK_DEFAULT : rank;

/**
 * Determines the format data stored in a line.
 *
 * @public
 * @param formatLine Format data line to check.
 * @return Object containing name, rank and optional monotype.
 */
const splitFormatDataLine = (formatLine: string): IFormatData => {
    const split = formatLine.split(FORMAT_DELIMITER);

    if (
        split.length < FORMAT_ELEMENTS_LOWER_BOUND ||
        split.length > FORMAT_ELEMENTS_UPPER_BOUND
    ) {
        throw new Error(
            `Not a valid format: '${formatLine}', expecting between ${FORMAT_ELEMENTS_LOWER_BOUND} and ${FORMAT_ELEMENTS_UPPER_BOUND} sub-elements but got ${split.length}.`
        );
    }

    const name = split[FORMAT_INDEX_NAME];
    let monotype;
    let rank;

    if (split.length === FORMAT_ELEMENTS_UPPER_BOUND) {
        monotype = split[FORMAT_INDEX_MONOTYPE];
        rank = split[FORMAT_INDEX_RANK];
    } else {
        monotype = null;
        rank = split[FORMAT_INDEX_RANK_ALTERNATE];
    }

    return { name, rank, monotype };
};

/**
 * Joins the sub-elements of format data back in a line.
 *
 * @public
 * @param format Format to use.
 * @return Joined format data line.
 */
const joinFormatDataLine = (format: IFormatData): string =>
    compact([format.name, format.monotype, normalizeRank(format.rank)]).join(
        FORMAT_DELIMITER
    );

/**
 * Creates a merged list from a full list of formats.
 *
 * @public
 * @param formats Format data to use.
 * @return List of combined formats.
 */
const createCombinedFormats = (formats: IFormatData[]): ICombinedFormatData[] =>
    Array.from(
        groupMapReducingBy<IFormatData, string, ICombinedFormatData>(
            formats,
            val => val.name,
            ({ name }): ICombinedFormatData => {
                return {
                    name,
                    ranks: [],
                    monotype: []
                };
            },
            (combinedElement, { name, rank, monotype }) => {
                rank = normalizeRank(rank);
                if (!combinedElement.ranks.includes(rank)) {
                    combinedElement.ranks.push(rank);
                }
                if (
                    !isNil(monotype) &&
                    !combinedElement.monotype.includes(monotype)
                ) {
                    combinedElement.monotype.push(monotype);
                }

                return combinedElement;
            }
        ).values()
    );

/**
 * Maps a list of format lines to a full and a combined format list.
 *
 * @private
 * @param formatLines Format lines to use.
 * @return Object containing full and combined formats.
 */
const mapFormats = (formatLines: string[]): IFormatsData => {
    const full = formatLines.map(splitFormatDataLine);
    const combined = createCombinedFormats(full);
    return { full, combined };
};

export {
    splitFormatDataLine,
    joinFormatDataLine,
    mapFormats,
    createCombinedFormats,
    normalizeRank,
    IFormatsData,
    ICombinedFormatData,
    IFormatData
};
