/**
 * Represents a single usage entry.
 *
 * @public
 */
export interface Usage {
	readonly rank: number;
	readonly pokemon: string;

	readonly usagePercentage: number;

	readonly raw: number;
	readonly rawPercentage: number;

	readonly real: number;
	readonly realPercentage: number;
}

/**
 * Represents a list of usages.
 * Based on usage list found on e.g. {@link https://www.smogon.com/stats/2015-01/gen1ou-0.txt}.
 *
 * @public
 */
export interface Usages {
	readonly total: number;
	readonly weight: number;

	readonly data: Usage[];
}
