
var lineReader = require('readline').createInterface({
input: require('fs').createReadStream('input.txt')
});

let total = 0

function isADigit(n) {
    return  !isNaN(parseInt(n))
}

const initialLetters = {
    z: ['zero'],
    o: ['one'],
    t: ['two', 'three'],
    f: ['four', 'five'],
    s: ['six', 'seven'],
    e: ['eight'],
    n: ['nine']
}

const finalLetters = {
    o: ['zero', 'two'],
    e: ['one', 'three', 'five', 'nine'],
    r: ['four'],
    x: ['six'],
    n: ['seven'],
    t: ['eight']

}

const wordToDigitMap = {
    zero: '0',
    one: '1', 
    two: '2',
    three: '3', 
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
}

function isStartOfNumberWord(l) {
    if (initialLetters[l]) return true;
}

function isEndOfNumberWord(l) {
    if (finalLetters[l]) return true
}


lineReader.on('line', function (line) {
    let lineValue = ''
    // find the first digit
    for (i = 0; i < line.length; i ++) {
        const char = line[i]
        if (isADigit(char)) {
            lineValue += char
            break
        } else if (isStartOfNumberWord(char)) {
            const possibleNumbers = initialLetters[char]
            let match 
            for (j = 0; j < possibleNumbers.length; j++) {
                const n = possibleNumbers[j]

                const x = line.slice(i, i + n.length)
                console.log(21, x)
                if (n === x ) {
                    console.log(22)
                    match = wordToDigitMap[n]
                    break
                }
            }
            if (match) {
                lineValue += match
                break
            }

        }
    }
    // find the last digit
    for (i = line.length - 1; i > -1; i --) {
        const char = line[i]
        if (isADigit(char)) {
            lineValue += char
            break
        } else if (isEndOfNumberWord(char)) {
            const possibleNumbers = finalLetters[char]
            let match
            for (j = 0; j < possibleNumbers.length; j++) {
                const n = possibleNumbers[j]
                const x  = line.slice(i - n.length + 1, i + 1)

                if (n === x) {
                    match = wordToDigitMap[n]
                    break
                }
            }
            if (match) {
                lineValue += match
                break
            }
        }
    }
    // add them to the total
    console.log(lineValue)
    total += parseInt(lineValue)
});

lineReader.on('close', function () {
    console.log(`Total: ${total}`);
});
