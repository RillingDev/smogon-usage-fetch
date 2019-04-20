import { arrCompact, isNil } from "lightdash";

const RANK_DEFAULT = "0";

const FORMAT_DELIMITER = "-";
const FORMAT_ELEMENTS_LOWER_BOUND = 2;
const FORMAT_ELEMENTS_UPPER_BOUND = 3;

const FORMAT_INDEX_NAME = 0;
const FORMAT_INDEX_MONOTYPE = 1;
const FORMAT_INDEX_RANK = 2;
const FORMAT_INDEX_RANK_ALTERNATE = 1;

interface IFormatData {
    name: string;
    rank?: string;
    monotype?: string | null;
}

const normalizeRank = (rank?: string): string =>
    isNil(rank) ? RANK_DEFAULT : rank;

/**
 * Determines the data stored in a format line.
 *
 * @private
 * @param formatLine Format line to check.
 * @return Object containing name, rank and optional monotype.
 */
const splitFormatLineData = (formatLine: string): IFormatData => {
    const split = formatLine.split(FORMAT_DELIMITER);

    if (
        split.length < FORMAT_ELEMENTS_LOWER_BOUND ||
        split.length > FORMAT_ELEMENTS_UPPER_BOUND
    ) {
        throw new Error(
            `Not a valid format: '${formatLine}', expecting between ${FORMAT_ELEMENTS_LOWER_BOUND} and ${FORMAT_ELEMENTS_UPPER_BOUND} sub-elements but got ${
                split.length
            }.`
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
