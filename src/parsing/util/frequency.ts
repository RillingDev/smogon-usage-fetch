import { removeEnd } from "lightdash";

/**
 * Converts a string in the format "123%" to a number.
 *
 * @private
 * @param str String to use.
 * @return Frequency number.
 */
export const convertFrequency = (str: string): number =>
    Number(removeEnd(str, "%"));
