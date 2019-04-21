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
declare const normalizeRank: (rank?: string | undefined) => string;
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
/**
 * Creates a merged list from a full list of formats.
 *
 * @public
 * @param formats Format data to use.
 * @return List of combined formats.
 */
declare const createCombinedFormats: (formats: IFormatData[]) => ICombinedFormatData[];
/**
 * Maps a list of format lines to a full and a combined format list.
 *
 * @private
 * @param formatLines Format lines to use.
 * @return Object containing full and combined formats.
 */
declare const mapFormats: (formatLines: string[]) => IFormatsData;
export { splitFormatLineData, joinFormatLineData, mapFormats, createCombinedFormats, normalizeRank, IFormatsData, ICombinedFormatData, IFormatData };
