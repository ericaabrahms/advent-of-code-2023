const readline = require('readline')
const fs = require('fs')
const { once } = require('events');
const { findSourceMap } = require('module');

const seeds = [919339981,562444630,3366006921,67827214,1496677366,101156779,4140591657,5858311,2566406753,71724353,2721360939,35899538,383860877,424668759,3649554897,442182562,2846055542,49953829,2988140126,256306471]
const result= 0;
const data = []

function readMap(source, dest) {
    const fileContents = fs.readFileSync(`input-maps/${source}-${dest}.txt`, 'utf-8');
    const map = []
    fileContents.split(/\r?\n/).forEach(line =>  {
        const [destinationRangeStart, sourceRangeStart, range] = line.split(' ').map(n => parseInt(n))
        map.push({destinationRangeStart, sourceRangeStart, range})
    });
    return map
}

function findDestination(src, map) {
    for (let i = 0; i < map.length; i++) {
        const {destinationRangeStart, sourceRangeStart, range} = map[i]

        const diff = src - sourceRangeStart
        if (diff >= 0 && diff < range) {
            return destinationRangeStart + diff
        }
    }

    return src
}

function getLowestLocationValueFromExpandedRange() {
    let lowestValue
    for (let i = 0; i < seeds.length; i = i+2) {
        const seedRange = seeds[i + 1]
        for (let j = 0; j < seedRange; j++) {
            let seedId = seeds[i] + j
            let location = getLocationFromSeedId(seedId)
            if (!lowestValue) {
                lowestValue = location
            } else if (location < lowestValue) {
                lowestValue = location
            }
        }
    }

    return lowestValue
}
 
const seedSoilMap = readMap('seed', 'soil')
const soilFertilizerMap = readMap('soil', 'fertilizer')
const fertilizerWaterMap = readMap('fertilizer', 'water')
const waterLightMap = readMap('water', 'light')
const lightTemperatureMap = readMap('light', 'temperature')
const temperatureHumidityMap = readMap('temperature', 'humidity')
const humidityLocationMap = readMap('humidity', 'location')

findDestination(seeds[0], seedSoilMap)

const gameOneLocations = []
seeds.forEach(populateLocationList(gameOneLocations))


function getLocationFromSeedId (seedId) {
    const location = findDestination( 
        findDestination( 
            findDestination(
                findDestination(
                    findDestination(
                        findDestination(
                            findDestination(
                                seedId,
                                seedSoilMap
                            ),
                            soilFertilizerMap,
                        ),
                        fertilizerWaterMap,
                    ),
                    waterLightMap
                ),
                lightTemperatureMap                      
            ), 
            temperatureHumidityMap
        ),
        humidityLocationMap
    )

    return location
}
function populateLocationList(locationList) {
    return (seedId) => {
        locationList.push(getLocationFromSeedId(seedId))
    }
}

const gameOneLocationsSorted = gameOneLocations.sort((a, b) => a - b)
console.log(`lowestGameOneLocation ${gameOneLocationsSorted[0]}`)

let lowestGameTwoLocation = getLowestLocationValueFromExpandedRange()
console.log(`lowest Game Two Location ${lowestGameTwoLocation}`)
