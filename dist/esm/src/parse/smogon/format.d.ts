interface FormatData {
    combined: CombinedFormatData[];
    full: IndividualFormatData[];
}
interface CombinedFormatData {
    name: string;
    ranks: string[];
    monotype: string[];
}
interface IndividualFormatData {
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
 * Determines the format data stored in a line.
 *
 * @public
 * @param formatLine Format data line to check.
 * @return Object containing name, rank and optional monotype.
 */
declare const formatFromString: (formatLine: string) => IndividualFormatData;
/**
 * Joins the sub-elements of format data back in a line.
 *
 * @public
 * @param format Format to use.
 * @return Joined format data line.
 */
declare const formatToString: (format: IndividualFormatData) => string;
/**
 * Creates a merged list from a full list of formats.
 *
 * @public
 * @param formats Format data to use.
 * @return List of combined formats.
 */
declare const formatAsCombined: (formats: IndividualFormatData[]) => CombinedFormatData[];
/**
 * Maps a list of format lines to a full and a combined format list.
 *
 * @private
 * @param formatLines Format lines to use.
 * @return Object containing full and combined formats.
 */
declare const mapFormats: (formatLines: string[]) => FormatData;
export { formatFromString, formatToString, mapFormats, formatAsCombined, normalizeRank, FormatData, CombinedFormatData, IndividualFormatData, };
//# sourceMappingURL=format.d.ts.map