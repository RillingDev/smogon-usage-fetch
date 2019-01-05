import { isNil } from "lightdash";

/**
 * Gets a group match as a number.
 *
 * @param str String to use.
 * @param regex Regex to match.
 * @param groupIndex Index to get.
 * @return The non-NaN group result number.
 * @throws when the group is not found or cannot be converted.
 */
const getGroupMatchAsNumber = (
    str: string,
    regex: RegExp,
    groupIndex: number
): number => {
    const errNotFound = new Error(
        `Could not find match for '${regex}' in '${str}'.`
    );

    if (!regex.test(str)) {
        throw errNotFound;
    }

    const match = str.match(regex);
    if (isNil(match) || isNil(match[groupIndex])) {
        throw errNotFound;
    }

    const num = Number(match[groupIndex]);
    if (Number.isNaN(num)) {
        throw errNotFound;
    }

    return num;
};

export { getGroupMatchAsNumber };
