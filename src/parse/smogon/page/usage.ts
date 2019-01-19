import {
    HeaderPrettyName,
    ISmogonTableData,
    parseSmogonTable,
    tableLayout
} from "../table";
import { convertFrequency, convertIdentity, convertNumber } from "../convert";
import { getMatchGroup } from "../../../util/regexUtil";

interface IUsageData {
    total: number;
    weight: number;
    data: ISmogonTableData;
}

const USAGE_TOTAL_REGEX = /Total battles: (-?\d+)/;

const USAGE_WEIGHT_REGEX = /Avg\. weight\/team: (-?[\d.]+)/;

const USAGE_TABLE_LAYOUT: tableLayout = [
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
    },
    { name: HeaderPrettyName.USAGE_REAL, converter: convertNumber },
    {
        name: HeaderPrettyName.USAGE_REAL_PERCENTAGE,
        converter: convertFrequency
    }
];

/**
 * Parses a smogon usage page.
 *
 * @private
 * @param page Page to parse.
 * @return parsed page.
 */
const parseUsagePage = (page: string): IUsageData => {
    const rows = page.split("\n");
    const totalRow = rows[0];
    const weightRow = rows[1];
    const tableRows = rows.slice(2);

    return {
        total: convertNumber(getMatchGroup(totalRow, USAGE_TOTAL_REGEX, 1)),
        weight: convertNumber(getMatchGroup(weightRow, USAGE_WEIGHT_REGEX, 1)),
        data: parseSmogonTable(tableRows.join("\n"), USAGE_TABLE_LAYOUT)
    };
};

export { parseUsagePage, IUsageData };
