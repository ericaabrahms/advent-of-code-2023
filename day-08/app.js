const fs = require('fs');
const { start } = require('repl');

function readFile(filename) {
    const fileContents = fs.readFileSync(filename, 'utf-8').trim().split(/\r?\n/);
    const rlInstructions = fileContents.shift()
    
    const maps = fileContents.filter(line => line.trim()).reduce((acc, line) =>  {
        const key = line.slice(0, 3)
        const L = line.slice(7, 10)
        const R = line.slice(12, 15)
        acc[key] = {L, R}
        return acc
    }, {});

    return {rlInstructions, maps}
}


const {rlInstructions, maps} = readFile(process.argv[2])

const gameTwoStartingPoints = Object.keys(maps).filter(key => key[2] === 'A')

function computeStepsToZZZ() {
    let steps = 0;
    let reachedEnd = false

    let nextStep = 'AAA'
    while (!reachedEnd) {
        const lr = rlInstructions[steps % rlInstructions.length]
        steps++

        nextStep = maps[nextStep][lr]

        if (nextStep === 'ZZZ') {
            reachedEnd = true
        }
    }

    return steps
}

function computeStepsGhostMode(startingPoints) {
    let steps = 0;
    let reachedEnd = false

    let nextSteps = startingPoints
    while (!reachedEnd) {
        const lr = rlInstructions[steps % rlInstructions.length]
        steps++

        nextSteps = nextSteps.map(nextStep => {
            return maps[nextStep][lr]
        })
        

        if (nextSteps.filter(s => s[2] === 'Z').length === nextSteps.length) {
            reachedEnd = true
        }


        if (steps % 1000000000 === 0) {
            console.log(steps)
        }

    }

    return steps

}

console.log('Game one:', computeStepsToZZZ())
// console.log('Game two:', computeStepsGhostMode(gameTwoStartingPoints))
console.log('Game two:', computeStepsGhostMode(gameTwoStartingPoints))


// const timesToGetBackToStart = gameTwoStartingPoints.map(computeTimesToGetBackToStart) 