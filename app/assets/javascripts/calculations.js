
let factors;


async function fetchFactors() {
    try {
        // Wait for factors.json file to be fetched
        const response = await fetch('/public/jsons/factors.json');
        // If there is an issue with connection to factors file, throw error
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        // Display console error and alert if issues with fetching json file
        console.error('Failed to fetch factors:', error);
        alert('Failed to fetch carbon factors. Please try again later.');
        throw error;
    }
}



function checkAnswers(){

    var emailAmount = document.getElementById('data-holder-emails').textContent;
    if (emailAmount == 10){document.getElementById('emails-placeholder').textContent = "0 to 19 per week";}
    else if (emailAmount == 35){document.getElementById('emails-placeholder').textContent = "20 to 49 per week";}
    else if (emailAmount == 75){document.getElementById('emails-placeholder').textContent = "50 to 100 per week";}
    else if (emailAmount == 125){document.getElementById('emails-placeholder').textContent = "more than 100 per week";}
    else {document.getElementById('emails-placeholder').textContent = "no answer";}

    var attachmentsAmount = document.getElementById('data-holder-emails-attachments').textContent;
    if (attachmentsAmount == 10){document.getElementById('email-attachments-placeholder').textContent = "0 to 19 per week";}
    else if (attachmentsAmount == 35){document.getElementById('email-attachments-placeholder').textContent = "20 to 49 per week";}
    else if (attachmentsAmount == 75){document.getElementById('email-attachments-placeholder').textContent = "50 to 100 per week";}
    else if (attachmentsAmount == 125){document.getElementById('email-attachments-placeholder').textContent = "more than 100 per week";}
    else {document.getElementById('email-attachments-placeholder').textContent = "no answer";}

    var teamsMessages = document.getElementById('data-holder-teams-messages').textContent;
    if (teamsMessages == 25){document.getElementById('teams-messages-placeholder').textContent = "0 to 49 per week";}
    else if (teamsMessages == 75){document.getElementById('teams-messages-placeholder').textContent = "50 to 99 per week";}
    else if (teamsMessages == 125){document.getElementById('teams-messages-placeholder').textContent = "100 to 149 per week";}
    else if (teamsMessages == 175){document.getElementById('teams-messages-placeholder').textContent = "more than 150 per week";}
    else {document.getElementById('teams-messages-placeholder').textContent = "no answer";}

    var teamsHours = document.getElementById('data-holder-teams-hours').textContent;
    if (teamsHours == 2.5){document.getElementById('teams-calls-placeholder').textContent = "0 to 5 hours per week";}
    else if (teamsHours == 7.5){document.getElementById('teams-calls-placeholder').textContent = "6 to 10 hours per week";}
    else if (teamsHours == 12.5){document.getElementById('teams-calls-placeholder').textContent = "11 to 15 hours per week";}
    else if (teamsHours == 17.5){document.getElementById('teams-calls-placeholder').textContent = "more than 15 hours per week";}
    else {document.getElementById('teams-calls-placeholder').textContent = "no answer";}

    document.getElementById('camera-on-placeholder').textContent = document.getElementById('data-holder-teams-camera').textContent;

    var clearEmailFrequency = document.getElementById('data-holder-clear-emails').textContent;
    if (clearEmailFrequency == 0.25){document.getElementById('email-clear-placeholder').textContent = "weekly or less";}
    if (clearEmailFrequency == 1){document.getElementById('email-clear-placeholder').textContent = "monthly";}
    if (clearEmailFrequency == 3){document.getElementById('email-clear-placeholder').textContent = "quarterly";}
    if (clearEmailFrequency == 12){document.getElementById('email-clear-placeholder').textContent = "yearly";}
    if (clearEmailFrequency == 36){document.getElementById('email-clear-placeholder').textContent = "never";}
    else {document.getElementById('email-clear-placeholder').textContent = "no answer";}

    var clearOneDriveFrequency = document.getElementById('data-holder-clear-onedrive').textContent;
    if (clearOneDriveFrequency == 0.25){document.getElementById('onedrive-clear-placeholder').textContent = "weekly or less";}
    else if (clearOneDriveFrequency == 1){document.getElementById('onedrive-clear-placeholder').textContent = "monthly";}
    else if (clearOneDriveFrequency == 3){document.getElementById('onedrive-clear-placeholder').textContent = "quarterly";}
    else if (clearOneDriveFrequency == 12){document.getElementById('onedrive-clear-placeholder').textContent = "yearly";}
    else if (clearOneDriveFrequency == 36){document.getElementById('onedrive-clear-placeholder').textContent = "never";}
    else {document.getElementById('onedrive-clear-placeholder').textContent = "no answer";}

    var printingPerWeek = document.getElementById('data-holder-printing').textContent;
    if (printingPerWeek == 0){document.getElementById('printing-placeholder').textContent = "none";}
    else if (printingPerWeek == 15){document.getElementById('printing-placeholder').textContent = "1 to 30 pages per week";}
    else if (printingPerWeek == 45){document.getElementById('printing-placeholder').textContent = "31 to 60 pages per week";}
    else if (printingPerWeek == 80){document.getElementById('printing-placeholder').textContent = "61 to 100 pages per week";}
    else if (printingPerWeek == 120){document.getElementById('printing-placeholder').textContent = "more than 100 pages per week";}
    else {document.getElementById('printing-placeholder').textContent = "no answer";}

    document.getElementById('commute-mode-placeholder').textContent = document.getElementById('data-holder-commute-type').textContent;
    document.getElementById('same-return-placeholder').textContent = document.getElementById('data-holder-return-commute').textContent;
    
    if (document.getElementById('data-holder-return-commute').textContent == 'yes'){
        document.getElementById('return').style.display="none";
    }
    else{
        document.getElementById('return-mode-placeholder').textContent = document.getElementById('data-holder-return-commute-type').textContent;
    }

    document.getElementById('commute-frequency-placeholder').textContent = document.getElementById('data-holder-office-frequency').textContent + " days per week";
    document.getElementById('commute-distance-placeholder').textContent = document.getElementById('data-holder-commute-distance').textContent + " miles";
    document.getElementById('business-travel-frequency-placeholder').textContent = document.getElementById('data-holder-b-travel-frequency').textContent + " time(s) per month";
    if (document.getElementById('data-holder-b-travel-frequency').textContent == 0){
        document.getElementById('business-mode').style.display="none";
        document.getElementById('business-distance').style.display="none";
    } else {
        document.getElementById('business-travel-mode-placeholder').textContent = document.getElementById('data-holder-b-travel-mode').textContent;
        var btDistance = document.getElementById('data-holder-b-travel-distance').textContent;
        if (btDistance == 12.5){document.getElementById('business-travel-distance-placeholder').textContent = "0 to 25 miles";}
        else if (btDistance == 37.5){document.getElementById('business-travel-distance-placeholder').textContent = "25 to 50 miles";}
        else if (btDistance == 75){document.getElementById('business-travel-distance-placeholder').textContent = "50 to 100 miles";}
        else if (btDistance == 175){document.getElementById('business-travel-distance-placeholder').textContent = "100 to 250 miles";}
        else if (btDistance == 300){document.getElementById('business-travel-distance-placeholder').textContent = "more than 250 miles";}
    }
}


