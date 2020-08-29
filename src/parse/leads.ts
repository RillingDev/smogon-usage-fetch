import { getMatchGroup } from "../util/regexUtil";
import { convertFrequency, convertNumber } from "./convert";
import { parseMarkdownTable } from "./table";

/**
 * @public
 */
interface Lead {
    readonly rank: number;
    readonly name: string;
    readonly usagePercentage: number;
    readonly raw: number;
    readonly rawPercentage: number;
}

/**
 * @public
 */
interface Leads {
    readonly total: number;
    readonly data: Lead[];
}

/**
 * Extracts lead data from markdown table.
 *
 * @private
 * @param table Markdown table.
 * @return Lead data items.
 */
const parseLeadTable = (table: string): Lead[] =>
    parseMarkdownTable(table, 5).rows.map((row) => {
        return {
            rank: convertNumber(row[0]),
            name: row[1],
            usagePercentage: convertFrequency(row[2]),
            raw: convertNumber(row[3]),
            rawPercentage: convertFrequency(row[4]),
        };
    });

/**
 * @private
 */
const LEADS_TOTAL_REGEX = /Total leads: (-?\d+)/;

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
    const table = rows.slice(1).join("\n");

    return {
        total: convertNumber(getMatchGroup(totalRow, LEADS_TOTAL_REGEX, 1)),
        data: parseLeadTable(table),
    };
};

export { leadsFromString, Leads };
