import { isNil } from "lightdash";

type formatPair = [string, IFormatData];

interface IFormatData {
    ranks: string[];
    monotype: string[];
}

const createFormatData = (): IFormatData => {
    return { ranks: [], monotype: [] };
};

const determineFormatLineData = (formatLine: string) => {
    const split = formatLine.split("-");

    if (split.length < 2 || split.length > 3) {
        throw new Error(`Not a valid format: '${formatLine}'.`);
    }
    const name = split[0];
    let monotype;
    let rank;
    if (split.length === 3) {
        monotype = split[1];
        rank = split[2];
    } else {
        monotype = null;
        rank = split[1];
    }

    return { name, rank, monotype };
};

const mapFormats = (formatLines: string[]): formatPair[] => {
    const formats = new Map<string, IFormatData>();

    for (const formatLine of formatLines) {
        const { name, rank, monotype } = determineFormatLineData(formatLine);
        const current = formats.has(name)
            ? formats.get(name)!
            : createFormatData();

        current.ranks.push(rank);
        if (!isNil(monotype)) {
            current.monotype.push(monotype);
        }

        formats.set(name, current);
    }

    return Array.from(formats.entries());
};

export { mapFormats, formatPair, IFormatData };
