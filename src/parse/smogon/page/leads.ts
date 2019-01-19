import {
    HeaderPrettyName,
    ISmogonTableData,
    parseSmogonTable,
    tableLayout
} from "../table";
import { convertFrequency, convertIdentity, convertNumber } from "../convert";
import { getMatchGroup } from "../../../util/regexUtil";

interface ILeadsData {
    total: number;
    data: ISmogonTableData;
}

const LEADS_TOTAL_REGEX = /Total leads: (-?\d+)/;

const LEADS_TABLE_LAYOUT: tableLayout = [
    { name: HeaderPrettyName.RANK, converter: convertNumber },
    { name: HeaderPrettyName.POKEMON, converter: convertIdentity },
    {
        name: HeaderPrettyName.USAGE_PERCENTAGE,
        converter: convertFrequency
    },
    { name: HeaderPrettyName.USAGE_RAW, converter: convertNumber },
    {
        name: HeaderPrettyName.USAGE_RAW_PERCENTAGE,
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
