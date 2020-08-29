import { getMatchGroup } from "../util/regexUtil";
import { removeEnd } from "lightdash";

/**
 * Converts a string in the format "123" to a number.
 *
 * @private
 * @param str String to use.
 * @return Number.
 */
const convertNumber = (str: string): number => Number(str);

/**
 * @private
 */
type FrequencyPair = [string, number];

/**
 * @private
 */
const PERCENTAGE_UNIT = "%";

/**
 * Converts a string in the format "123%" to a number.
 *
 * @private
 * @param str String to use.
 * @return Frequency number.
 */
const convertFrequency = (str: string): number =>
    Number(removeEnd(str, PERCENTAGE_UNIT));

/**
 * Converts a line in the format "foo 12%" to a pair of name and frequency.
 *
 * @private
 * @param str String to use.
 * @param paddingRegex Optional regex to use for padding checking.
 * @return Frequency pair.
 */
const convertFrequencyPair = (
    str: string,
    paddingRegex = /(\s+)\d/
): FrequencyPair => {
    const padding = getMatchGroup(str, paddingRegex, 0);
    const splitStr = str.split(padding);

    const name = splitStr[0].trim();
    const frequency = convertFrequency(splitStr[1]);
    return [name, frequency];
};

export { FrequencyPair, convertFrequencyPair, convertFrequency, convertNumber };
