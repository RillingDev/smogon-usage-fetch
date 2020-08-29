/**
 * @public
 */
export interface Lead {
    readonly rank: number;
    readonly name: string;
    readonly usagePercentage: number;
    readonly raw: number;
    readonly rawPercentage: number;
}

/**
 * @public
 */
export interface Leads {
    readonly total: number;
    readonly data: Lead[];
}
