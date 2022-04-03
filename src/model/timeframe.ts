/**
 * Represents a single timeframe by the year and month that was covered.
 * Based on timeframe list found on e.g. {@link https://www.smogon.com/stats/}.
 *
 * @public
 */
export interface Timeframe {
	/**
	 * Year of this timeframe.
	 */
	readonly year: string;

	/**
	 * Month of this timeframe.
	 */
	readonly month: string;

	/**
	 * The optional modifier for the timeframe, e.g. 'DLC1'.
	 */
	readonly modifier?: string;
}
