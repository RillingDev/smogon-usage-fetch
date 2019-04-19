import { getMatchGroup } from "../../../util/regexUtil";
import { convertFrequency, convertIdentity, convertNumber } from "../convert";
import {
    SmogonHeaderName,
    ISmogonTableData,
    parseSmogonTable,
    smogonTableLayout
} from "../table";

interface ILeadsData {
    total: number;
    data: ISmogonTableData;
}

const LEADS_TOTAL_REGEX = /Total leads: (-?\d+)/;

const LEADS_TABLE_LAYOUT: smogonTableLayout = [
    { name: SmogonHeaderName.RANK, converter: convertNumber },
    { name: SmogonHeaderName.POKEMON, converter: convertIdentity },
    {
        name: SmogonHeaderName.USAGE_PERCENTAGE,
        converter: convertFrequency
    },
    { name: SmogonHeaderName.USAGE_RAW, converter: convertNumber },
    {
        name: SmogonHeaderName.USAGE_RAW_PERCENTAGE,
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
const parseLeadsPage = (page: string): ILeadsData => {
    const rows = page.split("\n");
    const totalRow = rows[0];
    const tableRows = rows.slice(1);

    return {
        total: convertNumber(getMatchGroup(totalRow, LEADS_TOTAL_REGEX, 1)),
        data: parseSmogonTable(tableRows.join("\n"), LEADS_TABLE_LAYOUT)
    };
};

export { parseLeadsPage, ILeadsData };
