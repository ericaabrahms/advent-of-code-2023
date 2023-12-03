var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
});

const data = []
let partNumberIndices = []
let symbolIndices = []

lineReader.on('line', function (line) {
    // put textfile into data structure
    data.push(line.split(''))
})


lineReader.on('close', function () {

    data.forEach((row, rowIndex) => {
        row.forEach((char, colIndex) => {
            if (isSymbol(char)) {
                console.log(3, char)
                findAndStoreAdjacentDigits(rowIndex, colIndex)
            }
        }) 
    })
});


function isSymbol(char) {
    // (not a '.' and not a digit)
    return char.match(/[^\.\d]/g)
}

function isNumber(char) {
    // digit
    return char.match(/\d/g)
}

function findAndStoreAdjacentDigits(rowIndex, colIndex) {
    for (let r = rowIndex - 1; r < rowIndex + 2; r++) {
        if (data[r]) {
            const row = data[r]
            for (let c = colIndex -1; c < colIndex + 2; c++) {
                if (isNumber(row[c])) {
                    // store 

                    // rowIndex, // colIndex

                }
            }
        }
    }
}

function findFirstDigitOfNumber() {}
function findLastDigitOfNumber() {}

