const url = require('url')

module.exports = function (router) {
  // set the sprint folder name as a variable
  var sprint = 'v1-3'

  // route-claim date
  router.post('/' + sprint + '/route-claim-start', function (req, res) {
    req.session.data.claimStart = req.session.data.claimPeriodStartDay + "/" + req.session.data.claimPeriodStartMonth + "/" + req.session.data.claimPeriodStartYear;
    var titleMonth = Math.round(req.session.data.claimPeriodStartMonth);
    if (titleMonth === 2) {
      req.session.data.claimPeriodStartMonthTitle = ' February';
    } else if (titleMonth === 3) {
      req.session.data.claimPeriodStartMonthTitle = ' March';
    } else if (titleMonth === 4) {
      req.session.data.claimPeriodStartMonthTitle = ' April';
    } else if (titleMonth === 5) {
      req.session.data.claimPeriodStartMonthTitle = ' May';
    }

    req.session.data.payClaimPeriodTitle = Math.round(req.session.data.claimPeriodStartDay) + req.session.data.claimPeriodStartMonthTitle;

    res.redirect('/' + sprint + '/claim-period-1')
  })

  // route-claim date
  router.post('/' + sprint + '/route-claim-end', function (req, res) {
    req.session.data.claimEnd = req.session.data.claimPeriodEndDay + "/" + req.session.data.claimPeriodEndMonth + "/" + req.session.data.claimPeriodEndYear;
    res.redirect('/' + sprint + '/furlough-question')
  })

  // route - fulrough question
  router.post('/' + sprint + '/route-furlough-question', function (req, res) {
    var data = req.session.data.furloughWhole
    if (data === 'yes') {
      req.session.data.furloughPeriod = 'have been furloughed for the whole of the claim period'
      res.redirect('/' + sprint + '/pay-question')
    } else {
      res.redirect('/' + sprint + '/furlough-dates')
    }

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
    var titleMonth = Math.round(req.session.data.payPeriodOneStartMonth);
    if (titleMonth === 2) {
      req.session.data.payPeriodOneTitleMonth = ' February';
    } else if (titleMonth === 3) {
      req.session.data.payPeriodOneTitleMonth = ' March';
    } else if (titleMonth === 4) {
      req.session.data.payPeriodOneTitleMonth = ' April';
    } else if (titleMonth === 5) {
      req.session.data.payPeriodOneTitleMonth = ' May';
    }

    req.session.data.payPeriodOneTitle = Math.round(req.session.data.payPeriodOneStartDay) + req.session.data.payPeriodOneTitleMonth;
    req.session.data.payPeriodOne = req.session.data.payPeriodOneStartDay + "/" + req.session.data.payPeriodOneStartMonth + "/" + req.session.data.payPeriodOneStartYear;
    res.redirect('/' + sprint + '/pay-dates-2')
  })

  // route - pay dates 2
  router.post('/' + sprint + '/route-pay-dates-2', function (req, res) {
    var titleMonth = Math.round(req.session.data.payPeriodTwoStartMonth);
    if (titleMonth === 2) {
      req.session.data.payPeriodTwoTitleMonth = ' February';
    } else if (titleMonth === 3) {
      req.session.data.payPeriodTwoTitleMonth = ' March';
    } else if (titleMonth === 4) {
      req.session.data.payPeriodTwoTitleMonth = ' April';
    } else if (titleMonth === 5) {
      req.session.data.payPeriodTwoTitleMonth = ' May';
    }

    req.session.data.payPeriodTwoTitle = Math.round(req.session.data.payPeriodTwoStartDay) + req.session.data.payPeriodTwoTitleMonth;
   req.session.data.payPeriodTwo = req.session.data.payPeriodTwoStartDay + "/" + req.session.data.payPeriodTwoStartMonth + "/" + req.session.data.payPeriodTwoStartYear;
    res.redirect('/' + sprint + '/pay-dates-3')
  })

  // route - pay dates 3
  router.post('/' + sprint + '/route-pay-dates-3', function (req, res) {
    req.session.data.payPeriodThree = req.session.data.payPeriodThreeStartDay + "/" + req.session.data.payPeriodThreeStartMonth + "/" + req.session.data.payPeriodThreeStartYear;
    res.redirect('/' + sprint + '/nic-category')
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



  // route - nic category
  router.post('/' + sprint + '/route-nic', function (req, res) {
    var data = req.session.data.nicCategory
    if (data === 'a') {
      req.session.data.nicCategoryVal = 'A, B, C, J'
    } else if (data === 'hmz') {
      req.session.data.nicCategoryVal = 'H, M, Z'
    }
    res.redirect('/' + sprint + '/pension')
  })

  // route - pension
  router.post('/' + sprint + '/route-pension', function (req, res) {
    var data = req.session.data.pension
    if (data === 'yes') {
      req.session.data.pensionStatus = 'opted out of pension auto-enrolment'
    } else if (data === 'no') {
      req.session.data.pensionStatus = 'opted into pension auto-enrolment'
    }

  // multiply for total
    if (req.session.data.payPeriodOne && req.session.data.payPeriodTwo && req.session.data.payPeriodThree) {
      req.session.data.furloughTotalCalc = 3;
    } else if (req.session.data.payPeriodOne && req.session.data.payPeriodTwo ) {
      req.session.data.furloughTotalCalc = 2;
    } else {
      req.session.data.furloughTotalCalc = 1;
    }


    // Daily pay calc
    req.session.data.payDaily = Math.round (req.session.data.salaryAmount / 20);
    // req.session.data.payPeriodNic = Math.round (req.session.data.payPeriodFurloughSalary * 0.12);
    // req.session.data.payPeriodPension = Math.round (req.session.data.payPeriodNic * 0.43);

    //  pay period one calc
    req.session.data.payPeriodOneFurloughSalary = Math.round ((req.session.data.payDaily * 17) * 0.8);
    req.session.data.payPeriodOneNic = Math.round (req.session.data.payPeriodOneFurloughSalary * 0.12);
    req.session.data.payPeriodOnePension = Math.round (req.session.data.payPeriodOneNic * 0.43);
    //  pay period two calc
    req.session.data.payPeriodTwoFurloughSalary = Math.round ((req.session.data.payDaily * 13) * 0.8);
    req.session.data.payPeriodTwoNic = Math.round (req.session.data.payPeriodTwoFurloughSalary * 0.12);
    req.session.data.payPeriodTwoPension = Math.round (req.session.data.payPeriodTwoNic * 0.43);

    // set the totals
    req.session.data.totalFurlough = req.session.data.payPeriodOneFurloughSalary + req.session.data.payPeriodTwoFurloughSalary;
    req.session.data.totalNic = req.session.data.payPeriodOneNic + req.session.data.payPeriodTwoNic ;
    req.session.data.totalPension = req.session.data.payPeriodOnePension + req.session.data.payPeriodTwoPension;

    res.redirect('/' + sprint + '/tax-year-pay-date')
  })

  // route - nic category
  router.post('/' + sprint + '/route-tax-pay-date', function (req, res) {
    req.session.data.payTaxDate = req.session.data.payDateDay + "/" + req.session.data.payDateMonth + "/" + req.session.data.payDateYear;
    res.redirect('/' + sprint + '/confirmation')
  })

  //clear data
  router.post('/' + sprint + '/reset', function (req, res) {
     req.session.data = {};
     req.session.destroy();
     res.redirect('/' + sprint + '/claim-period')

   })
}

