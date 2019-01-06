import { removeTrailing } from "../../util/strUtil";
import { getGroupMatchAsNumber } from "../../util/regexUtil";
import {
    HeaderPrettyName,
    ISmogonTableData,
    parseSmogonTable,
    PERCENTAGE_UNIT,
    tableLayout
} from "./table";

const USAGE_TOTAL_REGEX = /Total battles: (\d+)/;

const USAGE_WEIGHT_REGEX = /Avg\. weight\/team: ([\d.]+)/;

const USAGE_TABLE_LAYOUT: tableLayout = [
    { name: HeaderPrettyName.RANK, converter: str => Number(str) },
    { name: HeaderPrettyName.POKEMON, converter: str => str },
    {
        name: HeaderPrettyName.USAGE_PERCENTAGE,
        converter: str => Number(removeTrailing(str, PERCENTAGE_UNIT))
    },
    { name: HeaderPrettyName.USAGE_RAW, converter: str => Number(str) },
    {
        name: HeaderPrettyName.USAGE_RAW_PERCENTAGE,
        converter: str => Number(removeTrailing(str, PERCENTAGE_UNIT))
    },
    { name: HeaderPrettyName.USAGE_REAL, converter: str => Number(str) },
    {
        name: HeaderPrettyName.USAGE_REAL_PERCENTAGE,
        converter: str => Number(removeTrailing(str, PERCENTAGE_UNIT))
    }
];

interface IUsagePageData {
    total: number;
    weight: number;
    data: ISmogonTableData;
}

/**
 * Parses a smogon usage page.
 *
 * @param page Page to parse.
 * @return parsed page.
 */
const parseUsagePage = (page: string): IUsagePageData => {
    const rows = page.split("\n");
    const totalRow = rows[0];
    const weightRow = rows[1];
    const tableRows = rows.slice(2);

    return {
        total: getGroupMatchAsNumber(totalRow, USAGE_TOTAL_REGEX, 1),
        weight: getGroupMatchAsNumber(weightRow, USAGE_WEIGHT_REGEX, 1),
        data: parseSmogonTable(tableRows.join("\n"), USAGE_TABLE_LAYOUT)
    };
};

export { parseUsagePage, IUsagePageData };
