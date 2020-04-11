const url = require('url')

module.exports = function (router) {
  // set the sprint folder name as a variable
  var sprint = 'v1-1'

  // route-claim date
  router.post('/' + sprint + '/route-claim', function (req, res) {
    // var data = req.session.data.payFrequency

    req.session.data.claimStart = req.session.data.claimPeriodStartDay + "/" + req.session.data.claimPeriodStartMonth + "/" + req.session.data.claimPeriodStartYear;
    req.session.data.claimEnd = req.session.data.claimPeriodEndDay + "/" + req.session.data.claimPeriodEndMonth + "/" + req.session.data.claimPeriodEndYear;
    res.redirect('/' + sprint + '/pay-question')
  })

  // route - pay dates
  router.post('/' + sprint + '/route-pay-question', function (req, res) {
    res.redirect('/' + sprint + '/pay-frequency')
  })



  // route-pay frequency
  router.post('/' + sprint + '/route-frequency', function (req, res) {
    var data = req.session.data.payFrequency
    if (data === 'monthly') {
      req.session.data.payFrequency = 'each month'
    } else if (data === '4Weekly') {
      req.session.data.payFrequency = 'every 4 weeks'

    } else if (data === 'fortnightly') {
      req.session.data.payFrequency = 'every 2 weeks'
    } else if (data === 'weekly') {
      req.session.data.payFrequency = 'each week'
    }
    res.redirect('/' + sprint + '/salary')
  })

  // route- salary
  router.post('/' + sprint + '/route-salary', function (req, res) {
    req.session.data.salaryAmount = req.session.data.salary
    res.redirect('/' + sprint + '/pay-dates-1')
  })

  // route - pay dates 1
  router.post('/' + sprint + '/route-pay-dates-1', function (req, res) {
    req.session.data.payPeriodOne = req.session.data.payPeriodOneStartDay + "/" + req.session.data.payPeriodOneStartMonth + "/" + req.session.data.payPeriodOneStartYear;
    res.redirect('/' + sprint + '/pay-dates-list')
  })

  // route - pay dates 2
  router.post('/' + sprint + '/route-pay-dates-2', function (req, res) {
   req.session.data.payPeriodTwo = req.session.data.payPeriodTwoStartDay + "/" + req.session.data.payPeriodTwoStartMonth + "/" + req.session.data.payPeriodTwoStartYear;
    res.redirect('/' + sprint + '/pay-dates-list')
  })

  // route - pay dates 3
  router.post('/' + sprint + '/route-pay-dates-3', function (req, res) {
    req.session.data.payPeriodThree = req.session.data.payPeriodThreeStartDay + "/" + req.session.data.payPeriodThreeStartMonth + "/" + req.session.data.payPeriodThreeStartYear;
    res.redirect('/' + sprint + '/pay-dates-list')
  })

  // route - another-pay-date
  router.post('/' + sprint + '/another-pay-date', function (req, res) {
    var data = req.session.data.anotherDate
    if (data === 'yes') {
      if (req.session.data.extraPayPeriodOne === 'true') {
        req.session.data.extraPayPeriodTwo = 'true';
        res.redirect('/' + sprint + '/pay-dates-3')
      } else {
        req.session.data.extraPayPeriodOne = 'true';
        res.redirect('/' + sprint + '/pay-dates-2')
      }
    } else {
      res.redirect('/' + sprint + '/furlough-question')
    }
  })

  // route - fulrough question
  router.post('/' + sprint + '/route-furlough-question', function (req, res) {
     var data = req.session.data.furloughQuestion
    if (data === 'furloughWhole') {
      req.session.data.furloughPeriod = 'furloughed for the whole time'
    } else if (data === 'furloughStart') {
      req.session.data.furloughPeriod = 'began their furlough'
    } else if (data === 'furloughEnd') {
      req.session.data.furloughPeriod = 'ended their furlough'
    } else if (data === 'furloughStartEnd') {
      req.session.data.furloughPeriod = 'began and ended their furlough'
    }
    res.redirect('/' + sprint + '/nic-category')
  })

  // route - nic category
  router.post('/' + sprint + '/route-nic', function (req, res) {
    var data = req.session.data.nicCategory
    if (data === 'a') {
      req.session.data.nicCategoryVal = 'A'
    } else if (data === 'hmz') {
      req.session.data.nicCategoryVal = 'H / M / Z'
    }
    res.redirect('/' + sprint + '/pension')
  })

  // route - pension
  router.post('/' + sprint + '/route-pension', function (req, res) {
    var data = req.session.data.pension
    if (data === 'yes') {
      req.session.data.pensionStatus = 'Opted out of pension auto-enrolment'
    } else if (data === 'no') {
      req.session.data.pensionStatus = 'Opted into pension auto-enrolment'
    }
    // set all the totals

  // multiply for total
    if (req.session.data.payPeriodOne && req.session.data.payPeriodTwo && req.session.data.payPeriodThree) {
      req.session.data.furloughTotalCalc = 3;
    } else if (req.session.data.payPeriodOne && req.session.data.payPeriodTwo ) {
      req.session.data.furloughTotalCalc = 2;
    } else {
      req.session.data.furloughTotalCalc = 1;
    }
    req.session.data.totalFurlough = Math.round ((req.session.data.salaryAmount * 0.8) * req.session.data.furloughTotalCalc) ;
    req.session.data.totalNic = Math.round (req.session.data.totalFurlough * 0.12) ;
    req.session.data.totalPension = Math.round (req.session.data.totalNic * 0.43);

    res.redirect('/' + sprint + '/confirmation')
  })
}
