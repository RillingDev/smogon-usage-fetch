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
    if (!regex.test(str)) {
        throw new Error(
            `Could not find any match for '${regex.source}' in '${str}'.`
        );
    }

    const match = regex.exec(str);
    if (match == null || match[groupIndex] == null) {
        throw new Error(
            `Could not find the match group with index ${groupIndex} for '${regex.source}' in '${str}'.`
        );
    }

    return match[groupIndex];
};

export { getMatchGroup };
