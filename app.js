    // Create Dino Constructor
    function Organism(species, weight, height, diet, where, when, facts)
    {
        this.species = species,
        this.weight = weight,
        this.height = height,
        this.diet = diet,
        this.where = where,
        this.when = when,
        this.facts = facts ? [...facts] : [],
        this.image = `images/${species.toLowerCase()}.png`;
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

    let dinos = []
    const populateDino = async () => {
        const data = await fetchDinoData();
        dinos = data.map(dino => new Dino(
            dino.species,
            dino.weight,
            dino.height,
            dino.diet,
            dino.where, 
            dino.when,
            dino.facts
        ));
        console.log(dinos);
        return dinos;
    }
    
    populateDino();
    // Create Human Object
    function human(name, weight, height ){
        Organism.call(this, 'human', weight, height);
        this.name = name;
    }
    human.prototype = Object.create(Organism.prototype);
    human.prototype.constructor = human;

   // Use IIFE to get human data from form
   function getHuman(){
    const getInputEl = {
        getId: function(El_id){
            return document.getElementById(El_id).value;
        },
        // calculateTotalMass: function(){
        //   let weightValue = getInputEl.getId('weight');
        //   // let selectedWeight = dinoConversion.getweightUnit();
        //   // weightValue = selectedWeight[0] + weightValue;
        //   return weightValue;
        // }
    }

    const dinoConversion = {
      getweightUnit: function(){
        let getUnit = document.querySelectorAll('input[type=radio]');
        const selectedWeightUnit = [...getUnit].filter(unitEl => unitEl.checked)
          .map(unitEl => this.getWeightConversion(unitEl.id));
      
        return selectedWeightUnit;
      },
      getWeightConversion: function(measurement){
        measurement.toString();
        if(measurement !== 'lbs'){
          dinos = [...dinos],
          // return dinos.weight / 2205;
          dinos.map(dino => {
            dino.weight = Math.floor(dino.weight / 2,205);
          })
          return dinos;
        }
      },
    }

    const getDinoWeight = () => {
        let newWeight = dinoConversion.getweightUnit();
        return newWeight
    }

    getDinoWeight();
    
    return (function(){
        let name = getInputEl.getId('name');
        let weight = getInputEl.getId('weight');
        let cm =  getInputEl.getId('cm');
        

        return new human(name, +weight, cm );
    })();
}
// getHuman();
//The below onClick method is for further testing and development


// Create Dino Compare Method - Species
// NOTE: Weight in JSON file is in lbs, height in inches. 
Organism.prototype.compareSpecies = function (compareSpecies) {
  let fact;
  let speciesMatch = this.species == compareSpecies;
  speciesMatch ? fact = 'We are of the same species' : fact = `I am of ${this.species} and you're of ${compareSpecies}`;
  this.newFact(fact);
}

// Create Dino Compare Method - Weight
// NOTE: Weight in JSON file is in lbs, height in inches.
Organism.prototype.compareWeight = function (compareWeight) {
  let fact;
  let weightComparison = this.weight == compareWeight;
  weightComparison ? fact = `We are of the same weight` : weightComparison = this.weight < compareWeight ? fact = `${this.species} weighs  ${compareWeight - this.weight} less than your weight of ${compareWeight}` : fact = `${this.species} weighs more than you by ${this.weight - compareWeight}`;
  this.newFact(fact);
}

// Create Dino Compare Method - Height
// NOTE: Weight in JSON file is in lbs, height in inches.
Organism.prototype.compareHeight = function (compareHeight) {
  let fact;
  let heightComparison = this.height == compareHeight;
  heightComparison ? fact = `We are of the same height` : heightComparison = this.height < compareHeight ? fact = `${this.species} is shorter than ${compareHeight}` : fact = `${this.species} is taller than ${compareHeight}`;
  this.newFact(fact);
}

Organism.prototype.populateRandomFact = function(){
  let index = Math.floor(Math.random() * 10) % this.facts.length;
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
    org2.species,
    org2.weight,
    org2.height,
  );
  org2.compareAll(
    org1.species,
    org1.weight,
    org1.height,
  );
};
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.

    //To-Do
    // turn the below code [lin 138-168] into a function
    //Invoke the function
    document.getElementById("flip-card").style.display = "none";
    document.getElementById("btn")
    .addEventListener("click", function () {
        const human = getHuman();
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
