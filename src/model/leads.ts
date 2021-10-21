/**
 * Represents a single lead entry.
 *
 * @public
 */
export interface Lead {
	readonly rank: number;

	readonly pokemon: string;

	readonly usagePercentage: number;

	readonly raw: number;
	readonly rawPercentage: number;
}

/**
 * Represents a list of leads.
 * Based on lead list found on e.g. {@link https://www.smogon.com/stats/2015-01/leads/gen1ou-0.txt}.
 *
 * @public
 */
export interface Leads {
	readonly total: number;
	readonly data: Lead[];
}
