import { isRegExp } from "lightdash";

/**
 * Removes trailing sequences from a string.
 *
 * @param str String to use.
 * @param seq Sequence to remove.
 * @return String without trailing sequence.
 */
const removeTrailing = (str: string, seq: string | RegExp): string => {
    if (isRegExp(seq)) {
        return str.replace(seq, "");
    }

    return str.includes(seq) ? str.substr(0, str.lastIndexOf(seq)) : str;
};

/**
 * Removes trailing slashes from a string.
 *
 * @param str String to use.
 * @return String without trailing slash.
 */
const removeTrailingSlash = (str: string): string => removeTrailing(str, "/");

/**
 * Removes file extension from a string
 *
 * @param str String to use.
 * @return String without file extension.
 */
const removeExtension = (str: string): string => removeTrailing(str, /\..+$/);

/**
 * Checks if a file name is a directory.
 *
 * @param str String to check.
 * @return If the file is a directory.
 */
const isFile = (str: string): boolean => !str.endsWith("/");

export { isFile, removeTrailing, removeTrailingSlash, removeExtension };