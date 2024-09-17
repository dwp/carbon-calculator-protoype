//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here


router.post('/uses-laptop', function (req, res) {

    var doYouHaveLaptop = req.session.data['doYouHaveLaptop']

    if (doYouHaveLaptop == "yes"){
        var laptopType = req.session.data['laptopType']
    }
    res.redirect('/devices/desktop')
    
    
  
  })