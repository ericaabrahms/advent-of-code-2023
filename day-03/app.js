var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(process.argv[2])
});

const data = []
let partNumberSum = 0
let gearSum = 0

lineReader.on('line', function (line) {
    // put textfile into data structure
    data.push(line.split(''))
})


lineReader.on('close', function () {

    data.forEach((row, rowIndex) => {
        let numberStart, numberEnd, number = '', isPartNumber = false
        row.forEach((char, colIndex) => {

            if (isDigit(char)) {
                number += char
                if (!numberStart) { numberStart = colIndex }

                if (!isDigit(row[colIndex + 1])) {
                    numberEnd = colIndex

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

                        
                    } else {
                        // console.log(rowIndex, number)
                    }
                    
                    // reset start, end, number
                    numberStart = ''
                    numberStart = ''
                    number = ''
                    isPartNumber = false

                }
            }

            if (isStar(char)) {
                let prev = checkRowForAdjacentNumbers(data[rowIndex -1] || [], colIndex)
                let curr = checkRowForAdjacentNumbers(row, colIndex, true)
                let next = checkRowForAdjacentNumbers(data[rowIndex +1], colIndex)
                let nums = [...prev, ...curr, ...next]
                console.log(1, prev)
                console.log(2, curr)
                console.log(3, next)
                if (nums.length === 2) {
                    gearSum += nums[0] * nums[1]
                }
            }
        }) 
    })

    console.log('Part number sum:', partNumberSum)
    console.log('Gear sum:', gearSum)
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

function isStar(char) {
    if (typeof char !== 'string') {return false}

    // digit
    return char.match(/\*/g)
}

function checkRowForAdjacentNumbers(row, i, skipMiddle) {
    let adjacentNumbers = []
    if (!row) return adjacentNumbers
    if (hasTwoSeparateNumbers(row, i)) {
        adjacentNumbers.push(getNumberForward(row, i + 1))
        adjacentNumbers.push(getNumberBack(row, i - 1 ))
    } else if (skipMiddle) {
        if (isDigit(row[i -1])) {
            adjacentNumbers.push(getNumberBack(row, i - 1))
        } else if (isDigit(row[i+1])) {
            adjacentNumbers.push(getNumberForward(row, i + 1))
        }
    } else if (isDigit(row[i -1])) {
        if (getNumberBothWays(row, i - 1)) {
            adjacentNumbers.push(getNumberBothWays(row, i - 1))
        }
    } else if (isDigit(row[i])) {
        adjacentNumbers.push(getNumberForward(row, i))
    } else if (isDigit(row[i + 1])) {
        console.log('last digit', getNumberForward(row, i + 1))
        adjacentNumbers.push(getNumberForward(row, i + 1))
    } 
    
    return adjacentNumbers
}

function getNumberForward (row, i) {
    let foundNonDigit = false 
    let index = i
    let number = ''
    while (!foundNonDigit) {
        if (isDigit(row[index])) {
            number += row[index]
            index++
        } else {
            foundNonDigit = true
        }
    }

    return number
}

function getNumberBack(row, i) {
    let foundNonDigit = false 
    let index = i
    let number = ''
    while (!foundNonDigit) {
        if (isDigit(row[index])) {
            number = row[index] + number
            index--
        } else {
            foundNonDigit = true
        }
    }

    return number
}

function getNumberBothWays(row, i) {
    let pre =  getNumberBack(row, i), post = getNumberForward(row, i+1)
    return pre + post
}

function hasTwoSeparateNumbers(row, i) {
    if (!row) return false
    if (isDigit(row[i -1]) && isDigit(row[i + 1]) && !isDigit(row[i]) ) {
        return true
    }
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
