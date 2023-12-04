var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(process.argv[2])
});

const result = 0;
const data = []
lineReader.on('line', function (line) {
    // put textfile into data structure
    data.push(line.split(''))
})


lineReader.on('close', function () {
    // log out each row
    data.forEach((row, index) => {
       console.log(index, row)
    })

    console.log(`Result: ${result}`)
});