async function calculateLaptopCarbon(event){
    event.preventDefault();
    // Try to fetch factors.json file by calling to fetchFactors function
    try {
        factors = await fetchFactors();
    } catch {
        return;
    }



    // DEVICES
    // Laptop
    // Get laptop type from current HTML page
    var laptopType = document.getElementById("data-holder-laptop-type").textContent;

    if (laptopType == 'windows' || laptopType == 'macbook'){
        // Find the laptop emissions based on laptop type
        var laptopStats = factors.deviceFactors.laptop[laptopType];
        // Get laptop embodied and usage emissions and convert to strings
        var laptopLifetime = JSON.stringify(laptopStats['lifetimeEmissions']);
        //var laptopUsage = JSON.stringify(laptopStats['usagePerYear']);
        // Calculate total laptop emissions
        var laptopYearly = (+laptopLifetime/5);
    } else {
        var laptopYearly = 0;
    }

    // Desktop
    // For more detailed breakdown, see comments for Laptop above
    // Only calculates desktop value if user answered 'Yes' on page devices/desktop
    if(document.getElementById('data-holder-desktop').textContent == 'yes'){
        var desktopStats = factors.deviceFactors['desktop'];
        var desktopEmbodied = JSON.stringify(desktopStats['embodied']);
        var desktopUsage = JSON.stringify(desktopStats['usagePerYear']);
        var desktopTotal = (+desktopEmbodied/5) + +desktopUsage;
    } else{
        var desktopTotal = 0;
    }

    // Monitors
    // For more detailed breakdown, see comments for laptop above
    var numberMonitors = document.getElementById("data-holder-monitor-number").textContent;
    var monitorStats = factors.deviceFactors['monitor'];
    var monitorLifetime = JSON.stringify(monitorStats['lifetimeEmissions']);
    var monitorYearly = (+monitorLifetime / 5) * +numberMonitors;

    // Smartphone
    // For more detailed breakdown, see comments for Laptop above
    var smartphoneType = document.getElementById("data-holder-smartphone-type").textContent;
    if (smartphoneType == 'iphone' || smartphoneType == 'android'){
        var smartphoneStats = factors.deviceFactors.smartphone[smartphoneType];
        var smartphoneLifetime = JSON.stringify(smartphoneStats['lifetimeEmissions'])
        var smartphoneYearly = +smartphoneLifetime / 4;
    } else {
        var smartphoneYearly = 0;
    }

    // Total device emissions
    var totalDeviceEmissions = +laptopYearly + +desktopTotal + +monitorYearly + +smartphoneYearly;
    // Replace placeholder in html with newly calculated total emissions
    document.getElementById("total-device-emissions").textContent = totalDeviceEmissions.toFixed(2) + " kg CO2e";
    document.getElementById("total-device-emissions-monthly").textContent = (totalDeviceEmissions/12).toFixed(2) + " kg CO2e";

    // MESSAGING
    // Emails
    var numEmails = document.getElementById("data-holder-emails").textContent;
    var numAttachments = document.getElementById("data-holder-emails-attachments").textContent;
    var emailEmission = JSON.stringify(factors.emailFactors['email']);
    var attachmentEmission = JSON.stringify(factors.emailFactors['attachmentEmail']);
    var emailEmissionsWeekly = (+numEmails * +emailEmission) + (+numAttachments * +attachmentEmission);
    var emailEmissionsYearly = +emailEmissionsWeekly * 52;
    
    // Teams
    var teamsMessages = document.getElementById("data-holder-teams-messages").textContent;
    var teamsHours = document.getElementById("data-holder-teams-hours").textContent;
    var teamsMessageEmission = JSON.stringify(factors.teamsFactors['messages']);
    // Check whether user has camera on/off for calls and get relevant emission factor
    if (document.getElementById("data-holder-teams-camera").textContent == 'yes'){
        var teamsEmissionsHourly = JSON.stringify(factors.teamsFactors['videoCalls']);
    } else {
        var teamsEmissionsHourly = JSON.stringify(factors.teamsFactors['audioCalls']);
    }
    var teamsEmissionsWeekly = (+teamsMessages * +teamsMessageEmission) + (+teamsHours * +teamsEmissionsHourly);
    var teamsEmissionsYearly = +teamsEmissionsWeekly * 52;
    
    // Total messaging emissions
    var totalMessagingEmissions = +emailEmissionsYearly + +teamsEmissionsYearly;
    document.getElementById("messaging-emissions").textContent = totalMessagingEmissions.toFixed(2) + " kg CO2e";
    document.getElementById("messaging-emissions-monthly").textContent = (totalMessagingEmissions/12).toFixed(2) + " kg CO2e";


    // TRAVEL
       
    // Commuting
    var officeFrequency = document.getElementById("data-holder-office-frequency").textContent;


    if (officeFrequency > 0){
        var commuteType = document.getElementById("data-holder-commute-type").textContent;
        var commuteDistance = document.getElementById("data-holder-commute-distance").textContent;

        var sameReturn = document.getElementById("data-holder-return-commute").textContent;
        var returnType = document.getElementById("data-holder-return-commute-type").textContent;
        
        
        if (commuteType == 'car'){
            sameReturn = 'yes';
            var carSize = document.getElementById("data-holder-car-size").textContent;
            var carFuel = document.getElementById("data-holder-car-fuel").textContent;
            var carSizeFactor = factors.transportFactors.car[carSize];
            var commuteTypeFactor = JSON.stringify(carSizeFactor[carFuel]);
        } else if (commuteType == 'car share'){
            var carSize = document.getElementById("data-holder-car-size").textContent;
            var carFuel = document.getElementById("data-holder-car-fuel").textContent;
            var carSizeFactor = factors.transportFactors.car[carSize];
            var commuteTypeFactor = JSON.stringify(carSizeFactor[carFuel]);
            var commuteTypeFactor = +commuteTypeFactor / 2;
        } else{
            var commuteTypeFactor = JSON.stringify(factors.transportFactors[commuteType]);
        }


        var commuteWeeklyEmissions = +commuteTypeFactor * +commuteDistance * +officeFrequency;
        var commuteYearlyEmissions = +commuteWeeklyEmissions * 52;
        

        if (sameReturn == 'yes'){
            commuteYearlyEmissions = +commuteYearlyEmissions * 2;
        } else {
            if (returnType == 'car share'){
                var carSize = document.getElementById("data-holder-car-size").textContent;
                var carFuel = document.getElementById("data-holder-car-fuel").textContent;
                var carSizeFactor = factors.transportFactors.car[carSize];
                var returnCommuteTypeFactor = JSON.stringify(carSizeFactor[carFuel]);
                var returnCommuteTypeFactor = +returnCommuteTypeFactor / 2;
            } else {
                var returnCommuteTypeFactor = JSON.stringify(factors.transportFactors[returnType]);
            }
            var returnCommuteYearlyEmissions = (+returnCommuteTypeFactor * +commuteDistance * +officeFrequency) * 52;
            commuteYearlyEmissions = +commuteYearlyEmissions + +returnCommuteYearlyEmissions;
        }
    } else {
        var commuteYearlyEmissions = 0;
    }


    // Business travel
    var businessTravelFrequency = document.getElementById("data-holder-b-travel-frequency").textContent;

    if (businessTravelFrequency > 0){
        var businessTravelMode = document.getElementById("data-holder-b-travel-mode").textContent;
        var businessTravelDistance = document.getElementById("data-holder-b-travel-distance").textContent;
        if (businessTravelMode == 'car'){
            var carSize = document.getElementById("data-holder-business-car-size").textContent;
            var carFuel = document.getElementById("data-holder-business-car-fuel").textContent;
            carSizeFactor = factors.transportFactors.car[carSize];
            var transportFactor = JSON.stringify(carSizeFactor[carFuel]);
        } else{
            var transportFactor = JSON.stringify(factors.transportFactors[businessTravelMode]);
        }
        var businessTravelEmissionsMonthly = +businessTravelFrequency * +businessTravelDistance * +transportFactor;
        var businessTravelEmissionsYearly = +businessTravelEmissionsMonthly * 12;
    } else {
        var businessTravelEmissionsYearly = 0;
    }
 
    // Total travel emissions
    var totalTravelEmissions = +businessTravelEmissionsYearly + +commuteYearlyEmissions;
    document.getElementById("travel-emissions").textContent = totalTravelEmissions.toFixed(2) + " kg CO2e";
    document.getElementById("travel-emissions-monthly").textContent = (totalTravelEmissions/12).toFixed(2) + " kg CO2e";


    // DATA STORAGE
    // Printing
    var printingFrequency = document.getElementById("data-holder-printing").textContent;
    var printingEmissions = JSON.stringify(factors.printingFactors['perPage']);
    var totalPrintingEmissionsWeekly = +printingFrequency * +printingEmissions;
    var totalPrintingEmissionsYearly = +totalPrintingEmissionsWeekly * 52;
    
    // Cloud storage
    var clearEmailFrequency = document.getElementById("data-holder-clear-emails").textContent;
    var clearOneDriveFrequency = document.getElementById("data-holder-clear-onedrive").textContent;
    var emailStorageEmission = JSON.stringify(factors.cloudStorageFactors['emailClearedMonthly']);
    var oneDriveStorageEmission = JSON.stringify(factors.cloudStorageFactors['oneDriveClearedMonthly']);
    var storageEmissionsYearly = (+clearEmailFrequency * +emailStorageEmission) + 
    (+clearOneDriveFrequency * +oneDriveStorageEmission);
    
    // Total data storage
    var totalDataStorageEmissions = +totalPrintingEmissionsYearly + +storageEmissionsYearly;
    document.getElementById("total-data-storage-emissions").textContent = totalDataStorageEmissions.toFixed(2) + " kg CO2e";
    document.getElementById("total-data-storage-emissions-monthly").textContent = (totalDataStorageEmissions/12).toFixed(2) + " kg CO2e";

    
    // RESULTS
    // Total emissions
    var totalEmissions = +totalDeviceEmissions + +emailEmissionsYearly + +teamsEmissionsYearly +
     +businessTravelEmissionsYearly + +totalPrintingEmissionsYearly + +commuteYearlyEmissions + +storageEmissionsYearly;
    document.getElementById("total-emissions").textContent = totalEmissions.toFixed(2) + " kg CO2e";
    document.getElementById("total-emissions-monthly").textContent = (totalEmissions/12).toFixed(2) + " kg CO2e";

    // Percentage calculations
    document.getElementById("device-percentage").textContent = ((+totalDeviceEmissions/+totalEmissions)*100).toFixed(2) + "%";
    document.getElementById("messaging-percentage").textContent = ((+totalMessagingEmissions/+totalEmissions)*100).toFixed(2) + "%";
    document.getElementById("travel-percentage").textContent = ((+totalTravelEmissions/+totalEmissions)*100).toFixed(2) + "%";
    document.getElementById("data-percentage").textContent = ((+totalDataStorageEmissions/+totalEmissions)*100).toFixed(2) + "%";

    document.getElementById("device-percentage-monthly").textContent = ((+totalDeviceEmissions/+totalEmissions)*100).toFixed(2) + "%";
    document.getElementById("messaging-percentage-monthly").textContent = ((+totalMessagingEmissions/+totalEmissions)*100).toFixed(2) + "%";
    document.getElementById("travel-percentage-monthly").textContent = ((+totalTravelEmissions/+totalEmissions)*100).toFixed(2) + "%";
    document.getElementById("data-percentage-monthly").textContent = ((+totalDataStorageEmissions/+totalEmissions)*100).toFixed(2) + "%";

    // Tea calculation
    var teaCarbon = 0.021;
    var teaTotal = +totalEmissions/+teaCarbon;
    document.getElementById("tea").textContent = teaTotal.toFixed(0) + " cups of tea";
    document.getElementById("tea-monthly").textContent = (teaTotal/12).toFixed(0) + " cups of tea";


    if (totalEmissions < 500){
        var persona = "eco-champion-img";  
        var personaTitle = "Eco Champion";
        var personaDescription = "You’re the best of the best! The crème de la crème! The eco champion! You do so much for the earth, you’re deeply committed to the environment and the preservation of our planet. You make conscious decisions at every turn to reduce your carbon footprint, and we can’t thank you enough for that!";
        var personaImprovements = "Spread your positive habits by taking part in workplace sustainability initiatives. Encourage teammates and colleagues to reduce their carbon footprint by taking public transport to work or switching off any unneeded equipment such as extra monitors.";
    }
    if (totalEmissions >= 500 && totalEmissions < 1200){
        var persona = "green-advocate-img";
        var personaTitle = "Green Advocate";
        var personaDescription = "Good job! You’ve made some great strides towards reducing your carbon footprint. If everyone could be more like you, then we’d be well on our way to resolving this climate emergency!";
        var personaImprovements = "Try challenging yourself to attempting 1 new sustainable habit every month, such as cycling to work instead of getting the bus for a week, or bringing your own lunch to work instead of buying it from the canteen.";
    }
    if (totalEmissions >= 1200 && totalEmissions < 2000){
        var persona = "environmentally-curious-img";
        var personaTitle = "Environmentally curious";
        var personaDescription = "We’re glad you’re interested! Making sustainable changes to your lifestyle can seem overwhelming, but it’s much easier than it seems! All you have to do to start is make 1 small change, and then when you’re comfortable with that make another small change, and so on and so on.";
        var personaImprovements = "Try taking public transport to work instead of driving. Try turning off devices such as monitors when you’re not using them. Try saving documents digitally instead of printing off.";
    }
    if (totalEmissions >= 2000){
        var persona = "carbon-heavyweight-img";
        var personaTitle = "Carbon Heavyweight";
        var personaDescription = "Wow! Your carbon footprint is hefty! While we understand that not everyone can control all aspects of their carbon footprint, it would be great if you could try to make some small changes for the planet.";
        var personaImprovements = "Turn off devices such as laptop and monitors at the end of the work day. Take public transport to work instead of driving. Next time you’re buying a new car, consider going for an electric vehicle. Use a reuseable water bottle instead of buying disposable.";
    }

    document.getElementById(persona).style.display = '';
    document.getElementById("persona-title").textContent = personaTitle;
    document.getElementById("persona-description").textContent = personaDescription;
    document.getElementById("persona-improvements").textContent = personaImprovements;



    // Driving calculation
    if (totalEmissions > 150){
        var averagePetrolCarbon = 0.26364;
        var drivingEquivalent = totalEmissions/averagePetrolCarbon;
        document.getElementById("driving").textContent = "Driving the average petrol car " 
        + drivingEquivalent.toFixed(0) + " miles. Or driving from London to ";
        drivingEquivalent = Math.ceil(drivingEquivalent/100)*100;

        if (drivingEquivalent < 2200) { var diviser = 1; var repeatText = "." }
        if (drivingEquivalent > 2100 && drivingEquivalent < 4300) { var diviser = 2; var repeatText = " and back again." }
        if (drivingEquivalent > 4200 && drivingEquivalent < 8500) { var diviser = 4; var repeatText = " and back again, twice." }
        if (drivingEquivalent > 8400 && drivingEquivalent < 16900) { var diviser = 8; var repeatText = " and back again, four times." }
        if (drivingEquivalent > 16800 && drivingEquivalent < 33600) {var diviser = 16; var repeatText = " and back again, eight times." }

        drivingEquivalent = +drivingEquivalent/diviser;
        drivingEquivalent = Math.ceil(drivingEquivalent/100)*100;
        var country = JSON.stringify(factors.drivingDistances[drivingEquivalent]);
        var country = country.replace(/"/g, "");
        document.getElementById("driving").textContent += country + repeatText;

        document.getElementById("driving-shortened").textContent = "Driving " + drivingEquivalent.toFixed(0) + " miles in a petrol car";
    }

    // Ice/water calculation
    var icePerKilo = 15;
    var iceAmount = totalEmissions * icePerKilo;
    var lifeTimeIce = iceAmount * 50;
    var lifeTimeTons = lifeTimeIce/1000;
    document.getElementById("ice").textContent = "This amount of CO2 will melt " + iceAmount.toFixed(0) + "KG of glacial ice." +
    " Extrapolate this over ~50 years of working, and this would be " + lifeTimeTons.toFixed(0) + " tons of glacial ice melted. To put this into perspective, " + 
    "a double-decker bus weighs about 12 tons, so you would be melting the same weight in ice as " + (lifeTimeTons/12).toFixed(0) + " double-decker buses.";

    document.getElementById("ice-shortened").textContent = "Melting " + iceAmount.toFixed(0) + "kg of glacial ice"

    // Coal calculation
    var cO2PerCoal = 3.3;
    var coalAmount = totalEmissions/cO2PerCoal;

    document.getElementById("coal").textContent = "Burning " + coalAmount.toFixed(0) + "kg of coal"
}


