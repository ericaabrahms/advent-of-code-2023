const fs = require('fs')

function readFile(filename) {
    const fileContents = fs.readFileSync(filename, 'utf-8');
    return fileContents.split(/\r?\n/).map(line =>  {
        const player = line.split(' ')
        const bid = player[1]
        const hand = player[0].split('')
        return {hand, bid}
    });
}

const players = readFile(process.argv[2])

const cardTypes = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const gameTwoCardTypes = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']
const handTypes = ['high-card', 'one-pair', 'two-pair', 'three-of-a-kind', 'full-house', 'four-of-a-kind', 'five-of-a-kind']

function compareHands(playerA, playerB) {
    const handRankA = handTypes.indexOf(determineHandType(playerA))
    const handRankB = handTypes.indexOf(determineHandType(playerB))

    if (handRankA > handRankB) return 1
    else if (handRankA < handRankB) return -1
    else {
        const handA = playerA.hand
        const handB = playerB.hand

        for (let i = 0; i < 5; i++) {
            const cardA = handA[i]
            const cardB = handB[i]
            if (cardA !== cardB) {
                cardRankA = cardTypes.indexOf(cardA)
                cardRankB = cardTypes.indexOf(cardB)

                if (cardRankA > cardRankB) return 1
                else if (cardRankA < cardRankB) return -1
            }
        }
    }
    
    return 0
}

function sortBasedOnCardRanking(cardRankingList = cardTypes) {
    return (playerA, playerB) => {
        const handRankA = handTypes.indexOf(determineHandType(playerA))
        const handRankB = handTypes.indexOf(determineHandType(playerB))
    
        if (handRankA > handRankB) return 1
        else if (handRankA < handRankB) return -1
        else {
            const handA = playerA.hand
            const handB = playerB.hand
    
            for (let i = 0; i < 5; i++) {
                const cardA = handA[i]
                const cardB = handB[i]
                if (cardA !== cardB) {
                    cardRankA = cardRankingList.indexOf(cardA)
                    cardRankB = cardRankingList.indexOf(cardB)
    
                    if (cardRankA > cardRankB) return 1
                    else if (cardRankA < cardRankB) return -1
                }
            }
        }
        
        return 0
    }
}

function determineHandType(player) {
    const {hand} = player

    const cardCounts = hand.reduce((acc, curr) => {
        if (!acc[curr]) {
            acc[curr] = 1
        } else {
            acc[curr]++
        }
        return acc
    }, {})


    let hasThree = false; pairs = 0
    let cardTypes = Object.keys(cardCounts)
    for (c of cardTypes) {
        if (cardCounts[c] == 5) return 'five-of-a-kind'
        if (cardCounts[c] == 4) return 'four-of-a-kind'
        if (cardCounts[c] == 3) {
            hasThree = true
        } else if (cardCounts[c] == 2) {
            pairs++
        }
    }

    if (hasThree && pairs) return 'full-house'
    if (hasThree) return 'three-of-a-kind'
    if (pairs === 2) return 'two-pair'
    if (pairs) return 'one-pair'
    return 'high-card'

}

const gameOnePlayers = players.sort(sortBasedOnCardRanking())

function determineWinnings(player, index) {
    const rank = index + 1;
    return player.bid * rank;
}

const gameOneSum = gameOnePlayers.map(determineWinnings).reduce((curr, acc) => acc + curr, 0)
console.log('Game one', gameOneSum)