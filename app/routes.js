//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

var laptopType
var smartphoneType
var numberOfMonitors


router.post('/uses-laptop', function (req, res) {

    var doYouHaveLaptop = req.session.data['doYouHaveLaptop']

    if (doYouHaveLaptop == "yes"){
        laptopType = req.session.data['laptopType']
    }
    res.redirect('/devices/deviceSummary')

  })

  router.post('/uses-smartphone', function (req, res) {

    var doYouHaveSmartphone = req.session.data['doYouHaveSmartphone']

    if (doYouHaveSmartphone == "yes"){
        smartphoneType = req.session.data['smartphoneType']
    }
    res.redirect('/devices')
    
  })

  router.post('/uses-monitors', function (req, res) {

    var doYouHaveMonitor = req.session.data['doYouHaveMonitor']

    if (doYouHaveMonitor == "yes"){
        numberOfMonitors = req.session.data['numberOfMonitors']
    }

    res.redirect('/devices/smartphone')
    
  })
