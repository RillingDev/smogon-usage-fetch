/**
 * @public
 */
interface Format {
    readonly name: string;
    readonly rank?: string;
    readonly monotype?: string;
}

/**
 * @private
 */
const FORMAT_DELIMITER = "-";

/**
 * Determines the format data stored in a line.
 *
 * @private
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
 * Normalizes a rank to "0" if it is not set.
 *
 * @private
 * @param rank Rank to normalize
 * @return Normalized rank.
 */
const normalizeRank = (rank?: string): string => rank ?? "0";

/**
 * Joins the sub-elements of format data back in a line.
 *
 * @private
 * @param format Format to use.
 * @return Joined format data line.
 */
const formatToString = (format: Format): string => {
    const strings = [format.name];
    if (format.monotype != null) {
        strings.push(format.monotype);
    }
    strings.push(normalizeRank(format.rank));
    return strings.join(FORMAT_DELIMITER);
};

export { formatFromString, formatToString, Format };
