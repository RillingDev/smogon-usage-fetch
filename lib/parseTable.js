const getMeta = line => Number(line.match(/.+: (.+)/)[1]);

const parsePercentage = str => Number(str.replace("%", ""));

const mapRows = (row) => {
    const rowFields = row.split("|")
        .map(item => item.trim())
        .filter(item => item.length > 0);

    return {
        rank: Number(rowFields[0]),
        pokemon: rowFields[1],
        usage: parsePercentage(rowFields[2]),
        raw: {
            total: Number(rowFields[3]),
            usage: parsePercentage(rowFields[4]),
        },
        real: {
            total: Number(rowFields[5]),
            usage: parsePercentage(rowFields[6]),
        }
    };
};

module.exports = text => {
    const lines = text.trim().split("\n");

    return {
        total: getMeta(lines[0]),
        averageWeightPerTeam: getMeta(lines[1]),
        stats: lines.slice(5, lines.length - 1).map(mapRows)
    };
};
