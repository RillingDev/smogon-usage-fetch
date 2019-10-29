import { getMatchGroup } from "../../../util/regexUtil";
import { convertFrequency, convertIdentity, convertNumber } from "../convert";
import { parseSmogonTable } from "../table";
import { HEADER_NAME_POKEMON, HEADER_NAME_RANK, HEADER_NAME_USAGE_PERCENTAGE, HEADER_NAME_USAGE_RAW, HEADER_NAME_USAGE_RAW_PERCENTAGE } from "../usage";
const LEADS_TOTAL_ROW_INDEX = 0;
const LEADS_TABLE_ROW_OFFSET = 1;
const LEADS_TOTAL_REGEX = /Total leads: (-?\d+)/;
const LEADS_TABLE_LAYOUT = [
    { name: HEADER_NAME_RANK, converter: convertNumber },
    { name: HEADER_NAME_POKEMON, converter: convertIdentity },
    {
        name: HEADER_NAME_USAGE_PERCENTAGE,
        converter: convertFrequency
    },
    { name: HEADER_NAME_USAGE_RAW, converter: convertNumber },
    {
        name: HEADER_NAME_USAGE_RAW_PERCENTAGE,
        converter: convertFrequency
    }
];
/**
 * Parses a smogon leads page.
 *
 * @private
 * @param page Page to parse.
 * @return parsed page.
 */
const parseLeadsPage = (page) => {
    const rows = page.split("\n");
    const totalRow = rows[LEADS_TOTAL_ROW_INDEX];
    const tableRows = rows.slice(LEADS_TABLE_ROW_OFFSET);
    return {
        total: convertNumber(getMatchGroup(totalRow, LEADS_TOTAL_REGEX, 1)),
        data: parseSmogonTable(tableRows.join("\n"), LEADS_TABLE_LAYOUT)
    };
};
export { parseLeadsPage };
//# sourceMappingURL=leads.js.map