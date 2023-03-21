/*
* Author: Dyllan Higgins
* Description: This is the main file for the Udacity Dino_Infographics project.'
* Date last modified: 2023/03/21
* Changes made: Refactored code according to feedback from Udacity reviewer.
*/
function Organism (species, weight, height, diet, where, when, facts) {
  this.species = species
  this.weight = weight
  this.height = height
  this.diet = diet
  this.where = where
  this.when = when
  this.facts = facts ? [...facts] : []
  this.image = `images/${species.toLowerCase()}.png`
}

Organism.prototype.newFact = function (fact) {
  this.facts = [...this.facts, fact]
}

function Dino (species, weight, height, diet, where, when, facts) {
  Organism.call(this, species, weight, height, diet, where, when, facts)
}
Dino.prototype = Object.create(Organism.prototype)
Dino.prototype.constructor = Dino

const fetchDinoData = async () => {
  try {
    const res = await fetch(
      'https://dino-infographics.herokuapp.com/Dinos'
    )
    if (res.ok) {
      const data = await res.json()
      return data
    } else {
      throw new Error('Error fetching data from API.')
    }
  } catch (error) {
    return error
  }
}

let dinos = {}

const populateDino = async () => {
  const data = await fetchDinoData()
  dinos = data.map(dino => new Dino(
    dino.species,
    dino.weight,
    dino.height,
    dino.diet,
    dino.where,
    dino.when,
    dino.facts
  ))
  return dinos
}

(async function () {
  await populateDino()
})()

function Human (name, weight, height) {
  Organism.call(this, 'human', parseInt(weight), parseInt(height))
  this.name = name
}

Human.prototype = Object.create(Organism.prototype)
Human.prototype.constructor = Human;

(function () {
  function getHuman () {
    // getID function to get the value of an input element
    const getInputEl = {
      getId: function (elementId) {
        return document.getElementById(elementId).value
      }
    }
    // getWeightUnit function to get the value of the weightUnit group, radio button value
    const dinoConversion = {
      getweightUnit: function () {
        const weightUnit = document.querySelectorAll('input[name=weightUnit]:checked')
        const selectedWeightUnit = dinoConversion.getWeightConversion(weightUnit[0].id)
        return selectedWeightUnit
      },
      // getHeightUnit function to get the value of the heightUnit group, radio button value
      getHeightUnit: function () {
        const heightUnit = document.querySelectorAll('input[name=heightUnit]:checked')
        const selectedHeightUnit = dinoConversion.getHeightConversion(heightUnit[0].id)
        return selectedHeightUnit
      },
      // convertLbsToKg function to convert lbs to kg
      convertLbsToKg: function (dinos) {
        const kgDivision = 2.205
        dinos = [...dinos]
        dinos.forEach((dino) => {
          dino.weight = (dino.weight / kgDivision)
        })
      },
      // convertKgToLbs function to convert kg to lbs - itenarary condition evaluation for the weight conversion
      getWeightConversion: function (measurement) {
        measurement.toString()
        const measurementUnit = measurement !== 'Lbs' ? dinoConversion.convertLbsToKg(dinos) : null
        return measurementUnit
      },
      // convertCmToInch function to convert cm to inch
      convertInchToCm: function (dinos) {
        const cmDivision = 2.54
        dinos = [...dinos]
        dinos.forEach((dino) => {
          dino.height = (dino.height * cmDivision)
        })
      },
      // convertInchToFeet function to convert inch to feet
      convertInchToFeet: function (dinos) {
        const inchDivision = 12
        dinos = [...dinos]
        dinos.forEach((dino) => {
          dino.height = (dino.height / inchDivision)
        })
      },
      // convertCmToInch function to convert cm to inch - itenarary condition evaluation for the height conversion
      getHeightConversion: function (heightMeasurement) {
        heightMeasurement.toString()
        const selectedHeight = heightMeasurement !== 'FEET' ? dinoConversion.convertInchToCm(dinos) : dinoConversion.convertInchToFeet(dinos)
        return selectedHeight
      }
    }
    // Assign variable to the value of the weightUnit radio button id attribute
    const getDinoWeight = () => {
      const newWeight = dinoConversion.getweightUnit()
      return newWeight
    }
    // Assign variable to the value of the heightUnit radio button id attribute
    const getDinoHeight = () => {
      const newHeight = dinoConversion.getHeightUnit()
      return newHeight
    }
    getDinoWeight()
    getDinoHeight()

    // Variable declaration for the form inputs
    const selectedWeight = document.querySelector('input[name=weightUnit]:checked').id
    const selectedHeight = document.querySelector('input[name=heightUnit]:checked').id

    // Create a new human object
    const name = getInputEl.getId('name')
    let weight = getInputEl.getId('weight')
    if (selectedWeight === 'Lbs') {
      const pountToKg = 2.205
      weight = parseInt(weight) * pountToKg
    } else {
      weight = parseInt(weight)
    }

    let height = getInputEl.getId('height')
    if (selectedHeight !== 'CM') {
      const footToLbs = 30.48
      height = parseInt(height) / footToLbs
    } else {
      height = parseInt(height)
    }

    const humanObj = new Human(name, weight, height)

    return humanObj
  }
  // Assign the getHuman function to the global window object to be accessible in the app.js file
  window.getHuman = getHuman

  return getHuman
})()

