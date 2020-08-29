/**
 * @public
 */
export interface Metagame {
    readonly style: [string, number][];
    readonly stalliness: {
        readonly mean: number;
        readonly one: number;
    };
}
