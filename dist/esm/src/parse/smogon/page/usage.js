import { getMatchGroup } from "../../../util/regexUtil";
import { convertFrequency, convertIdentity, convertNumber } from "../convert";
import { parseSmogonTable } from "../table";
import { HEADER_NAME_POKEMON, HEADER_NAME_RANK, HEADER_NAME_USAGE_PERCENTAGE, HEADER_NAME_USAGE_RAW, HEADER_NAME_USAGE_RAW_PERCENTAGE, HEADER_NAME_USAGE_REAL, HEADER_NAME_USAGE_REAL_PERCENTAGE, } from "../usage";
const USAGE_TOTAL_ROW_INDEX = 0;
const USAGE_WEIGHT_ROW_INDEX = 1;
const USAGE_TABLE_ROW_OFFSET = 2;
const USAGE_TOTAL_REGEX = /Total battles: (-?\d+)/;
const USAGE_WEIGHT_REGEX = /Avg\. weight\/team: (-?[\d.]+)/;
const USAGE_TABLE_LAYOUT = [
    { name: HEADER_NAME_RANK, converter: convertNumber },
    { name: HEADER_NAME_POKEMON, converter: convertIdentity },
    {
        name: HEADER_NAME_USAGE_PERCENTAGE,
        converter: convertFrequency,
    },
    { name: HEADER_NAME_USAGE_RAW, converter: convertNumber },
    {
        name: HEADER_NAME_USAGE_RAW_PERCENTAGE,
        converter: convertFrequency,
    },
    { name: HEADER_NAME_USAGE_REAL, converter: convertNumber },
    {
        name: HEADER_NAME_USAGE_REAL_PERCENTAGE,
        converter: convertFrequency,
    },
];
/**
 * Parses a smogon usage page.
 *
 * @private
 * @param page Page to parse.
 * @return parsed page.
 */
const parseUsagePage = (page) => {
    const rows = page.split("\n");
    const totalRow = rows[USAGE_TOTAL_ROW_INDEX];
    const weightRow = rows[USAGE_WEIGHT_ROW_INDEX];
    const tableRows = rows.slice(USAGE_TABLE_ROW_OFFSET);
    return {
        total: convertNumber(getMatchGroup(totalRow, USAGE_TOTAL_REGEX, 1)),
        weight: convertNumber(getMatchGroup(weightRow, USAGE_WEIGHT_REGEX, 1)),
        data: parseSmogonTable(tableRows.join("\n"), USAGE_TABLE_LAYOUT),
    };
};
export { parseUsagePage };
//# sourceMappingURL=usage.js.map