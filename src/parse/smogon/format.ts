import { arrCompact, isNil } from "lightdash";

const FORMAT_DELIMITER = "-";

interface IFormatData {
    name: string;
    rank?: string;
    monotype?: string | null;
}

const normalizeRank = (rank?: string): string => (isNil(rank) ? "0" : rank);

/**
 * Determines the data stored in a format line.
 *
 * @private
 * @param formatLine Format line to check.
 * @return Object containing name, rank and optional monotype.
 */
const splitFormatLineData = (formatLine: string): IFormatData => {
    const split = formatLine.split(FORMAT_DELIMITER);

    if (split.length < 2 || split.length > 3) {
        throw new Error(
            `Not a valid format: '${formatLine}', expecting between 2 and 3 sub-elements but got ${
                split.length
            }.`
        );
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
 * Joins the sub-elements of a format back together.
 *
 * @private
 * @param format Format to use.
 * @return Joined format.
 */
const joinFormatLineData = (format: IFormatData): string =>
    arrCompact([format.name, format.monotype, normalizeRank(format.rank)]).join(
        FORMAT_DELIMITER
    );

export { IFormatData, splitFormatLineData, joinFormatLineData, normalizeRank };
