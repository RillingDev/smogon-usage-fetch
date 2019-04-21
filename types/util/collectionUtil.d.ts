/**
 * Collects elements in an array into a an array of merged elements.
 *
 * @private
 * @param arr Array to collect.
 * @param keyFn Function returning the key for the value.
 * @param creationFn Function creating a new element.
 * @param mutatorConsumer Consumer mutating the existing object with the new data.
 * @returns Merged and collected elements.
 */
declare const arrMergingCollect: <T, U>(arr: T[], keyFn: (val: T) => string, creationFn: (val: T) => U, mutatorConsumer: (val: T, obj: U) => void) => U[];
export { arrMergingCollect };
