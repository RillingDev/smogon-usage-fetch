/**
 * Represents metagame data.
 * Based on metagame data found on e.g. {@link https://www.smogon.com/stats/2015-01/metagame/gen1ou-0.txt}.
 *
 * @public
 */
export interface Metagame {
	/**
	 * Team styles mapped to frequency (in percentage).
	 */
	readonly style: Map<string, number>;

	readonly stalliness: {
		readonly mean: number;
		readonly one: number;
	};
}
