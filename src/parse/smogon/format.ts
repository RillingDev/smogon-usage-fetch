import { compact } from "lodash";

/**
 * @private
 */
const RANK_DEFAULT = "0";
/**
 * @private
 */
const FORMAT_DELIMITER = "-";

interface Format {
    name: string;
    rank?: string;
    monotype?: string;
}

/**
 * Normalizes a rank to "0" if it is not set.
 *
 * @private
 * @param rank Rank to normalize
 * @return Normalized rank.
 */
const normalizeRank = (rank?: string): string => rank ?? RANK_DEFAULT;

/**
 * Determines the format data stored in a line.
 *
 * @public
 * @param formatLine Format data line to check.
 * @return Object containing name, rank and optional monotype.
 */
const formatFromString = (formatLine: string): Format => {
    const split = formatLine.split(FORMAT_DELIMITER);
    const itemsMin = 2;
    const itemsMax = 3;

    if (split.length < itemsMin || split.length > itemsMax) {
        throw new Error(
            `Not a valid format: '${formatLine}', expecting between ${itemsMin} and ${itemsMax} sub-elements but got ${split.length}.`
        );
    }

    const name = split[0];
    if (split.length === itemsMax) {
        const monotype = split[1];
        const rank = split[2];
        return { name, rank, monotype };
    } else {
        const rank = split[1];
        return { name, rank };
    }
};

/**
 * Joins the sub-elements of format data back in a line.
 *
 * @public
 * @param format Format to use.
 * @return Joined format data line.
 */
const formatToString = (format: Format): string =>
    compact([format.name, format.monotype, normalizeRank(format.rank)]).join(
        FORMAT_DELIMITER
    );

export { formatFromString, formatToString, Format };
