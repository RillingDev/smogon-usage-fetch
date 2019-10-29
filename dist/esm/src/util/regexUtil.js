import { isNil } from "lodash";
const createNotFoundErr = (regex, str) => new Error(`Could not find match for '${regex}' in '${str}'.`);
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
const getMatchGroup = (str, regex, groupIndex) => {
    if (!regex.test(str)) {
        throw createNotFoundErr(regex, str);
    }
    const match = regex.exec(str);
    if (isNil(match) || isNil(match[groupIndex])) {
        throw createNotFoundErr(regex, str);
    }
    return match[groupIndex];
};
export { getMatchGroup };
//# sourceMappingURL=regexUtil.js.map