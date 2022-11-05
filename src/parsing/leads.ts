import { getMatchGroup } from "./util/regex.js";
import { convertFrequency } from "./util/frequency.js";
import { parseMarkdownTable } from "./table.js";
import type { Lead, Leads } from "../model/leads.js";

/**
 * Extracts lead data from Markdown table.
 *
 * @internal
 * @param table Markdown table.
 * @return Lead data items.
 */
const parseLeadTable = (table: string): Lead[] =>
	parseMarkdownTable(table, 5).rows.map((row) => {
		return {
			rank: Number(row[0]),
			pokemon: row[1],
			usagePercentage: convertFrequency(row[2]),
			raw: Number(row[3]),
			rawPercentage: convertFrequency(row[4]),
		};
	});

/**
 * @internal
 */
const LEADS_TOTAL_REGEX = /Total leads: (-?\d+)/;

/**
 * Parses a smogon leads page.
 *
 * @internal
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
