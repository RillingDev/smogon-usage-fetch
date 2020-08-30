/**
 * @public
 */
export interface Metagame {
    readonly style: Map<string, number>;
    readonly stalliness: {
        readonly mean: number;
        readonly one: number;
    };
}
