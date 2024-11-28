//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
// router.post('/check-car-type', function (req, res){
//     var transportType = req.session.data['commuteType']
//     if (transportType == 'car'){
//         res.redirect('/travel/car-type')
//     } else {
//         res.redirect('/travel/business-travel')
//     }
// })

router.post('/check-commute-type', function(req, res){
    var commuteMode = req.session.data['commuteType'];
    if (commuteMode == 'car'){
        res.redirect('/travel/commuting/commute-car');
    } else {
        res.redirect('/travel/commuting/return-commute');
    }
})

router.post('/check-car-type', function(req, res){
    var bTravelTransportType = req.session.data['businessTravelMode'];
    if (bTravelTransportType == 'car'){
        res.redirect('/travel/business-travel/car-type');
    } else {
        res.redirect('/summary');
    }
})



router.post('/check-return', function(req, res){
    var sameReturn = req.session.data['same-return'];
    var commuteMode = req.session.data['commuteType'];
    if (sameReturn == 'no'){
        res.redirect('/travel/commuting/return-mode');
    }
    else {
        if (commuteMode == 'carShare'){
            res.redirect('/travel/commuting/commute-car');
        } else {
        res.redirect('/travel/commuting/commute-distance');
        }
    }
})


router.post('/check-car-share', function(req, res){
    var returnCommuteMode = req.session.data['returnCommuteType'];
    var commuteMode = req.session.data['commuteType'];
    if (returnCommuteMode == 'carShare' || commuteMode == 'carShare'){
        res.redirect('/travel/commuting/commute-car');
    } else {
        res.redirect('/travel/commuting/commute-distance');
    }
})


router.post('/check-business-travel', function(req, res){
    var doesBusinessTravel = req.session.data['doesBusinessTravel'];
    if (doesBusinessTravel == 'yes'){
        res.redirect('/travel/business-travel/frequency');
    } else {
        res.redirect('/summary');
    }
})

