import { getMatchGroup } from "../../util/regexUtil";
import { removeEnd } from "lightdash";

/**
 * @private
 */
type FrequencyPair = [string, number];
/**
 * @private
 */
const PERCENTAGE_UNIT = "%";

/**
 * Converts a string by its identity, not modifying it at all.
 *
 * @private
 * @param str String to use.
 * @return Same string as provided as parameter.
 */
const convertIdentity = (str: string): string => str;

/**
 * Converts a string in the format "123" to a number.
 *
 * @private
 * @param str String to use.
 * @return Number.
 */
const convertNumber = (str: string): number => Number(str);

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

    return [splitStr[0].trim(), convertFrequency(splitStr[1])];
};

export {
    FrequencyPair,
    convertFrequencyPair,
    convertFrequency,
    convertIdentity,
    convertNumber,
};
