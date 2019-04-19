interface IFormatData {
    name: string;
    rank: string;
    monotype?: string | null;
}
/**
 * Determines the data stored in a format line.
 *
 * @private
 * @param formatLine Format line to check.
 * @return Object containing name, rank and optional monotype.
 */
declare const splitFormatLineData: (formatLine: string) => IFormatData;
/**
 * Joins the sub-elements of a format back together.
 *
 * @private
 * @param format Format to use.
 * @return Joined format.
 */
declare const joinFormatLineData: (format: IFormatData) => string;
export { IFormatData, splitFormatLineData, joinFormatLineData };
