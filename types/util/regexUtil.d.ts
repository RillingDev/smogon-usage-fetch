/**
 * Gets a group match as a number.
 *
 * @private
 * @param str String to use.
 * @param regex Regex to match.
 * @param groupIndex Index to get.
 * @return The non-NaN group result number.
 * @throws when the group is not found or cannot be converted.
 */
declare const getGroupMatchAsNumber: (str: string, regex: RegExp, groupIndex: number) => number;
export { getGroupMatchAsNumber };
