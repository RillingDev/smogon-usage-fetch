import { getMatchGroup } from "../util/regexUtil";
import { convertFrequency, convertIdentity, convertNumber } from "./convert";
import { parseSmogonTable, SmogonTable, SmogonTableLayout } from "./table";
import {
    HEADER_NAME_POKEMON,
    HEADER_NAME_RANK,
    HEADER_NAME_USAGE_PERCENTAGE,
    HEADER_NAME_USAGE_RAW,
    HEADER_NAME_USAGE_RAW_PERCENTAGE,
} from "./usageTable";

/**
 * @public
 */
interface Leads {
    total: number;
    data: SmogonTable;
}

/**
 * @private
 */
const LEADS_TOTAL_REGEX = /Total leads: (-?\d+)/;

/**
 * @private
 */
const LEADS_TABLE_LAYOUT: SmogonTableLayout = [
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
];

/**
 * Parses a smogon leads page.
 *
 * @private
 * @param page Page to parse.
 * @return parsed page.
 */
const leadsFromString = (page: string): Leads => {
    const rows = page.split("\n");
    const totalRow = rows[0];
    const tableRows = rows.slice(1);

    return {
        total: convertNumber(getMatchGroup(totalRow, LEADS_TOTAL_REGEX, 1)),
        data: parseSmogonTable(tableRows.join("\n"), LEADS_TABLE_LAYOUT),
    };
};

export { leadsFromString, Leads };
