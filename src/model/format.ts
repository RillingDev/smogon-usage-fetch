/**
 * Represents a single format with optional rank and monotype flags.
 * Based on format list found on e.g. {@link https://www.smogon.com/stats/2015-01/}.
 *
 * @public
 */
export interface Format {
	/**
	 * Format name, e.g. 'gen8ou'.
	 */
	readonly name: string;

	/**
	 * Rank cutoff as supported by smogon stats, e.g. '1500'.
	 * Defaults to '0'.
	 */
	readonly rank?: string;

	/**
	 * Monotype value for accessing the data in the 'monotype' endpoint
	 * (e.g. {@link https://www.smogon.com/stats/2015-01/monotype/}).
	 * Defaults to none.
	 *
	 * @see SmogonApiClient#fetchFormats
	 */
	readonly monotype?: string;
}
