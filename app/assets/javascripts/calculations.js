
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
    //var monitorEmbodied = JSON.stringify(monitorStats['embodied']);
    //var monitorUsage = JSON.stringify(monitorStats['usagePerYear']);
    //var monitorTotal = ((+monitorEmbodied/5) + +monitorUsage) * +numberMonitors;
    var monitorYearly = (+monitorLifetime / 5) * +numberMonitors;

    // Smartphone
    // For more detailed breakdown, see comments for Laptop above
    var smartphoneType = document.getElementById("data-holder-smartphone-type").textContent;
    if (smartphoneType == 'iphone' || smartphoneType == 'android'){
        var smartphoneStats = factors.deviceFactors.smartphone[smartphoneType];
        var smartphoneLifetime = JSON.stringify(smartphoneStats['lifetimeEmissions'])
        //var smartphoneEmbodied = JSON.stringify(smartphoneStats['embodied']);
        //var smartphoneUsage = JSON.stringify(smartphoneStats['usagePerYear']);
        //var smartphoneTotal = (+smartphoneEmbodied/5) + +smartphoneUsage;
        var smartphoneYearly = +smartphoneLifetime / 4;
    } else {
        var smartphoneYearly = 0;
    }

    // Total device emissions
    var totalDeviceEmissions = +laptopYearly + +desktopTotal + +monitorYearly + +smartphoneYearly;
    // Replace placeholder in html with newly calculated total emissions
    document.getElementById("total-device-emissions").textContent = totalDeviceEmissions.toFixed(2) + " kg CO2e";


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


    // TRAVEL
    // Business travel
    var businessTravelFrequency = document.getElementById("data-holder-b-travel-frequency").textContent;

    if (businessTravelFrequency > 0){
        var businessTravelMode = document.getElementById("data-holder-b-travel-mode").textContent;
        var businessTravelDistance = document.getElementById("data-holder-b-travel-distance").textContent;

        if (businessTravelMode == 'car'){
            var carSize = document.getElementById("data-holder-car-size").textContent;
            var carFuel = document.getElementById("data-holder-car-fuel").textContent;
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
    
    // Commuting
    var officeFrequency = document.getElementById("data-holder-office-frequency").textContent;

    if (officeFrequency > 0){
        var commuteType = document.getElementById("data-holder-commute-type").textContent;
        var commuteDistance = document.getElementById("data-holder-commute-distance").textContent;
        
        if (commuteType == 'car'){
            var carSize = document.getElementById("data-holder-car-size").textContent;
            var carFuel = document.getElementById("data-holder-car-fuel").textContent;
            carSizeFactor = factors.transportFactors.car[carSize];
            var commuteTypeFactor = JSON.stringify(carSizeFactor[carFuel]);
        } else{
            var commuteTypeFactor = JSON.stringify(factors.transportFactors[commuteType]);
        }

        var commuteWeeklyEmissions = +commuteTypeFactor * +commuteDistance * +officeFrequency;
        var commuteYearlyEmissions = +commuteWeeklyEmissions * 52;
    } else {
        var commuteYearlyEmissions = 0;
    }




    // Total travel emissions
    var totalTravelEmissions = +businessTravelEmissionsYearly + +commuteYearlyEmissions;
    document.getElementById("travel-emissions").textContent = totalTravelEmissions.toFixed(2) + " kg CO2e";


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

    
    // RESULTS
    // Total emissions
    var totalEmissions = +totalDeviceEmissions + +emailEmissionsYearly + +teamsEmissionsYearly +
     +businessTravelEmissionsYearly + +totalPrintingEmissionsYearly + +commuteYearlyEmissions + +storageEmissionsYearly;
    document.getElementById("total-emissions").textContent = totalEmissions.toFixed(2) + " kg CO2e";

    // Tea calculation
    var teaCarbon = 0.021;
    var teaTotal = +totalEmissions/+teaCarbon;
    document.getElementById("tea").textContent = "This is the equivalent of making " + teaTotal.toFixed(0) + " cups of tea."


    // Tree calculation
    var treeCarbon = 22;
    var treesPerAcre = 500;
    var treeEquivalent = totalEmissions/treeCarbon;
    var acresEquivalent = treeEquivalent/treesPerAcre;
    if (acresEquivalent > 0.1){
        var acresText = ", or " + acresEquivalent.toFixed(2) + " acres of forest";
    } else {
        var acresText = "";
    }
    document.getElementById("trees").textContent = "This is the amount of carbon that " + treeEquivalent.toFixed(0) + 
    " mature trees absorb in a year" + acresText;

    // Driving calculation
    if (totalEmissions > 150){
        var averagePetrolCarbon = 0.26364;
        var drivingEquivalent = totalEmissions/averagePetrolCarbon;
        document.getElementById("driving").textContent = "This is the amount of carbon produced by driving the average petrol car " 
        + drivingEquivalent.toFixed(0) + " miles. Or driving from London to ";
        drivingEquivalent = Math.ceil(drivingEquivalent/100)*100;
        if (drivingEquivalent < 2200){
            var country = JSON.stringify(factors.drivingDistances[drivingEquivalent]);
            var country = country.replace(/"/g, "");
            document.getElementById("driving").textContent += country + ".";
        } if (drivingEquivalent > 2100 && drivingEquivalent < 4300){
            drivingEquivalent = +drivingEquivalent/2;
            drivingEquivalent = Math.ceil(drivingEquivalent/100)*100;
            var country = JSON.stringify(factors.drivingDistances[drivingEquivalent]);
            var country = country.replace(/"/g, "");
            document.getElementById("driving").textContent += country + " and back again.";
        } if (drivingEquivalent > 4200 && drivingEquivalent < 8500){
            drivingEquivalent = +drivingEquivalent/4;
            drivingEquivalent = Math.ceil(drivingEquivalent/100)*100;
            var country = JSON.stringify(factors.drivingDistances[drivingEquivalent]);
            var country = country.replace(/"/g, "");
            document.getElementById("driving").textContent += country + " and back again twice.";
        } if (drivingEquivalent > 8400 && drivingEquivalent < 16800){
            drivingEquivalent = +drivingEquivalent/8;
            drivingEquivalent = Math.ceil(drivingEquivalent/100)*100;
            var country = JSON.stringify(factors.drivingDistances[drivingEquivalent]);
            var country = country.replace(/"/g, "");
            document.getElementById("driving").textContent += country + " and back again four times.";
        }
    }

    // Percentage calculations
    document.getElementById("device-percentage").textContent = ((+totalDeviceEmissions/+totalEmissions)*100).toFixed(2) + "%";
    document.getElementById("messaging-percentage").textContent = ((+totalMessagingEmissions/+totalEmissions)*100).toFixed(2) + "%";
    document.getElementById("travel-percentage").textContent = ((+totalTravelEmissions/+totalEmissions)*100).toFixed(2) + "%";
    document.getElementById("data-percentage").textContent = ((+totalDataStorageEmissions/+totalEmissions)*100).toFixed(2) + "%";

    // Create pie charts
    const ctx = document.getElementById('emissions-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [
                'Device Emissions',
                'Email Usage',
                'Teams Usage',
                'Printing',
                'Data Storage'
            ],
            datasets: [{
                data: [
                    totalDeviceEmissions,
                    emailEmissionsYearly,
                    teamsEmissionsYearly,
                    totalPrintingEmissionsYearly,
                    storageEmissionsYearly
                ],
                backgroundColor: [
                    'rgba(140, 198, 63, 0.2)',
                    'rgba(81, 49, 132, 0.2)',
                    'rgba(193, 38, 55, 0.2)',
                    'rgba(0, 99, 1, 0.2)',
                    'rgba(224, 82, 6, 0.2)'
                ],
                borderColor: [
                    'rgba(140, 198, 63, 0.6)',
                    'rgba(81, 49, 132, 0.6)',
                    'rgba(193, 38, 55, 0.6)',
                    'rgba(0, 99, 1, 0.6)',
                    'rgba(224, 82, 6, 0.6)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + ' kg CO2e';
                        }
                    }
                }
            }
        }
    });

    const ctx2 = document.getElementById('emissions-chart-2').getContext('2d');
    new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: [
                'Business Travel',
                'Commuting'
            ],
            datasets: [{
                data: [
                    businessTravelEmissionsYearly,
                    commuteYearlyEmissions
                ],
                backgroundColor: [
                    'rgba(0, 192, 181, 0.2)',
                    'rgba(169, 0, 97, 0.2)',
                ],
                borderColor: [
                    'rgba(0, 192, 181, 0.6)',
                    'rgba(169, 0, 97, 0.6)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + ' kg CO2e';
                        }
                    }
                }
            }
        }
    });
    /*
    var averageDevice = 200.00;
    var averageEmail = 80;
    var averageTeams = 100;
    var averagePrinting = 15;
    var averageData = 100;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Device Emissions',
                'Email Usage',
                'Teams Usage',
                'Printing',
                'Data Storage'
            ],
            datasets: [{
                label: "Your emissions",
                data: [
                    totalDeviceEmissions,
                    emailEmissionsYearly,
                    teamsEmissionsYearly,
                    totalPrintingEmissionsYearly,
                    storageEmissionsYearly
                ],
                backgroundColor: [
                    'rgba(0, 114, 143, 0.6)'
                ],
                borderColor: [
                    'rgba(0, 114, 143, 1)'
                ],
                borderWidth: 1
            },
            {
                label: "Average emissions",
                data: [
                    averageDevice,
                    averageEmail,
                    averageTeams,
                    averagePrinting,
                    averageData
                ],
                backgroundColor: [
                    'rgba(173, 173, 173, 0.5)'
                ],
                borderColor: [
                    'rgba(173, 173, 173, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + ' kg CO2e';
                        }
                    }
                }
            }
        }
    });
    */
}