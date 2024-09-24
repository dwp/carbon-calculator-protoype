
let factors;


// var nunjucks  = require('nunjucks');
// var env = nunjucks.configure();
// env.addGlobal('calculateLaptopCarbon', calculateLaptopCarbon);


// async function fetchFactors() {
//         try{
//             const url = "/public/jsons/factors.json";
//             const response = await fetch(url);
//             factors = await response.json();
//             if (!response.ok) throw new Error('Network response was not ok: ${response.status}');
//             return factors;
//         }
//         catch (error){
//             alert(error.message, error);
//             throw error;
//         }
//  }


async function fetchFactors() {
    try {
        const response = await fetch('/public/jsons/factors.json');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch factors:', error);
        alert('Failed to fetch carbon factors. Please try again later.');
        throw error;
    }
}



async function calculateLaptopCarbon(event){
    event.preventDefault();
    
    try {
        factors = await fetchFactors();
    } catch {
        return;
    }

    //var laptop = JSON.stringify(factors.deviceFactors.Laptop['embodied']);
    //var result = laptop*3;

    var laptopType = document.getElementById("data-holder").textContent;
    var laptopStats = factors.deviceFactors.Laptop[laptopType];
    var laptopEmbodied = JSON.stringify(laptopStats['embodied']);
    var laptopUsage = JSON.stringify(laptopStats['usagePerYear']);

    var laptopTotal = +laptopEmbodied + (+laptopUsage * 5);


    //const laptopFactors = getLaptopText();
    //const sampleText = data['laptop-type'];

    document.getElementById("changeMe").textContent=laptopTotal;
}

