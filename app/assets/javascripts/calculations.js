
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
    // Find the laptop emissions based on laptop type
    var laptopStats = factors.deviceFactors.laptop[laptopType];
    // Get laptop embodied and usage emissions and convert to strings
    var laptopEmbodied = JSON.stringify(laptopStats['embodied']);
    var laptopUsage = JSON.stringify(laptopStats['usagePerYear']);
    // Calculate total laptop emissions
    var laptopTotal = (+laptopEmbodied/5) + +laptopUsage;

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
    var monitorEmbodied = JSON.stringify(monitorStats['embodied']);
    var monitorUsage = JSON.stringify(monitorStats['usagePerYear']);
    var monitorTotal = ((+monitorEmbodied/5) + +monitorUsage) * +numberMonitors;
         
    // Smartphone
    // For more detailed breakdown, see comments for Laptop above
    var smartphoneType = document.getElementById("data-holder-smartphone-type").textContent;
    var smartphoneStats = factors.deviceFactors.smartphone[smartphoneType];
    var smartphoneEmbodied = JSON.stringify(smartphoneStats['embodied']);
    var smartphoneUsage = JSON.stringify(smartphoneStats['usagePerYear']);
    var smartphoneTotal = (+smartphoneEmbodied/5) + +smartphoneUsage;

    // Total device emissions
    var totalDeviceEmissions = +laptopTotal + +desktopTotal + +monitorTotal + +smartphoneTotal;
    // Replace placeholder in html with newly calculated total emissions
    document.getElementById("total-device-emissions").textContent=totalDeviceEmissions.toFixed(2) + " kg CO2e";


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
    var teamsEmissionsHourly = JSON.stringify(factors.teamsFactors['calls']);
    var teamsEmissionsWeekly = (+teamsMessages * +teamsMessageEmission) + (+teamsHours * +teamsEmissionsHourly);
    var teamsEmissionsYearly = +teamsEmissionsWeekly * 52;
    
    // Total messaging emissions
    var totalMessagingEmissions = +emailEmissionsYearly + +teamsEmissionsYearly;
    document.getElementById("messaging-emissions").textContent=totalMessagingEmissions.toFixed(2) + " kg CO2e";


    // TRAVEL
    // Business travel
    var businessTravelFrequency = document.getElementById("data-holder-b-travel-frequency").textContent;
    var businessTravelMode = document.getElementById("data-holder-b-travel-mode").textContent;
    var businessTravelDistance = document.getElementById("data-holder-b-travel-distance").textContent;
    var transportFactor = JSON.stringify(factors.transportFactors[businessTravelMode]);
    var businessTravelEmissionsMonthly = +businessTravelFrequency * +businessTravelDistance * +transportFactor;
    var businessTravelEmissionsYearly = +businessTravelEmissionsMonthly * 12;
    
    // Commuting
    var officeFrequency = document.getElementById("data-holder-office-frequency").textContent;
    var commuteType = document.getElementById("data-holder-commute-type").textContent;
    var commuteDistance = document.getElementById("data-holder-commute-distance").textContent;
    var commuteTypeFactor = JSON.stringify(factors.transportFactors[commuteType]);
    var commuteWeeklyEmissions = +commuteTypeFactor * +commuteDistance * +officeFrequency;
    var commuteYearlyEmissions = +commuteWeeklyEmissions * 52;

    // Total travel emissions
    var totalTravelEmissions = +businessTravelEmissionsYearly + +commuteYearlyEmissions;
    document.getElementById("travel-emissions").textContent=totalTravelEmissions.toFixed(2) + " kg CO2e";


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
    document.getElementById("total-data-storage-emissions").textContent=totalDataStorageEmissions.toFixed(2) + " kg CO2e";

    
    // RESULTS
    // Total emissions
    var totalEmissions = +totalDeviceEmissions + +emailEmissionsYearly + +teamsEmissionsYearly +
     +businessTravelEmissionsYearly + +totalPrintingEmissionsYearly + +commuteYearlyEmissions + +storageEmissionsYearly;
    document.getElementById("total-emissions").textContent=totalEmissions.toFixed(2) + " kg CO2e";

    // Percentage calculations
    document.getElementById("device-percentage").textContent=((+totalDeviceEmissions/+totalEmissions)*100).toFixed(2) + "%";
    document.getElementById("messaging-percentage").textContent=((+totalMessagingEmissions/+totalEmissions)*100).toFixed(2) + "%";
    document.getElementById("travel-percentage").textContent=((+totalTravelEmissions/+totalEmissions)*100).toFixed(2) + "%";
    document.getElementById("data-percentage").textContent=((+totalDataStorageEmissions/+totalEmissions)*100).toFixed(2) + "%";

    // Create pie chart
    const ctx = document.getElementById('emissions-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [
                'Device Emissions',
                'Email Usage',
                'Teams Usage',
                'Business Travel',
                'Printing',
                'Commuting',
                'Data Storage'
            ],
            datasets: [{
                data: [
                    totalDeviceEmissions,
                    emailEmissionsYearly,
                    teamsEmissionsYearly,
                    businessTravelEmissionsYearly,
                    totalPrintingEmissionsYearly,
                    commuteYearlyEmissions,
                    storageEmissionsYearly
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(50, 50, 139, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(50, 50, 139, 0.6)'
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

}

