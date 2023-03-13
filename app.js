    // Create Dino Constructor
    function Organism(species, weight, height, diet, where, when, facts) {
      this.species = species
      this.weight = weight
      this.height = height
      this.diet = diet
      this.where = where
      this.when = when
      this.facts = facts ? [...facts] : []
      this.image = `images/${species.toLowerCase()}.png`
    }    

    Organism.prototype.newFact = function (fact){
      this.facts = [...this.facts,fact];
    }

    // Create Dino Objects
    function Dino(species, weight, height, diet, where, when, facts) {
        Organism.call(this, species, weight, height, diet, where, when, facts);
    }
    Dino.prototype = Object.create(Organism.prototype);
    Dino.prototype.constructor = Dino;

    //fetch dino data from server
    const fetchDinoData = async () => {
      try {
        const res = await fetch(
          "https://dino-infographics.herokuapp.com/Dinos"
        );
        if (res.ok) {
          const data = await res.json();
          return data;
        } else {
          throw new Error("Error fetching data from API.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    let dinos = {};
 

    const populateDino = async () => {
        const data = await fetchDinoData();
        dinos = data.map(dino => new Dino(
            dino.species,
            dino.weight,
            dino.height,
            dino.diet,
            dino.where, 
            dino.when,
            dino.facts,
        ));
        console.log(dinos);
        return dinos;
        
    }
    
    (async function() {
      await populateDino();
      // Other code that uses the dinos array
    })();
    
    // populateDino();
    // Create Human Object
    function human(name, weight, height) {
      Organism.call(this, 'human', parseInt(weight), parseInt(height));
      this.name = name;
    }
    
    human.prototype = Object.create(Organism.prototype);
    human.prototype.constructor = human;
    

   // Use IIFE to get human data from form
(function(){
function getHuman(){
  const getInputEl = {
    getId: function(El_id){
        return document.getElementById(El_id).value;
    },
  }

  const dinoConversion = {
    getweightUnit: function(){
      let getWeightUnit = document.querySelectorAll('input[name=weightUnit]:checked');
      const selectedWeightUnit = dinoConversion.getWeightConversion(getWeightUnit[0].id);        
      return selectedWeightUnit;
    },
    getHeightUnit: function(){
      let getHeightUnit = document.querySelectorAll('input[name=heightUnit]:checked');
      const selectedHeightUnit = dinoConversion.getHeightConversion(getHeightUnit[0].id);

      return selectedHeightUnit;
    },
    convertLbsToKg: function(dinos){
      const kgDivision = 2.205;
      dinos = [...dinos];
      dinos.forEach((dino) => {
        // return [...dinos, weight == weight/ kgDivision]
         dino.weight = (dino.weight / kgDivision);
      });   
    },
  
    convertKGToLbs: function(){
      let lbsDivision = 2.20;
      dinos = [...dinos];
      dinos.forEach((dino) => {
        return dino.weight = (dino.weight* lbsDivision);
      });
      
      return [...dinos];
    },
  
    getWeightConversion: function(measurement){
      measurement.toString();
      let measurementUnit = measurement !== 'lbs' ? dinoConversion.convertLbsToKg(dinos) : dinoConversion.convertKGToLbs(dinos);
      return measurementUnit;
    },
  
    convertInchToCm: function(dinos){
      let cmDivision = 2.54;
      dinos = [...dinos];
      dinos.forEach((dino) => {
        return dino.height = ((dino.height * cmDivision));
      })
      return dinos;
    },
  
    convertInchToFeet: function(dinos){
      let inchDivision = 12;
      dinos = [...dinos];
      dinos.forEach((dino) => {
        return dino.height = ((dino.height / inchDivision));
      })
      return dinos
    },
  
    getHeightConversion: function(heightMeasurement){
      heightMeasurement.toString();
      let selectedHeight = heightMeasurement !== 'FEET' ? dinoConversion.convertInchToCm(dinos) : dinoConversion.convertInchToFeet(dinos);
      return selectedHeight;
    } 
  };
  

  const getDinoWeight = () => {
    let newWeight = dinoConversion.getweightUnit();
    return newWeight;
  };
  
  const selectedWeight = getDinoWeight();

  const getDinoHeight = () => {
    let newHeight = dinoConversion.getHeightUnit();
    return newHeight;
  };
   const selectedHeight = getDinoHeight();

  const name = getInputEl.getId("name");
  let weight = getInputEl.getId("weight");
  if (selectedWeight === "lbs") {
    weight = parseInt(weight) * 2.205;
  } else {
    //weight = parseInt(weight) * 2.205;
    weight = parseInt(weight);
  }

  let height = getInputEl.getId("height");
  if (selectedHeight !== "CM") {
    height = parseInt(height) * 12;
  } else {
    height = parseInt(height)
  }

  const humanObj = new human(name, weight, height);


  return humanObj;
    }
    window.getHuman = getHuman; // export getHuman to the global scope
})();

Organism.prototype.compareSpecies = function (compareSpecies) {
  const fact = dinos.species === compareSpecies
    ? 'We are of the same species'
    : `I am a ${this.species} and you are a ${compareSpecies}`;
    this.newFact(fact);
};

// Create Dino Compare Method - Weight
// NOTE: Weight in JSON file is in lbs, height in inches.
// Organism.prototype.compareWeight = function (compareWeight) {
//   // const weightUnit = getHuman().selectedWeight === "lbs" ? "lbs" : "kg";
//   let fact;
//   let weightComparison = dinos.weight == compareWeight;
//   weightComparison ? fact = `We are of the same weight` : weightComparison = dinos.weight < compareWeight ? fact = `${dinos.species} weighs  ${(compareWeight - dinos.weight) + weightUnit} less than your weight of ${compareWeight}` : fact = `${dinos.species} weighs more than you by ${(dinos.weight - compareWeight)}`;
//   return this.newFact(weightComparison);
// }

Organism.prototype.compareWeight = function (compareWeight) {
  // const weightUnit = getHuman().selectedWeight === "lbs" ? "lbs" : "kg";
  const fact = dinos.weight === compareWeight
    ? 'We are of the same weight'
    : (this.weight.toFixed(2) > compareWeight ? `${this.species} weighs ${(this.weight.toFixed(2) - compareWeight)}  more than your weight of ${compareWeight}`
    : `${this.species} weighs ${(compareWeight - this.weight.toFixed(2))} less than you`);
    this.newFact(fact);
}

// Create Dino Compare Method - Height
// NOTE: Weight in JSON file is in lbs, height in inches.
Organism.prototype.compareHeight = function (compareHeight) {
  // const heightUnit = getHuman().selectedHeight === "FEET" ? "ft" : "cm";
  let fact;
  let heightComparison = parseInt(dinos.height) == compareHeight;
  heightComparison ? fact = `We are of the same height` : heightComparison = dinos.height < compareHeight ? fact = `${dinos.species} is shorter than ${(compareHeight - dinos.height) + heightUnit}` : fact = `${dinos.species} is taller than you by ${(dinos.height - compareHeight)}`;

};

//Added crytoGraphic to mitigate the risk of exposing generated random values.
Organism.prototype.populateRandomFact = function(){
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  let index = array[0] % this.facts.length;
  return this.facts[index];
}

// Create Dino Compare Method - All
Organism.prototype.compareAll = function (compareSpecies, compareWeight, compareHeight) {
  this.compareSpecies(compareSpecies);
  this.compareWeight(compareWeight);
  this.compareHeight(compareHeight);
  }


// Create Comparison Method - Pass in 2 Organisms
Organism.compareOrganisms = function (org1, org2) {
  org1.compareAll(
    org1.species,
    org1.weight,
    org1.height,
  );
  org2.compareAll(
    org2.species,
    org2.weight,
    org2.height,
  );
};

    //To-Do
    // turn the below code [lin 138-168] into a function
    //Invoke the function
    document.getElementById("flip-card").style.display = "none";
    document.getElementById("btn")
    .addEventListener("click", function () {
        const human = getHuman();
        let a = [...dinos];
        console.log(`This is my new dino{}: ${JSON.stringify(a)}`);
        // console.log(human);
        dinos.forEach((dino) => {
          dino.compareAll(human.species, human.weight, human.height);

        })
        // Hide Form from UI
        document.getElementById("dino-compare").style.display = "none";
        document.getElementById("flip-card").style.display = 'grid'
        // Generate Grids and add back to DOM
        for (let index in dinos) {
          let dino = dinos[index];
          // To-Dp
          //add random fact generator method, and iterate through
          let fact = dino.populateRandomFact();
          //Infographic must display organism attributes onHover of grid-item
            let gridItemEl = populateGridItem(dino.species, dino.image, fact);

            document.getElementById("flip-card")
                .appendChild(gridItemEl);
            if (index == 3) {
              console.log(index);
                // insert human tile at center
                let humanTileDiv = populateGridItem(human.species, human.image);

                document.getElementById("flip-card")
                    .appendChild(humanTileDiv);
            }
        }
        populateResetButton();
        clearComparison();
    });
    
    function populateGridItem(species, image, fact) {

      let gridItemEl = document.createElement("div");
      gridItemEl.className = "flip-card-inner";
  
      let itemFrontDiv = document.createElement('div');
      itemFrontDiv.className = 'flip-card-front';
      gridItemEl.appendChild(itemFrontDiv);

      let speciesDiv = document.createElement("h3");
      speciesDiv.innerText = species;
      itemFrontDiv.appendChild(speciesDiv);

      let imageDiv = document.createElement("img");
      imageDiv.src = image;
      itemFrontDiv.appendChild(imageDiv);

      let itemBackDiv = document.createElement('div');
      itemBackDiv.className = 'flip-card-back';
      gridItemEl.appendChild(itemBackDiv);

      let factFiv = document.createElement("p");
      factFiv.innerText = fact;
      itemBackDiv.appendChild(factFiv);
      
      return gridItemEl;
  }

  function populateResetButton(){
    
    let gridDiv = document.getElementById('grid');

    let resetDiv = document.createElement('div');
    resetDiv.id = 'reset';
    gridDiv.appendChild(resetDiv);

    let clearBtn = document.createElement('div');
    clearBtn.id = 'clearBtn';
    clearBtn.innerHTML = 'Reset';
    
    resetDiv.appendChild(clearBtn);

    return gridDiv;
  }
  function clearComparison(){
    clearBtn.addEventListener('click',pageReload);
  }

  function pageReload(){
    window.location.reload();
  }
