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

router.post('/check-car-type', function(req, res){
    var bTravelTransportType = req.session.data['businessTravelMode'];
    if (bTravelTransportType == 'car'){
        res.redirect('/travel/business-travel-car-type');
    } else {
        res.redirect('/summary');
    }
})

router.post('/check-commute-type', function(req, res){
    var commuteMode = req.session.data['commuteType'];
    if (commuteMode == 'car'){
        res.redirect('/travel/commute-car');
    } else {
        res.redirect('/travel/return-commute');
    }
})

router.post('/check-return', function(req, res){
    var sameReturn = req.session.data['same-return']
    if (sameReturn == 'no'){
        res.redirect('/travel/return-commute/return-mode');
    }
    else {
        res.redirect('/travel/commute-distance');
    }
})



