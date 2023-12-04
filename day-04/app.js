var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(process.argv[2])
});

let result = 0;
const data = []
lineReader.on('line', processLine)


lineReader.on('close', function () {
    // log out each row
    data.forEach(gameOne)
    console.log("Result", result)
});

function processLine(line) {
    // put textfile into data structure
    const [cardNo, values] = line.split(':')
    let [winning, selected] = values.split('|').map(separateIntoNumbers)
    data.push({winning, selected})
}

function gameOne (row) {
    let matchCount = countMatchesInWinningAndSelected(row.winning, row.selected)
    let pointValue
    if (!matchCount) {
        pointValue = 0
    } else {
        pointValue =  2**(matchCount - 1)
    }
    result += pointValue
}

function countMatchesInWinningAndSelected(winning, selected) {
    let count = 0
    winning.forEach((num) => {
        if (num && selected.includes(num)) {
            count++
        }
    })
    return count
}   

function separateIntoNumbers(numStr) {
    return (
        numStr.split(' ') // split by spaces
        // .filter(i => i !== '') // remove blanks
        // .map(i => {             // turn the number strings into integers
        //     return parseInt(i)
        // })
        // .sort((a, b) => a - b)) // sort them 
    )
}