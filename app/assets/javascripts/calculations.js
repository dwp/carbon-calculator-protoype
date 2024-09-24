
let factors;


async function fetchFactors() {
    try {
        //wait for factors.json file to be fetched
        const response = await fetch('/public/jsons/factors.json');
        //if there is an issue with connection to factors file, throw error
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        //display console error and alert if issues with fetching json file
        console.error('Failed to fetch factors:', error);
        alert('Failed to fetch carbon factors. Please try again later.');
        throw error;
    }
}



async function calculateLaptopCarbon(event){
    event.preventDefault();
    //try to fetch factors.json file by calling to fetchFactors function
    try {
        factors = await fetchFactors();
    } catch {
        return;
    }

    //Get laptop type from current HTML page
    var laptopType = document.getElementById("data-holder").textContent;
    //find the laptop emissions based on laptop type
    var laptopStats = factors.deviceFactors.Laptop[laptopType];
    //get laptop embodied and usage emissions and convert to strings
    var laptopEmbodied = JSON.stringify(laptopStats['embodied']);
    var laptopUsage = JSON.stringify(laptopStats['usagePerYear']);
    //calculate total laptop emissions
    var laptopTotal = +laptopEmbodied + (+laptopUsage * 5);

    //change html element to value for total laptop emissions
    document.getElementById("changeMe").textContent=laptopTotal;
}

