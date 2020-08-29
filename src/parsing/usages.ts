import { getMatchGroup } from "../util/regexUtil";
import { convertFrequency, convertNumber } from "./convert";
import { parseMarkdownTable } from "./table";

/**
 * @public
 */
interface Usage {
    readonly rank: number;
    readonly name: string;
    readonly usagePercentage: number;
    readonly raw: number;
    readonly rawPercentage: number;
    readonly real: number;
    readonly realPercentage: number;
}

/**
 * @public
 */
interface Usages {
    readonly total: number;
    readonly weight: number;
    readonly data: Usage[];
}

/**
 * Extracts usage data from markdown table.
 *
 * @private
 * @param table Markdown table.
 * @return Usage data items.
 */
const parseUsageTable = (table: string): Usage[] =>
    parseMarkdownTable(table, 7).rows.map((row) => {
        return {
            rank: convertNumber(row[0]),
            name: row[1],
            usagePercentage: convertFrequency(row[2]),
            raw: convertNumber(row[3]),
            rawPercentage: convertFrequency(row[4]),
            real: convertNumber(row[5]),
            realPercentage: convertFrequency(row[6]),
        };
    });

/**
 * @private
 */
const USAGE_TOTAL_REGEX = /Total battles: (-?\d+)/;

/**
 * @private
 */
const USAGE_WEIGHT_REGEX = /Avg\. weight\/team: (-?[\d.]+)/;

/**
 * Parses a smogon usage page.
 *
 * @private
 * @param page Page to parse.
 * @return parsed page.
 */
const usageFromString = (page: string): Usages => {
    const rows = page.split("\n");
    const totalRow = rows[0];
    const weightRow = rows[1];
    const table = rows.slice(2).join("\n");

    return {
        total: convertNumber(getMatchGroup(totalRow, USAGE_TOTAL_REGEX, 1)),
        weight: convertNumber(getMatchGroup(weightRow, USAGE_WEIGHT_REGEX, 1)),
        data: parseUsageTable(table),
    };
};

export { usageFromString, Usages };
