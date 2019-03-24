import { isNil } from "lightdash";

/**
 * Matches a regex and gets the group match by its group index.
 *
 * @private
 * @param str String to use.
 * @param regex Regex to match.
 * @param groupIndex Index to get.
 * @return The group result.
 * @throws when the regex does not match or the group is not found.
 */
const getMatchGroup = (
    str: string,
    regex: RegExp,
    groupIndex: number
): string => {
    const notFoundErr = new Error(
        `Could not find match for '${regex}' in '${str}'.`
    );

    if (!regex.test(str)) {
        throw notFoundErr;
    }

    const match = str.match(regex);
    if (isNil(match) || isNil(match[groupIndex])) {
        throw notFoundErr;
    }

    return match[groupIndex];
};

export { getMatchGroup };
