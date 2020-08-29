import { isBlank } from "lightdash";
import { getMatchGroup } from "../util/regexUtil";
import {
    convertFrequency,
    convertFrequencyPair,
    convertNumber,
    FrequencyPair,
} from "./convert";

/**
 * @public
 */
interface Metagame {
    style: FrequencyPair[];
    stalliness: {
        mean: number;
        one: number;
    };
}

/**
 * @private
 */
const STALLINESS_MEAN_REGEX = / Stalliness \(mean: (-?[\d.]+)/;
/**
 * @private
 */
const STALLINESS_ONE_REGEX = / one # = {2}(-?[\d.]+%)/;

/**
 * Parses a smogon metagame page.
 *
 * @private
 * @param page Page to parse.
 * @return parsed page.
 */
const metagameFromString = (page: string): Metagame => {
    const rows = page.split("\n");
    const separatorIndex = rows.findIndex(isBlank);

    if (separatorIndex === -1) {
        throw new Error("Could not parse Metagame page.");
    }

    const styleRows = rows.slice(0, separatorIndex);
    const stallinessMeanRow = rows[separatorIndex + 1];
    const stallinessOneRow = rows[rows.length - 2];

    return {
        style: styleRows.map((row) => convertFrequencyPair(row, /(\.+\s*)\d/)),
        stalliness: {
            mean: convertNumber(
                getMatchGroup(stallinessMeanRow, STALLINESS_MEAN_REGEX, 1)
            ),
            one: convertFrequency(
                getMatchGroup(stallinessOneRow, STALLINESS_ONE_REGEX, 1)
            ),
        },
    };
};

export { metagameFromString, Metagame };
