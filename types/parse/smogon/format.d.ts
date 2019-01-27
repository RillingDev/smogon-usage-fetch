declare type formatPair = [string, IFormatData];
interface IFormatData {
    ranks: string[];
    monotype: string[];
}
/**
 * Maps a list of format lines to a combined format list.
 *
 * @private
 * @param formatLines Format lines to use.
 * @return List of combined formats.
 */
declare const mapFormats: (formatLines: string[]) => [string, IFormatData][];
export { mapFormats, formatPair, IFormatData };
