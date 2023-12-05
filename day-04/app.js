var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(process.argv[2])
});

let gameOneResult = 0;
let gameTwoResult = 0;
const data = []
const cardCounts = [];
lineReader.on('line', processLine)


lineReader.on('close', function () {
    // log out each row
    data.forEach(gameOneCardHandler)
    data.forEach(gameTwoCardHandler)
    console.log("Game one", gameOneResult)
    console.log("Game two", gameTwoResult)
});

function processLine(line) {
    // put textfile into data structure
    const [cardNo, values] = line.split(':')
    let [winning, selected] = values.split('|').map(separateIntoNumbers)
    data.push({winning, selected})
}

function gameOneCardHandler (row) {
    const matchCount = getMatchCount(row)
    const pointValue = tallyPointsPerCard(matchCount)
    gameOneResult += pointValue
}

function tallyPointsPerCard(matchCount) {
    let pointValue
    if (!matchCount) {
        pointValue = 0
    } else {
        pointValue =  2**(matchCount - 1)
    }

    return pointValue
}

function getMatchCount(row) {
    const {winning, selected} = row
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

function gameTwoCardHandler(row, index, array) {
    const count = getMatchCount(row)

    
        if (isNaN(cardCounts[index])) {
            cardCounts[index] = 1;
        } else cardCounts[index]++

        let currentCardCount = cardCounts[index]

        for (n = 0; n < currentCardCount; n++) {
            // increment one card one time (not including for the card)
            for (let i = 1; i <= count; i++) {        
                if (isNaN(cardCounts[index + i])) {
                    cardCounts[index + i] = 1;
                } 
                else {cardCounts[index + i]++}
            }
        }

        currentCardCount = cardCounts[index]
        gameTwoResult += currentCardCount


}