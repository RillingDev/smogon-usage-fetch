declare type frequencyPair = [string, number];
/**
 * Converts a string by its identity, not modifying it at all.
 *
 * @private
 * @param str String to use.
 * @return Same string as provided as parameter.
 */
declare const convertIdentity: (str: string) => string;
/**
 * Converts a string in the format "123" to a number.
 *
 * @private
 * @param str String to use.
 * @return Number.
 */
declare const convertNumber: (str: string) => number;
/**
 * Converts a string in the format "123%" to a number.
 *
 * @private
 * @param str String to use.
 * @return Frequency number.
 */
declare const convertFrequency: (str: string) => number;
/**
 * Converts a line in the format "foo 12%" to a pair of name and frequency.
 *
 * @private
 * @param str String to use.
 * @param paddingRegex Optional regex to use for padding checking.
 * @return Frequency pair.
 */
declare const convertFrequencyPair: (str: string, paddingRegex?: RegExp) => [string, number];
export { frequencyPair, convertFrequencyPair, convertFrequency, convertIdentity, convertNumber };
//# sourceMappingURL=convert.d.ts.map