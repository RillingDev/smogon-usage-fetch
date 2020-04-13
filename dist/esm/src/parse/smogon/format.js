import { groupMapReducingBy } from "lightdash";
import { compact } from "lodash";
/**
 * @private
 */
const RANK_DEFAULT = "0";
/**
 * @private
 */
const FORMAT_DELIMITER = "-";
/**
 * @private
 */
const FORMAT_ELEMENTS_LOWER_BOUND = 2;
/**
 * @private
 */
const FORMAT_ELEMENTS_UPPER_BOUND = 3;
/**
 * @private
 */
const FORMAT_INDEX_NAME = 0;
/**
 * @private
 */
const FORMAT_INDEX_MONOTYPE = 1;
/**
 * @private
 */
const FORMAT_INDEX_RANK = 2;
/**
 * @private
 */
const FORMAT_INDEX_RANK_ALTERNATE = 1;
/**
 * Normalizes a rank to "0" if it is not set.
 *
 * @private
 * @param rank Rank to normalize
 * @return Normalized rank.
 */
const normalizeRank = (rank) => rank !== null && rank !== void 0 ? rank : RANK_DEFAULT;
/**
 * Determines the format data stored in a line.
 *
 * @public
 * @param formatLine Format data line to check.
 * @return Object containing name, rank and optional monotype.
 */
const formatFromString = (formatLine) => {
    const split = formatLine.split(FORMAT_DELIMITER);
    if (split.length < FORMAT_ELEMENTS_LOWER_BOUND ||
        split.length > FORMAT_ELEMENTS_UPPER_BOUND) {
        throw new Error(`Not a valid format: '${formatLine}', expecting between ${FORMAT_ELEMENTS_LOWER_BOUND} and ${FORMAT_ELEMENTS_UPPER_BOUND} sub-elements but got ${split.length}.`);
    }
    const name = split[FORMAT_INDEX_NAME];
    let monotype;
    let rank;
    if (split.length === FORMAT_ELEMENTS_UPPER_BOUND) {
        monotype = split[FORMAT_INDEX_MONOTYPE];
        rank = split[FORMAT_INDEX_RANK];
    }
    else {
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
const formatToString = (format) => compact([format.name, format.monotype, normalizeRank(format.rank)]).join(FORMAT_DELIMITER);
/**
 * Creates a merged list from a full list of formats.
 *
 * @private
 * @param formats Format data to use.
 * @return List of combined formats.
 */
const formatAsCombined = (formats) => Array.from(groupMapReducingBy(formats, (val) => val.name, ({ name }) => {
    return {
        name,
        ranks: [],
        monotype: [],
    };
}, (combinedElement, { rank, monotype }) => {
    rank = normalizeRank(rank);
    if (!combinedElement.ranks.includes(rank)) {
        combinedElement.ranks.push(rank);
    }
    if (monotype != null &&
        !combinedElement.monotype.includes(monotype)) {
        combinedElement.monotype.push(monotype);
    }
    return combinedElement;
}).values());
/**
 * Maps a list of format lines to a full and a combined format list.
 *
 * @private
 * @param formatLines Format lines to use.
 * @return Object containing full and combined formats.
 */
const mapFormats = (formatLines) => {
    const full = formatLines.map(formatFromString);
    const combined = formatAsCombined(full);
    return { full, combined };
};
export { formatFromString, formatToString, mapFormats, };
//# sourceMappingURL=format.js.map