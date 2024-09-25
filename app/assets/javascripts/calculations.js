
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

    //Laptop
    var hasLaptop = document.getElementById("data-holder-laptop").textContent;
    if(hasLaptop == 'Yes'){
        //Get laptop type from current HTML page
        var laptopType = document.getElementById("data-holder-laptop-type").textContent;
        //find the laptop emissions based on laptop type
        var laptopStats = factors.deviceFactors.Laptop[laptopType];
        //get laptop embodied and usage emissions and convert to strings
        var laptopEmbodied = JSON.stringify(laptopStats['embodied']);
        var laptopUsage = JSON.stringify(laptopStats['usagePerYear']);
        //calculate total laptop emissions
        var laptopTotal = (+laptopEmbodied/5) + +laptopUsage;

        //change html element to value for total laptop emissions
        document.getElementById("laptop-emissions").textContent=laptopTotal.toFixed(3) + " kg CO2e";
    }
    else{
        document.getElementById("laptop-emissions").textContent="No emissions";
    }
   

    //Desktop
    var hasDesktop = document.getElementById("data-holder-desktop").textContent;
    if (hasDesktop == 'Yes'){
        var desktopStats = factors.deviceFactors['Desktop'];
        var desktopEmbodied = JSON.stringify(desktopStats['embodied']);
        var desktopUsage = JSON.stringify(desktopStats['usagePerYear']);
        var desktopTotal = (+desktopEmbodied/5) + +desktopUsage;
        document.getElementById("desktop-emissions").textContent=desktopTotal.toFixed(3) + " kg CO2e";
     }
    else{
        document.getElementById("desktop-emissions").textContent="No emissions";
    }


    //Monitors
    var hasMonitor = document.getElementById("data-holder-monitor").textContent;
    if (hasMonitor == 'Yes'){
        var numberMonitors = document.getElementById("data-holder-monitor-number").textContent;
        var monitorStats = factors.deviceFactors['Monitor'];
        var monitorEmbodied = JSON.stringify(monitorStats['embodied']);
        var monitorUsage = JSON.stringify(monitorStats['usagePerYear']);
        var monitorTotal = ((+monitorEmbodied/5) + +monitorUsage) * +numberMonitors;
        document.getElementById("monitor-emissions").textContent=monitorTotal.toFixed(3) + " kg CO2e";
    }
    else{
        document.getElementById("monitor-emissions").textContent="No emissions";
    }
    
    //Smartphone
    var hasSmartphone = document.getElementById("data-holder-smartphone").textContent;
    if (hasSmartphone == 'Yes'){
        var smartphoneType = document.getElementById("data-holder-smartphone-type").textContent;
        var smartphoneStats = factors.deviceFactors.Smartphone[smartphoneType];
        var smartphoneEmbodied = JSON.stringify(smartphoneStats['embodied']);
        var smartphoneUsage = JSON.stringify(smartphoneStats['usagePerYear']);
        var smartphoneTotal = (+smartphoneEmbodied/5) + +smartphoneUsage;
        document.getElementById("smartphone-emissions").textContent=smartphoneTotal.toFixed(3) + " kg CO2e";
    }
    else{
        document.getElementById("smartphone-emissions").textContent="No emissions";
    }


    //emails
    var numEmails = document.getElementById("data-holder-emails").textContent;
    var numAttachments = document.getElementById("data-holder-emails-attachments").textContent;

    var emailEmission = JSON.stringify(factors.emailFactors['email']);
    var attachmentEmission = JSON.stringify(factors.emailFactors['attachmentEmail']);

    var totalEmailEmissionsWeekly = (+numEmails * +emailEmission) + (+numAttachments * +attachmentEmission);
    var totalEmailEmissionsYearly = +totalEmailEmissionsWeekly * 52;
    document.getElementById("email-emissions").textContent=totalEmailEmissionsYearly.toFixed(3) + " kg CO2e";


    //teams
    var teamsMessages = document.getElementById("data-holder-teams-messages").textContent;
    var teamsHours = document.getElementById("data-holder-teams-hours").textContent;

    var teamsMessageEmission = JSON.stringify(factors.teamsFactors['messages']);
    var teamsHourlyEmission = JSON.stringify(factors.teamsFactors['calls']);

    var totalTeamsEmissionsWeekly = (+teamsMessages * +teamsMessageEmission) + (+teamsHours * +teamsHourlyEmission);
    var totalTeamsEmissionsYearly = +totalTeamsEmissionsWeekly * 52;
    document.getElementById("teams-emissions").textContent=totalTeamsEmissionsYearly.toFixed(3) + " kg CO2e";


    //business travel
    var businessTravelFrequency = document.getElementById("data-holder-b-travel-frequency").textContent;
    var businessTravelMode = document.getElementById("data-holder-b-travel-mode").textContent;
    var businessTravelDistance = document.getElementById("data-holder-b-travel-distance").textContent;

    var transportFactor = JSON.stringify(factors.transportFactors[businessTravelMode]);
    var bTravelMonthlyEmissions = +businessTravelFrequency * +businessTravelDistance * +transportFactor;
    var bTravelYearlyEmissions = +bTravelMonthlyEmissions * 12;
    document.getElementById("business-travel-emissions").textContent=bTravelYearlyEmissions.toFixed(3) + " kg CO2e";

}