// Create Dino Compare Method 1 - Compare Species type
Organism.prototype.compareSpecies = function (compareSpecies) {
  const fact = dinos.species === compareSpecies
    ? 'We are of the same species'
    : `I am a ${this.species} and you are a ${compareSpecies}`
  this.newFact(fact)
}

// Create Dino Compare Method 2 - Compare Weight between human and dinos
Organism.prototype.compareWeight = function (compareWeight) {
  const weightUnit = document.querySelector('input[name=weightUnit]:checked').id
  const fact = dinos.weight === compareWeight
    ? 'We are of the same weight'
    : (this.weight.toFixed(2) > compareWeight
        ? `${this.species}'s weight of ${this.weight.toFixed(2)}${weightUnit} is ${(this.weight.toFixed(2) - compareWeight)}${weightUnit} more than your weight of ${compareWeight}${weightUnit}`
        : `${this.species}'s weight of ${this.weight.toFixed(2)}${weightUnit} is ${(compareWeight - this.weight.toFixed(2))}${weightUnit} less than your weight of ${compareWeight}${weightUnit}`)
  this.newFact(fact)
}

// Create Dino Compare Method 3 - Compare Height between human and dinos
Organism.prototype.compareHeight = function (compareHeight) {
  const heightUnit = document.querySelector('input[name=heightUnit]:checked').id
  const fact = dinos.height === compareHeight
    ? 'We are of the same height'
    : this.height > compareHeight
      ? `${this.species}'s height of ${this.height}${heightUnit.toLowerCase()} is ${(this.height - compareHeight)} ${heightUnit.toLowerCase()} taller than your height of ${compareHeight}${heightUnit.toLowerCase()}`
      : `Your height of ${compareHeight}${heightUnit.toLowerCase()} is ${compareHeight.toFixed() - this.height.toFixed()}${heightUnit.toLowerCase()} more than ${this.species}'s height of ${this.height}${heightUnit.toLowerCase()}`
  this.newFact(fact)
}

// Create Dino Compare Method 4 - Populate Random Fact about the dino
Organism.prototype.populateRandomFact = function () {
  const array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  const index = array[0] % this.facts.length
  return this.facts[index]
}

// Compare the human and dino objects
Organism.prototype.compareAll = function (compareSpecies, compareWeight, compareHeight) {
  this.compareSpecies(compareSpecies)
  this.compareWeight(compareWeight)
  this.compareHeight(compareHeight)
}

// Method to compare all dino properties with the human object
Organism.compareOrganisms = function (org1, org2) {
  org1.compareAll(
    org1.species,
    org1.weight,
    org1.height
  )
  org2.compareAll(
    org2.species,
    org2.weight,
    org2.height
  )
}

document.getElementById('flip-card').style.display = 'none'
document.getElementById('btn')
  .addEventListener('click', function () {
    const name = document.forms['user-input'].name.value
    const weight = document.forms['user-input'].weight.value
    const height = document.forms['user-input'].height.value

    const formValidation = [name, weight, height]
      .every((input) => input !== '')

    if (!formValidation) {
      return alert('All fields must be filled out')
    } else if (name === '') {
      return alert('Name must be filled out')
    } else if (weight === '') {
      return alert('Weight must be filled out')
    } else if (height === '') {
      return alert('Height must be filled out')
    } else {
      const human = window.getHuman()
      dinos.forEach((dino) => {
        dino.compareAll(human.species, human.weight, human.height)
      })
      document.getElementById('dino-compare').style.display = 'none'
      document.getElementById('flip-card').style.display = 'grid'
      for (const index in dinos) {
        const dino = dinos[index]
        let fact = dino.populateRandomFact()
        if (dino.species === 'Pigeon') {
          fact = 'All birds are living dinosaurs.'
        }
        const gridItemEl = populateGridItem(dino.species, dino.image, fact)

        document.getElementById('flip-card').appendChild(gridItemEl)
        if (index === '3') {
          const humanTileDiv = populateGridItem(human.species, human.image, human.name)
          document.getElementById('flip-card').appendChild(humanTileDiv)
        }
      }

      populateResetButton()
      clearComparison()
    }
  })

function populateGridItem (species, image, fact) {
  const gridItemEl = document.createElement('div')
  gridItemEl.className = 'flip-card-inner'

  const itemFrontDiv = document.createElement('div')
  itemFrontDiv.className = 'flip-card-front'
  gridItemEl.appendChild(itemFrontDiv)

  const speciesDiv = document.createElement('h3')
  speciesDiv.innerText = species
  itemFrontDiv.appendChild(speciesDiv)

  const imageDiv = document.createElement('img')
  imageDiv.src = image
  itemFrontDiv.appendChild(imageDiv)

  const itemBackDiv = document.createElement('div')
  itemBackDiv.className = 'flip-card-back'
  gridItemEl.appendChild(itemBackDiv)

  const factFiv = document.createElement('p')
  factFiv.innerText = fact
  itemBackDiv.appendChild(factFiv)

  return gridItemEl
}

function populateResetButton () {
  const gridDiv = document.getElementById('grid')

  const resetDiv = document.createElement('div')
  resetDiv.id = 'reset'
  gridDiv.appendChild(resetDiv)

  const clearBtn = document.createElement('div')
  clearBtn.id = 'clearBtn'
  clearBtn.innerHTML = 'Reset'

  resetDiv.appendChild(clearBtn)

  return gridDiv
}
function clearComparison () {
  const clearBtn = document.getElementById('clearBtn')
  clearBtn.addEventListener('click', pageReload)
}

function pageReload () {
  window.location.reload()
}
