var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

let total = 0
let games = []
lineReader.on('line', function (line) {
    let g = parseLine(line)
    games[g.number] = g.results
})


lineReader.on('close', function () {
    total = games.reduce(sumGameNumbers, 0)
    console.log('Total', total)
});

function parseLine(line) {
    let [name, results] = line.split(':')
    return {
        number: getGameNumber(name),
        results: getAllGameResults(results).reduce(getMaximumResultByColor, {})
    }   

}
function getGameNumber(name) {
    return parseInt(name.slice(5))
}

function getAllGameResults(results) {
    return results.replace(/;/g, ',')
        .split(',')
        .map(i => {
            [num, color] = i.trim().split(' ')
            return [color, parseInt(num)]
        })
}

function getMaximumResultByColor(acc, curr) {
    const [color, number] = curr
    
    if (!acc[color] || acc[color] < number) {
        acc[color] = number
    }

    return acc
}

function canProduceTestDraw (g) {
    const testCase = {
        red: 12,
        green: 13, 
        blue: 14
    }

    if (!g || g.red > testCase.red || g.green > testCase.green || g.blue > testCase.blue ) {return false}
    return true

}

function sumGameNumbers(acc, curr, index) {
    if (canProduceTestDraw(curr)) {
        acc += index
    }
    return acc
}
