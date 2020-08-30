/**
 * @public
 */
export interface Usage {
    readonly rank: number;
    readonly name: string;

    readonly usagePercentage: number;

    readonly raw: number;
    readonly rawPercentage: number;

    readonly real: number;
    readonly realPercentage: number;
}

/**
 * @public
 */
export interface Usages {
    readonly total: number;
    readonly weight: number;

    readonly data: Usage[];
}
