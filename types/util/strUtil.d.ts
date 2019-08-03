/**
 * Removes trailing sequences from a string.
 *
 * @private
 * @param str String to use.
 * @param seq Sequence to remove.
 * @return String without trailing sequence.
 */
declare const removeTrailing: (str: string, seq: string | RegExp) => string;
/**
 * Removes trailing slashes from a string.
 *
 * @private
 * @param str String to use.
 * @return String without trailing slash.
 */
declare const removeTrailingSlash: (str: string) => string;
/**
 * Removes file extension from a string
 *
 * @private
 * @param str String to use.
 * @return String without file extension.
 */
declare const removeExtension: (str: string) => string;
/**
 * Checks if a file name is a directory.
 *
 * @private
 * @param str String to check.
 * @return If the file is a directory.
 */
declare const isFile: (str: string) => boolean;
export { isFile, removeTrailing, removeTrailingSlash, removeExtension };
