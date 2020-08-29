import { getMatchGroup } from "./util/regex";
import { convertFrequency } from "./util/frequency";
import { parseMarkdownTable } from "./table";
import { Lead, Leads } from "../model/leads";

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
            rank: Number(row[0]),
            name: row[1],
            usagePercentage: convertFrequency(row[2]),
            raw: Number(row[3]),
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
export const leadsFromString = (page: string): Leads => {
    const rows = page.split("\n");
    const totalRow = rows[0];
    const table = rows.slice(1).join("\n");

    return {
        total: Number(getMatchGroup(totalRow, LEADS_TOTAL_REGEX, 1)),
        data: parseLeadTable(table),
    };
};
