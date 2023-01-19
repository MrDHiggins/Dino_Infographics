
    // Create Dino Constructor
    function Organism(species, weight, height, diet, where, when, fact)
    {
        this.species = species,
        this.weight = weight,
        this.height = height,
        this.diet = diet,
        this.where = where,
        this.when = when,
        this.fact = fact
    }

    // Create Dino Objects
    let dinos = [];
    function Dino(species, weight, height, diet, where, when, fact)
    {
        Organism.call({dinos},species, weight, height, diet, where, when, fact)
    }
    Dino.prototype = Object.create(Organism.prototype);
    Dino.prototype.constructor = Dino;    

    //fetch dino data from server
    const fetchDinoData = async () => {
        const res = await fetch('https://dino-infographics.herokuapp.com/Dinos');
        const data = await res.json();
        return data;
        };

        const populateDino = async () => {
            dinos = await fetchDinoData();
            dinos.map(dino => new Dino(
                    dino.species,
                    dino.weight,
                    dino.height,
                    dino.diet,
                    dino.where,
                    dino.when,
                    dino.fact,
                ));

            console.log(dinos);
        }
        populateDino();


    // Create Human Object
    function human(name, species, weight, height, diet, where){
        Organism.call({}, species, weight, height, diet, where);
        this.name = name;
    }
    human.prototype = Object.create(Organism.prototype);
    human.prototype.constructor = human;

    // Use IIFE to get human data from form
    const getHuman = (function (){
        const getInputEl = {
            getId: function(El_id){
                return document.getElementById(El_id).value;
            }
        }
        
        function setName(name) {
            name = getInputEl.getId('name');
            return name;
        }

        function setHeight(cm){
            cm = getInputEl.getId('cm');
            return cm;
        }

        function setWeight(weight) {
            weight = getInputEl.getId('weight');
            return weight;
        }

        // Leave console.log() for further testing and development
        console.log(new human(setName(), setHeight(), setWeight()));

        return new human(setName(), setHeight(), setHeight());
    })


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen