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

async function checkAnswers(event){
    event.preventDefault();
    // Try to fetch factors.json file by calling to fetchFactors function
    try {
        factors = await fetchFactors();
    } catch {
        return;
    }

    // Get user-inputted data, remove quotation marks, and display 'no answer' if user didn't answer the question
    var emailAmount = document.getElementById('data-holder-emails').textContent;
    try{
        document.getElementById('emails-placeholder').textContent = (JSON.stringify(factors.emailCheckAnswers[emailAmount])).replace(/"/g, "");
    } catch {
        document.getElementById('emails-placeholder').textContent = "no answer";
    }

    var attachmentsAmount = document.getElementById('data-holder-emails-attachments').textContent;
    try{
        document.getElementById('email-attachments-placeholder').textContent = (JSON.stringify(factors.emailCheckAnswers[attachmentsAmount])).replace(/"/g, "");
    } catch {
        document.getElementById('email-attachments-placeholder').textContent = "no answer";
    }

    var teamsMessages = document.getElementById('data-holder-teams-messages').textContent;
    try {
        document.getElementById('teams-messages-placeholder').textContent = (JSON.stringify(factors.teamsCheckAnswers[teamsMessages])).replace(/"/g, "");
    } catch {
        document.getElementById('teams-messages-placeholder').textContent = "no answer";
    }

    var teamsHours = document.getElementById('data-holder-teams-hours').textContent;
    try {
        document.getElementById('teams-calls-placeholder').textContent = (JSON.stringify(factors.teamsCheckAnswers[teamsHours])).replace(/"/g, "");
    } catch {
        document.getElementById('teams-calls-placeholder').textContent = "no answer";
    }

    if (document.getElementById('data-holder-teams-camera').textContent == 'yes' || document.getElementById('data-holder-teams-camera').textContent == 'no' || document.getElementById('data-holder-teams-camera').textContent == 'sometimes'){
        document.getElementById('camera-on-placeholder').textContent = document.getElementById('data-holder-teams-camera').textContent;
    } else {
        document.getElementById('camera-on-placeholder').textContent = "no answer";
    }

    var clearEmailFrequency = document.getElementById('data-holder-clear-emails').textContent;
    try {
        document.getElementById('email-clear-placeholder').textContent = (JSON.stringify(factors.clearCheckAnswers[clearEmailFrequency])).replace(/"/g, "");
    } catch {
        document.getElementById('email-clear-placeholder').textContent = "no answer";
    }

    var clearOneDriveFrequency = document.getElementById('data-holder-clear-onedrive').textContent;
    try {
        document.getElementById('onedrive-clear-placeholder').textContent = (JSON.stringify(factors.clearCheckAnswers[clearOneDriveFrequency])).replace(/"/g, "");
    } catch {
        document.getElementById('onedrive-clear-placeholder').textContent = "no answer";
    }

    var printingPerWeek = document.getElementById('data-holder-printing').textContent;
    try {
        document.getElementById('printing-placeholder').textContent = (JSON.stringify(factors.printingCheckAnswers[printingPerWeek])).replace(/"/g, "");
    } catch {
        document.getElementById('printing-placeholder').textContent = "no answer";
    }

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
        try {
            document.getElementById('business-travel-distance-placeholder').textContent = btDistance + " mile(s)";
        } catch {
            document.getElementById('business-travel-distance-placeholder').textContent = "no answer"
        }
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
        var laptopLifetimeEmissions = JSON.stringify(laptopStats['lifetimeEmissions']);
        //var laptopUsage = JSON.stringify(laptopStats['usagePerYear']);
        // Calculate total laptop emissions
        var laptopYearlyEmissions = (+laptopLifetimeEmissions/5);
    } else {
        var laptopYearlyEmissions = 0;
    }

    // Desktop
    // For more detailed breakdown, see comments for Laptop above
    // Only calculates desktop value if user answered 'Yes' on page devices/desktop
    if(document.getElementById('data-holder-desktop').textContent == 'yes'){
        var desktopStats = factors.deviceFactors['desktop'];
        var desktopEmbodied = JSON.stringify(desktopStats['embodied']);
        var desktopUsage = JSON.stringify(desktopStats['usagePerYear']);
        var desktopYearlyEmissions = (+desktopEmbodied/5) + +desktopUsage;
    } else{
        var desktopYearlyEmissions = 0;
    }

    // Monitors
    // For more detailed breakdown, see comments for laptop above
    var numberMonitors = document.getElementById("data-holder-monitor-number").textContent;
    var monitorStats = factors.deviceFactors['monitor'];
    var monitorLifetimeEmissions = JSON.stringify(monitorStats['lifetimeEmissions']);
    var monitorYearlyEmissions = (+monitorLifetimeEmissions / 5) * +numberMonitors;

    // Smartphone
    // For more detailed breakdown, see comments for Laptop above
    var smartphoneType = document.getElementById("data-holder-smartphone-type").textContent;
    if (smartphoneType == 'iphone' || smartphoneType == 'android'){
        var smartphoneStats = factors.deviceFactors.smartphone[smartphoneType];
        var smartphoneLifetimeEmissions = JSON.stringify(smartphoneStats['lifetimeEmissions'])
        var smartphoneYearlyEmissions = +smartphoneLifetimeEmissions / 4;
    } else {
        var smartphoneYearlyEmissions = 0;
    }

    // Total device emissions
    var totalDeviceEmissions = +laptopYearlyEmissions + +desktopYearlyEmissions + +monitorYearlyEmissions + +smartphoneYearlyEmissions;
    // Replace placeholder in html with newly calculated total emissions
    document.getElementById("total-device-emissions").textContent = totalDeviceEmissions.toFixed(2) + " kg CO2e";
    document.getElementById("total-device-emissions-monthly").textContent = (totalDeviceEmissions/12).toFixed(2) + " kg CO2e";

    // MESSAGING
    // Emails
    var numEmails = document.getElementById("data-holder-emails").textContent;
    var numAttachments = document.getElementById("data-holder-emails-attachments").textContent;
    var emailEmission = JSON.stringify(factors.emailFactors['email']);
    var attachmentEmission = JSON.stringify(factors.emailFactors['attachmentEmail']);
    var emailYearlyEmissions = (((+numEmails * +emailEmission) + (+numAttachments * +attachmentEmission))) * 52;

    // Teams
    var teamsMessages = document.getElementById("data-holder-teams-messages").textContent;
    var teamsHours = document.getElementById("data-holder-teams-hours").textContent;
    var teamsMessageEmission = JSON.stringify(factors.teamsFactors['messages']);
    // Check whether user has camera on/off for calls and get relevant emission factor
    if (document.getElementById("data-holder-teams-camera").textContent == 'yes' || document.getElementById("data-holder-teams-camera").textContent == 'sometimes'){
        var teamsEmissionsHourly = JSON.stringify(factors.teamsFactors['videoCalls']);
        if (document.getElementById("data-holder-teams-camera").textContent == 'sometimes'){
            var teamsEmissionsHourly = 0.081315;
        }
    } else {
        var teamsEmissionsHourly = JSON.stringify(factors.teamsFactors['audioCalls']);
    }
    var teamsYearlyEmissions = (((+teamsMessages * +teamsMessageEmission) + (+teamsHours * +teamsEmissionsHourly))) * 52;

    // Total messaging emissions
    var totalMessagingEmissions = +emailYearlyEmissions + +teamsYearlyEmissions;
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
            // Assumption that if user commutes to work in a car, they also return in a car
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
            // If no car is used, get transport emission factors as usual
            var commuteTypeFactor = JSON.stringify(factors.transportFactors[commuteType]);
        }

        var commuteWeeklyEmissions = +commuteTypeFactor * +commuteDistance * +officeFrequency;
        var commuteYearlyEmissions = +commuteWeeklyEmissions * 52;

        if (sameReturn == 'yes'){
            // If return commute is the same, yearly emission is doubled
            commuteYearlyEmissions = +commuteYearlyEmissions * 2;
        } else {
            // If return commute is different, check if it is a car share (same as before) and calculate as usual.
            if (returnType == 'car share'){
                var carSize = document.getElementById("data-holder-car-size").textContent;
                var carFuel = document.getElementById("data-holder-car-fuel").textContent;
                var carSizeFactor = factors.transportFactors.car[carSize];
                var returnCommuteTypeFactor = JSON.stringify(carSizeFactor[carFuel]);
                var returnCommuteTypeFactor = +returnCommuteTypeFactor / 2;
            } else {
                var returnCommuteTypeFactor = JSON.stringify(factors.transportFactors[returnType]);
            }
            // Add together emissions for commute to and from work
            var returnCommuteYearlyEmissions = (+returnCommuteTypeFactor * +commuteDistance * +officeFrequency) * 52;
            commuteYearlyEmissions = +commuteYearlyEmissions + +returnCommuteYearlyEmissions;
        }
    } else {
        var commuteYearlyEmissions = 0;
    }


    // Business travel
    // Business travel calculation is largely the same as commuting calculation, as seen above
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
    // var clearEmailFrequency = document.getElementById("data-holder-clear-emails").textContent;
    // var clearOneDriveFrequency = document.getElementById("data-holder-clear-onedrive").textContent;
    // var emailStorageEmission = JSON.stringify(factors.cloudStorageFactors['emailClearedMonthly']);
    // var oneDriveStorageEmission = JSON.stringify(factors.cloudStorageFactors['oneDriveClearedMonthly']);
    // var storageEmissionsYearly = (+clearEmailFrequency * +emailStorageEmission) +
    // (+clearOneDriveFrequency * +oneDriveStorageEmission);

    // Email storage
    var clearEmailFrequency = document.getElementById("data-holder-clear-emails").textContent;
    var gbGramsPerHour = JSON.stringify(factors.cloudStorageFactors['gbGramsPerHour']);

    var inboxNum = numEmails * 2;
    var monthlyEmails = inboxNum * 5 * 4;
    // Inbox size in KB (assuming average email is 100KB)
    var monthlyInboxSize = monthlyEmails * 100;
    // Inbox size in GB
    var monthlyInboxSizeGB = monthlyInboxSize / 1000000;
    var averageInboxSize = monthlyInboxSizeGB * clearEmailFrequency;
    var emailStorageEmissions = ((averageInboxSize * gbGramsPerHour * 24 * 365.25) / 1000) / 2 ;

    // OneDrive storage
    var clearOneDriveFrequency = document.getElementById("data-holder-clear-onedrive").textContent;
    // Assumed OneDrive size - 1GB
    averageOneDriveSize = 1 * clearOneDriveFrequency;
    var oneDriveStorageEmissions = ((averageOneDriveSize * gbGramsPerHour * 24 * 365) / 1000) / 2;

    var storageEmissionsYearly = +emailStorageEmissions + +oneDriveStorageEmissions;



    // Total data storage
    var totalDataStorageEmissions = +totalPrintingEmissionsYearly + +storageEmissionsYearly;
    document.getElementById("total-data-storage-emissions").textContent = totalDataStorageEmissions.toFixed(2) + " kg CO2e";
    document.getElementById("total-data-storage-emissions-monthly").textContent = (totalDataStorageEmissions/12).toFixed(2) + " kg CO2e";


    // RESULTS
    // Total emissions
    var totalEmissions = +totalDeviceEmissions + +emailYearlyEmissions + +teamsYearlyEmissions +
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

    // RATING SYSTEM
    // Devices rating
    if (totalDeviceEmissions <= 150){
        var deviceRating = 1;
    }
    if (totalDeviceEmissions > 150 && totalDeviceEmissions <= 250){
        var deviceRating = 2;
    }
    if (totalDeviceEmissions > 250 && totalDeviceEmissions <= 350){
        var deviceRating = 3;
    }
    if (totalDeviceEmissions > 350){
        var deviceRating = 4;
    }

    // Messaging rating
    if (totalMessagingEmissions <= 70){
        var messagingRating = 1;
    }
    if (totalMessagingEmissions > 70 && totalMessagingEmissions <= 100){
        var messagingRating = 2;
    }
    if (totalMessagingEmissions > 100 && totalMessagingEmissions <= 140){
        var messagingRating = 3;
    }
    if (totalMessagingEmissions > 140){
        var messagingRating = 4;
    }

    // Data storage rating
    if (totalDataStorageEmissions <= 15){
        var storageRating = 1;
    }
    if (totalDataStorageEmissions > 15 && totalDataStorageEmissions <= 30){
        var storageRating = 2;
    }
    if (totalDataStorageEmissions > 30 && totalDataStorageEmissions <= 50){
        var storageRating = 3;
    }
    if (totalDataStorageEmissions > 50){
        var storageRating = 4;
    }

    // Travel rating
    if (totalTravelEmissions <= 50){
        var travelRating = 1;
    }
    if (totalTravelEmissions > 50 && totalTravelEmissions <= 100){
        var travelRating = 2;
    }
    if (totalTravelEmissions > 100 && totalTravelEmissions <= 200){
        var travelRating = 3;
    }
    if (totalTravelEmissions > 200){
        var travelRating = 4;
    }

    // Overall rating
    var overallRating = (+deviceRating + +messagingRating + +storageRating + +travelRating)/4;
    //document.getElementById('user-score').textContent = "Your eco-rating: " + overallRating;

    if (overallRating <= 1.75){
        var persona = "eco-champion-img";
        var personaTitle = "Eco Champion";
        var personaDescription = "You’re the best of the best! The crème de la crème! The eco champion! You do so much for the earth, you’re deeply committed to the environment and the preservation of our planet. You make conscious decisions at every turn to reduce your carbon footprint, and we can’t thank you enough for that!";
        var personaImprovements = "Spread your positive habits by taking part in workplace sustainability initiatives. Encourage teammates and colleagues to reduce their carbon footprint by taking public transport to work or switching off any unneeded equipment such as extra monitors.";
    }
    if (overallRating > 1.75 && overallRating <= 2.5){
        var persona = "green-advocate-img";
        var personaTitle = "Green Advocate";
        var personaDescription = "Good job! You’ve made some great strides towards reducing your carbon footprint. If everyone could be more like you, then we’d be well on our way to resolving this climate emergency!";
        var personaImprovements = "Try challenging yourself to attempting 1 new sustainable habit every month, such as cycling to work instead of getting the bus for a week, or bringing your own lunch to work instead of buying it from the canteen.";
    }
    if (overallRating > 2.5 && overallRating <= 3.25){
        var persona = "environmentally-curious-img";
        var personaTitle = "Environmentally curious";
        var personaDescription = "We’re glad you’re interested! Making sustainable changes to your lifestyle can seem overwhelming, but it’s much easier than it seems! All you have to do to start is make 1 small change, and then when you’re comfortable with that make another small change, and so on and so on.";
        var personaImprovements = "Try taking public transport to work instead of driving. Try turning off devices such as monitors when you’re not using them. Try saving documents digitally instead of printing off.";
    }
    if (overallRating > 3.25){
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
