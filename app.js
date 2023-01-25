/*
* Represent a dinosaur
* @constructor
* @param {string} species    - Type of species
* @param {number} weight     - Total mass of organism
* @param {number} height     - Total height of organism
* @param {string} diet       - The diet of the said organism 
* @param {string} where      - Location of the said organism
* @param {string} when       - Period of existence
* @param {string} fact       - An interesting fact of the organism
*/
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
            }
        }

        return (function(){
            let name = getInputEl.getId('name');
            let cm =  getInputEl.getId('cm');
            let weight =  getInputEl.getId('weight');

            return new human(name, cm, weight);
        })();
    }
    getHuman();


    //The below onClick method is for further testing and development
    let button = document.getElementById('btn');
    button.onclick(getHuman());


    // Create Dino Compare Method - Species
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    Organism.prototype.compareSpecies = function (compareSpecies){
      let fact; 
      let speciesMatch = this.species == compareSpecies;
      speciesMatch ? fact = 'We are of the same species': fact = `I am of ${species} and you're of ${this.species}`;

      this.newFact(fact);
    }
    
    // Create Dino Compare Method - Weight
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Organism.prototype.compareWeight = function (compareWeight){
      let fact;
      let weightComparison = this.weight == compareWeight;
      weightComparison ? fact = `We are of the same weight` : weightComparison = this.weight < weight ? fact = `${this.species} weighs less than ${species}` : fact = `${this.species} weighs more than ${species}`;

      this.newFact(fact);
    }
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Organism.prototype.compareHeight = function (compareHeight) {
      let fact;
      let heightComparison = this.height == compareHeight;
      heightComparison ? fact = `We are of the same height` : heightComparison = this.height < compareHeight ? fact = `${this.species} is shorter than ${compareHeight}` : fact = `${this.species} is taller than ${compareHeight}`;
      this.newFact(fact);
    }

    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen