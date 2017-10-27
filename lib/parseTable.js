const REGEX_META = /.+: (.+)/;

const getMeta = line => Number(line.match(REGEX_META)[1]);

const getRowItems = (row) => row.split("|")
    .map(item => item.trim())
    .filter(item => item.length > 0);

const mapRows = (row) => {
    const rowFields = getRowItems(row);

    return {
        rank: Number(rowFields[0]),
        pokemon: rowFields[1],
        usage: rowFields[2],
        raw: {
            val: Number(rowFields[3]),
            usage: rowFields[4],
        },
        real: {
            val: Number(rowFields[5]),
            usage: rowFields[6],
        }
    };
};

module.exports = text => {
    const lines = text.trim().split("\n");

    return {
        total: getMeta(lines[0]),
        averageWeightPerTeam: getMeta(lines[1]),
        data: lines.slice(5, lines.length - 1).map(mapRows)
    };
};
