import { isRegExp } from "lodash";

/**
 * Removes trailing sequences from a string.
 *
 * @private
 * @param str String to use.
 * @param seq Sequence to remove.
 * @return String without trailing sequence.
 */
const removeTrailing = (str: string, seq: string | RegExp): string => {
    if (isRegExp(seq)) {
        return str.replace(seq, "");
    }

    if (!str.includes(seq)) {
        return str;
    }

    return str.substr(0, str.lastIndexOf(seq));
};

export { removeTrailing };
