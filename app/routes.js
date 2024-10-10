//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.post('/check-car-type', function (req, res){
    var transportType = req.session.data['commuteType']
    if (transportType == 'car'){
        res.redirect('/travel/car-type')
    } else {
        res.redirect('/travel/business-travel')
    }
})

