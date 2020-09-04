/**
 * Represents a single timeframe by a year and the month that was covered.
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
     * Optional modifier for the timeframe, e.g. 'DLC1'.
     */
    readonly modifier?: string;
}
