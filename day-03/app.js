var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('test-cases/number-is-last-of-row.txt')
});

const data = []
let partNumberSum = 0

lineReader.on('line', function (line) {
    // put textfile into data structure
    data.push(line.split(''))
})


lineReader.on('close', function () {

    data.forEach((row, rowIndex) => {
        let numberStart, numberEnd, number = '', isPartNumber = false
        let previousIsDigit = false
        row.forEach((char, colIndex) => {

            if (isDigit(char)) {
                number += char
                if (!numberStart) { numberStart = colIndex }
                previousIsDigit = true

                if (!isDigit(row[colIndex + 1])) {
                    console.log('woohoo')
                }
            } else if (previousIsDigit) {
                previousIsDigit = false
                numberEnd = colIndex -1

            
                isPartNumber = (
                    checkPartOfRowForSymbol(data[rowIndex -1], numberStart - 1, numberEnd + 1) ||
                    checkPartOfRowForSymbol(data[rowIndex + 1], numberStart - 1, numberEnd + 1) ||
                    isSymbol(row[numberStart - 1]) || 
                    isSymbol(row[numberEnd + 1]) || 
                    false
                )

                // Sum the part numbers
                if (isPartNumber) {
            
                    partNumberSum += parseInt(number)   
                    console.log(1, rowIndex +1, parseInt(number))

                } else {
                    // console.log(rowIndex, number)
                }

                // reset start, end, number
                numberStart = ''
                numberStart = ''
                number = ''
                isPartNumber = false
            }
        }) 
    })

    console.log('Part number sum:', partNumberSum)
});


function isSymbol(char) {
    if (typeof char !== 'string') {return false}
    // (not a '.' and not a digit)
    return char.match(/[^\.\d]/g)
}

function isDigit(char) {
    if (typeof char !== 'string') {return false}

    // digit
    return char.match(/\d/g)
}

function findAndStoreAdjacentDigits(rowIndex, colIndex) {
    for (let r = rowIndex - 1; r < rowIndex + 2; r++) {
        if (data[r]) {
            const row = data[r]
            for (let c = colIndex -1; c < colIndex + 2; c++) {
                if (isDigit(row[c])) {
                    // store 

                    // rowIndex, // colIndex

                }
            }
        }
    }
}

function checkPartOfRowForSymbol (row, startIndex, endIndex) {
    if (!row) return false
    for (i = startIndex; i <= endIndex; i++) {
        if (isSymbol(row[i])) return true
    }
    return false
}
