const fs = require('fs')

function readFile(filename) {
    const fileContents = fs.readFileSync(filename, 'utf-8');
    const races = []
    const megaRace = {}
    fileContents.split(/\r?\n/).forEach(line =>  {
        const [name, results] = line.split(':')
        const data = results.split(' ')
        .filter(r => r !== '')

        data.forEach((r, i) => {
            if (!races[i]) {
                races[i] = {[name.toLowerCase()]: parseInt(r)}
            } else {
                races[i][name.toLowerCase()] = parseInt(r)
            }
        })

        megaRace[name.toLowerCase()] = parseInt(data.reduce((acc, curr) => acc + curr, ''))

    });

    return {races, megaRace}
}

const {races, megaRace} = readFile(process.argv[2])

function canWinRace(buttonPressDuration, time, distance) {
    const travelTime = time - buttonPressDuration
    const travelDistance = buttonPressDuration * travelTime

    return travelDistance > distance
}

function determineMarginOfError(race) {
    const {time, distance} = race
    let wins = 0

    for (let i = 0; i < time; i++) {
        if (canWinRace(i, time, distance)) {
            wins ++
        }
    }

    return wins
}

function reduceToProduct(acc, curr) {
    return acc * curr
}
let gameOneProduct = races.map(determineMarginOfError).reduce(reduceToProduct, 1)
console.log('Game one:', gameOneProduct)
console.log('Game two:', determineMarginOfError(megaRace))