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
const arrMergingCollect = <T, U>(
    arr: T[],
    keyFn: (val: T) => string,
    creationFn: (val: T) => U,
    mutatorConsumer: (val: T, obj: U) => void
): U[] => {
    const collected = new Map<string, U>();

    arr.forEach(val => {
        const key = keyFn(val);
        if (!collected.has(key)) {
            collected.set(key, creationFn(val));
        }

        mutatorConsumer(val, collected.get(key)!);
    });

    return Array.from(collected.values());
};

export { arrMergingCollect };
