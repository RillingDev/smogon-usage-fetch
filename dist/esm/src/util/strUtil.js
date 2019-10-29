import { isRegExp } from "lodash";
/**
 * Removes trailing sequences from a string.
 *
 * @private
 * @param str String to use.
 * @param seq Sequence to remove.
 * @return String without trailing sequence.
 */
const removeTrailing = (str, seq) => {
    if (isRegExp(seq)) {
        return str.replace(seq, "");
    }
    if (!str.includes(seq)) {
        return str;
    }
    return str.substr(0, str.lastIndexOf(seq));
};
/**
 * Removes trailing slashes from a string.
 *
 * @private
 * @param str String to use.
 * @return String without trailing slash.
 */
const removeTrailingSlash = (str) => removeTrailing(str, "/");
/**
 * Removes file extension from a string
 *
 * @private
 * @param str String to use.
 * @return String without file extension.
 */
const removeExtension = (str) => removeTrailing(str, /\..+$/);
/**
 * Checks if a file name is a directory.
 *
 * @private
 * @param str String to check.
 * @return If the file is a directory.
 */
const isFile = (str) => !str.endsWith("/");
export { isFile, removeTrailing, removeTrailingSlash, removeExtension };
//# sourceMappingURL=strUtil.js.map