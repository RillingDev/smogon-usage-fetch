import { parseTable } from "../table";
import { removeTrailing } from "../../util/strUtil";
import { getGroupMatchAsNumber } from "../../util/regexUtil";

type usageRowData = [number, string, number, number, number, number, number];

interface IUsageTableData {
    header: string[];
    rows: usageRowData[];
}

interface IUsagePageData {
    total: number;
    weight: number;
    data: IUsageTableData;
}

const enum RowIndex {
    RANK = 0,
    POKEMON = 1,
    USAGE_PERCENTAGE = 2,
    USAGE_RAW = 3,
    USAGE_RAW_PERCENTAGE = 4,
    USAGE_REAL = 5,
    USAGE_REAL_PERCENTAGE = 6
}

const PERCENTAGE_UNIT = "%";

const HEADER_NAMES = [
    "Rank",
    "Pokemon",
    "Usage Percentage",
    "Usage Raw",
    "Usage Raw Percentage",
    "Usage Real",
    "Usage Real Percentage"
];

const TOTAL_REGEX = /Total battles: (\d+)/;
const WEIGHT_REGEX = /Avg\. weight\/team: ([\d.]+)/;

/**
 * Converts a row of usage data into a nicer format.
 *
 * @private
 * @param row Row to convert.
 * @return Row with values converted.
 */
const convertRow = (row: string[]): usageRowData => [
    Number(row[RowIndex.RANK]),
    row[RowIndex.POKEMON],
    Number(removeTrailing(row[RowIndex.USAGE_PERCENTAGE], PERCENTAGE_UNIT)),
    Number(row[RowIndex.USAGE_RAW]),
    Number(removeTrailing(row[RowIndex.USAGE_RAW_PERCENTAGE], PERCENTAGE_UNIT)),
    Number(row[RowIndex.USAGE_REAL]),
    Number(removeTrailing(row[RowIndex.USAGE_REAL_PERCENTAGE], PERCENTAGE_UNIT))
];

/**
 * Parses a smogon usage markdown table.
 *
 * @param table Table to parse.
 * @return Parsed table.
 */
const parseUsageTable = (table: string): IUsageTableData => {
    const tableData = parseTable(table);

    const columnLength = tableData.header.length;
    if (columnLength !== HEADER_NAMES.length) {
        throw new Error(
            `Table does not have the right amount of columns (${columnLength} instead of ${
                HEADER_NAMES.length
                })!`
        );
    }

    return {
        header: Array.from(HEADER_NAMES),
        rows: tableData.rows.map(convertRow)
    };
};

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
        total: getGroupMatchAsNumber(totalRow, TOTAL_REGEX, 1),
        weight: getGroupMatchAsNumber(weightRow, WEIGHT_REGEX, 1),
        data: parseUsageTable(tableRows.join("\n"))
    };
};

export {
    parseUsageTable,
    parseUsagePage,
    RowIndex,
    IUsagePageData,
    IUsageTableData
};
