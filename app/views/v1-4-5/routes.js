// const url = require('url')

module.exports = function (router) {
  // set the sprint folder name as a variable
  var sprint = 'v1-4-5'

  // route-claim date
  router.post('/' + sprint + '/route-claim-start', function (req, res) {
    req.session.data.claimStart = req.session.data.claimPeriodStartDay + '/' + req.session.data.claimPeriodStartMonth + '/' + req.session.data.claimPeriodStartYear
    var titleMonth = Math.round(req.session.data.claimPeriodStartMonth)
    if (titleMonth === 2) {
      req.session.data.claimPeriodStartMonthTitle = ' February'
    } else if (titleMonth === 3) {
      req.session.data.claimPeriodStartMonthTitle = ' March'
    } else if (titleMonth === 4) {
      req.session.data.claimPeriodStartMonthTitle = ' April'
    } else if (titleMonth === 5) {
      req.session.data.claimPeriodStartMonthTitle = ' May'
    }
    req.session.data.payClaimPeriodTitle = Math.round(req.session.data.claimPeriodStartDay) + req.session.data.claimPeriodStartMonthTitle
    res.redirect('/' + sprint + '/claim-period-1')
  })

  // route-claim date
  router.post('/' + sprint + '/route-claim-end', function (req, res) {
    req.session.data.claimEnd = req.session.data.claimPeriodEndDay + '/' + req.session.data.claimPeriodEndMonth + '/' + req.session.data.claimPeriodEndYear
    var titleMonth = Math.round(req.session.data.claimPeriodEndMonth)
    if (titleMonth === 2) {
      req.session.data.claimPeriodEndMonthTitle = ' February'
    } else if (titleMonth === 3) {
      req.session.data.claimPeriodEndMonthTitle = ' March'
    } else if (titleMonth === 4) {
      req.session.data.claimPeriodEndMonthTitle = ' April'
    } else if (titleMonth === 5) {
      req.session.data.claimPeriodEndMonthTitle = ' May'
    }

    req.session.data.payClaimPeriodEndTitle = Math.round(req.session.data.claimPeriodEndDay) + req.session.data.claimPeriodEndMonthTitle
    res.redirect('/' + sprint + '/furlough-question')
  })

  // route - fulrough question
  router.post('/' + sprint + '/route-furlough-question', function (req, res) {
    req.session.data.furloughStart = req.session.data.furloughStartDay + '/' + req.session.data.furloughStartMonth + '/' + req.session.data.furloughStartYear
    var titleMonth = Math.round(req.session.data.furloughStartMonth)
    if (titleMonth === 2) {
      req.session.data.furloughStartMonthTitle = ' February'
    } else if (titleMonth === 3) {
      req.session.data.furloughStartMonthTitle = ' March'
    } else if (titleMonth === 4) {
      req.session.data.furloughStartMonthTitle = ' April'
    } else if (titleMonth === 5) {
      req.session.data.furloughStartMonthTitle = ' May'
    }
    req.session.data.furloughStartTitle = Math.round(req.session.data.furloughStartDay) + req.session.data.furloughStartMonthTitle
    res.redirect('/' + sprint + '/furlough-dates-end-question')
  })

  // route - furlough end date question
  router.post('/' + sprint + '/route-dates-end-question', function (req, res) {
    var data = req.session.data.furloughEndQuestion
    if (data === 'yes') {
      res.redirect('/' + sprint + '/furlough-dates-end')
    } else if (data === 'no') {
      res.redirect('/' + sprint + '/pay-frequency')
    }
  })

  // route furlough date start
  router.post('/' + sprint + '/route-furlough-dates-start', function (req, res) {
    // furlough start
    req.session.data.furloughStart = req.session.data.furloughStartDay + '/' + req.session.data.furloughStartMonth + '/' + req.session.data.furloughStartYear
    var titleMonth = Math.round(req.session.data.furloughStartMonth)
    if (titleMonth === 2) {
      req.session.data.furloughStartMonthTitle = ' February'
    } else if (titleMonth === 3) {
      req.session.data.furloughStartMonthTitle = ' March'
    } else if (titleMonth === 4) {
      req.session.data.furloughStartMonthTitle = ' April'
    } else if (titleMonth === 5) {
      req.session.data.furloughStartMonthTitle = ' May'
    }
    req.session.data.furloughStartTitle = Math.round(req.session.data.furloughStartDay) + req.session.data.furloughStartMonthTitle
    res.redirect('/' + sprint + '/pay-frequency')
  })

  // // furlough end
  router.post('/' + sprint + '/route-furlough-dates-end', function (req, res) {
    req.session.data.furloughEnd = req.session.data.furloughEndDay + '/' + req.session.data.furloughEndMonth + '/' + req.session.data.furloughEndYear
    var endMonth = Math.round(req.session.data.furloughEndMonth)
    if (endMonth === 2) {
      req.session.data.furloughEndMonthTitle = ' February'
    } else if (endMonth === 3) {
      req.session.data.furloughEndMonthTitle = ' March'
    } else if (endMonth === 4) {
      req.session.data.furloughEndMonthTitle = ' April'
    } else if (endMonth === 5) {
      req.session.data.furloughEndMonthTitle = ' May'
    }
    req.session.data.furloughEndTitle = Math.round(req.session.data.furloughEndDay) + req.session.data.furloughEndMonthTitle
    res.redirect('/' + sprint + '/pay-frequency')
  })

  // // furlough  start end
  router.post('/' + sprint + '/route-furlough-dates-start-end', function (req, res) {
    req.session.data.furloughPartialStart = req.session.data.furloughPartialStartDay + '/' + req.session.data.furloughPartialStartMonth + '/' + req.session.data.furloughPartialStartYear
    var startPartialMonth = Math.round(req.session.data.furloughPartialStartMonth)
    if (startPartialMonth === 2) {
      req.session.data.furloughPartialStartMonthTitle = ' February'
    } else if (startPartialMonth === 3) {
      req.session.data.furloughPartialStartMonthTitle = ' March'
    } else if (startPartialMonth === 4) {
      req.session.data.furloughPartialStartMonthTitle = ' April'
    } else if (startPartialMonth === 5) {
      req.session.data.furloughPartialStartMonthTitle = ' May'
    }
    req.session.data.furloughPartialStartTitle = Math.round(req.session.data.furloughPartialStartDay) + req.session.data.furloughPartialStartMonthTitle

    //  end
    req.session.data.furloughPartialEnd = req.session.data.furloughPartialEndDay + '/' + req.session.data.furloughPartialEndMonth + '/' + req.session.data.furloughPartialEndYear
    var endPartialMonth = Math.round(req.session.data.furloughPartialEndMonth)
    if (endPartialMonth === 2) {
      req.session.data.furloughPartialEndMonthTitle = ' February'
    } else if (endPartialMonth === 3) {
      req.session.data.furloughPartialEndMonthTitle = ' March'
    } else if (endPartialMonth === 4) {
      req.session.data.furloughPartialEndMonthTitle = ' April'
    } else if (endPartialMonth === 5) {
      req.session.data.furloughPartialEndMonthTitle = ' May'
    }
    req.session.data.furloughPartialEndTitle = Math.round(req.session.data.furloughPartialEndDay) + req.session.data.furloughPartialEndMonthTitle
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
    res.redirect('/' + sprint + '/pay-question')
  })

  // route - pay dates
  router.post('/' + sprint + '/route-pay-question', function (req, res) {
    var data = req.session.data.payQuestion
    if (data === 'payRegular') {
      req.session.data.payRegular = 'The employee is paid the same amount each month'
      res.redirect('/' + sprint + '/regular-pay')
    } else if (data === 'payVariable') {
      req.session.data.payVary = 'The employees pay varies each time'
      res.redirect('/' + sprint + '/variable-length-employed')
    }
  })

  // route - vairable length time employed
  router.post('/' + sprint + '/route-employed-length-question', function (req, res) {
    var data = req.session.data.employLength
    if (data === 'lessThan12') {
      req.session.data.varyMoreThan = false
      res.redirect('/' + sprint + '/variable-length-employed-start-date')
    } else if (data === 'moreThan12') {
      req.session.data.varyMoreThan = true
      res.redirect('/' + sprint + '/coming-soon')
    }
  })


  // route - vairable lengt start dates
  router.post('/' + sprint + '/route-variable-start-date', function (req, res) {
    var titleMonth = Math.round(req.session.data.employeeStartMonth)
    req.session.data.employeeStartMonthCalc = titleMonth
    if (titleMonth === 1) {
      req.session.data.employeeStartMonth = ' January'
    } else if (titleMonth === 2) {
      req.session.data.employeeStartMonth = ' February'
    } else if (titleMonth === 3) {
      req.session.data.employeeStartMonth = ' March'
    } else if (titleMonth === 4) {
      req.session.data.employeeStartMonth = ' April'
    } else if (titleMonth === 5) {
      req.session.data.employeeStartMonth = ' May'
    } else if (titleMonth === 6) {
      req.session.data.employeeStartMonth = ' June'
    } else if (titleMonth === 7) {
      req.session.data.employeeStartMonth = ' July'
    } else if (titleMonth === 8) {
      req.session.data.employeeStartMonth = ' August'
    } else if (titleMonth === 9) {
      req.session.data.employeeStartMonth = ' September'
    } else if (titleMonth === 10) {
      req.session.data.employeeStartMonth = ' October'
    } else if (titleMonth === 11) {
      req.session.data.employeeStartMonth = ' November'
    } else if (titleMonth === 12) {
      req.session.data.employeeStartMonth = ' December'
    }
    req.session.data.employeeStartTitle = Math.round(req.session.data.employeeStartDay) + req.session.data.employeeStartMonth + ' ' + req.session.data.employeeStartYear
    req.session.data.employeeStart = req.session.data.employeeStartDay + '/' + req.session.data.employeeStartMonth + '/' + req.session.data.employeeStartYear

    res.redirect('/' + sprint + '/vary-gross-salary')

  })

  // route- route partial pay period
  router.post('/' + sprint + '/route-part-pay-period', function (req, res) {
    res.redirect('/' + sprint + '/nic-category')
  })

  // route- salary
  router.post('/' + sprint + '/route-salary', function (req, res) {
    req.session.data.salaryAmount = req.session.data.salary
    res.redirect('/' + sprint + '/pay-dates-1')
  })

  // route - pay dates 1
  router.post('/' + sprint + '/route-pay-dates-1', function (req, res) {
    var titleMonth = Math.round(req.session.data.payPeriodOneStartMonth)
    if (titleMonth === 2) {
      req.session.data.payPeriodOneTitleMonth = ' February'
    } else if (titleMonth === 3) {
      req.session.data.payPeriodOneTitleMonth = ' March'
    } else if (titleMonth === 4) {
      req.session.data.payPeriodOneTitleMonth = ' April'
    } else if (titleMonth === 5) {
      req.session.data.payPeriodOneTitleMonth = ' May'
    }

    req.session.data.payPeriodOneTitle = Math.round(req.session.data.payPeriodOneStartDay) + req.session.data.payPeriodOneTitleMonth
    req.session.data.payPeriodOne = req.session.data.payPeriodOneStartDay + '/' + req.session.data.payPeriodOneStartMonth + '/' + req.session.data.payPeriodOneStartYear

    res.redirect('/' + sprint + '/pay-dates-2')
    /*if (req.session.data.payRegular) {
      res.redirect('/' + sprint + '/pay-dates-2')
    } else {
      res.redirect('/' + sprint + '/variable-length-employed-partial-pay-amount')
    }*/
  })

  // route - pay dates 2
  router.post('/' + sprint + '/route-pay-dates-2', function (req, res) {
    var titleMonth = Math.round(req.session.data.payPeriodTwoStartMonth)
    if (titleMonth === 2) {
      req.session.data.payPeriodTwoTitleMonth = ' February'
    } else if (titleMonth === 3) {
      req.session.data.payPeriodTwoTitleMonth = ' March'
    } else if (titleMonth === 4) {
      req.session.data.payPeriodTwoTitleMonth = ' April'
    } else if (titleMonth === 5) {
      req.session.data.payPeriodTwoTitleMonth = ' May'
    }
    req.session.data.payPeriodTwoTitle = Math.round(req.session.data.payPeriodTwoStartDay) + req.session.data.payPeriodTwoTitleMonth
    req.session.data.payPeriodTwo = req.session.data.payPeriodTwoStartDay + '/' + req.session.data.payPeriodTwoStartMonth + '/' + req.session.data.payPeriodTwoStartYear
    res.redirect('/' + sprint + '/pay-dates-3')
  })

  // route - pay dates 3
  router.post('/' + sprint + '/route-pay-dates-3', function (req, res) {
    var titleMonth = Math.round(req.session.data.payPeriodThreeStartMonth)
    if (titleMonth === 2) {
      req.session.data.payPeriodThreeStartMonth = ' February'
    } else if (titleMonth === 3) {
      req.session.data.payPeriodThreeStartMonth = ' March'
    } else if (titleMonth === 4) {
      req.session.data.payPeriodThreeStartMonth = ' April'
    } else if (titleMonth === 5) {
      req.session.data.payPeriodThreeStartMonth = ' May'
    }

    req.session.data.payPeriodThreeTitle = Math.round(req.session.data.payPeriodThreeStartDay) + req.session.data.payPeriodThreeStartMonth

    req.session.data.payPeriodThree = req.session.data.payPeriodThreeStartDay + '/' + req.session.data.payPeriodThreeStartMonth + '/' + req.session.data.payPeriodThreeStartYear
    res.redirect('/' + sprint + '/pay-date')
  })

  // route-vary-salary-1
  router.post('/' + sprint + '/route-vary-salary-1', function (req, res) {
    res.redirect('/' + sprint + '/vary-salary-2')
  })
  // route-vary-salary-2
  router.post('/' + sprint + '/route-vary-salary-2', function (req, res) {
    req.session.data.salaryAmount = req.session.data.salary
    res.redirect('/' + sprint + '/vary-gross-salary')
  })

  // route-vary-gross salary
  router.post('/' + sprint + '/route-vary-gross-salary', function (req, res) {
    req.session.data.variableGrosSalaryAmount = req.session.data.variableGrossSalary
    res.redirect('/' + sprint + '/pay-dates-1');
  })

  // route - another-pay-date
  router.post('/' + sprint + '/another-pay-date', function (req, res) {
    var data = req.session.data.anotherDate
    if (data === 'yes') {
      if (req.session.data.extraPayPeriodOne === 'true') {
        req.session.data.extraPayPeriodTwo = 'true'
        res.redirect('/' + sprint + '/pay-dates-3')
      } else {
        req.session.data.extraPayPeriodOne = 'true'
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
      req.session.data.nicCategoryVal = 'A, B, C or J'
    } else if (data === 'hmz') {
      req.session.data.nicCategoryVal = 'H, M or Z'
    }
    res.redirect('/' + sprint + '/pension')
  })

  // route - pension
  router.post('/' + sprint + '/route-pension', function (req, res) {
    var data = req.session.data.pension
    if (data === 'yes') {
      req.session.data.pensionStatus = 'receive employer pension contributions'
    } else if (data === 'no') {
      req.session.data.pensionStatus = 'do not receive employer pension contributions'
    }

    // Average Daily pay calc
    if (req.session.data.variableGrossSalary) {
      var grossSalary = req.session.data.variableGrossSalary
      var claimMonthTotal =  Math.round(req.session.data.claimPeriodStartMonth) + 12
      var MonthStart = Math.round(req.session.data.employeeStartMonthCalc)
      req.session.data.periodsalaryAmount = Math.round(grossSalary / ((claimMonthTotal - MonthStart) * 30))
    } else if (req.session.data.salaryAmount) {
      req.session.data.periodsalaryAmount = Math.round(req.session.data.salaryAmount / 30)
    }
    // console.log('period ave = ' + req.session.data.periodsalaryAmount)
    // Days in pay period
    req.session.data.periodOneNoDays = 31 - Math.round(req.session.data.claimPeriodStartDay)
    req.session.data.periodTwoNoDays = 30 - Math.round(req.session.data.claimPeriodEndDay)

    // Total pay in each period
    req.session.data.payOne = req.session.data.periodsalaryAmount * req.session.data.periodOneNoDays
    req.session.data.payTwo = req.session.data.periodsalaryAmount * req.session.data.periodTwoNoDays

    //  pay period one breakdown
    req.session.data.payPeriodOneFurloughSalary = Math.round(req.session.data.payOne * 0.8)
    if (req.session.data.payPeriodOneFurloughSalary > 2500) {
      req.session.data.payPeriodOneFurloughSalary = 2500
    }
    req.session.data.payPeriodOneNic = Math.round(req.session.data.payPeriodOneFurloughSalary * 0.138)
    req.session.data.payPeriodOnePension = Math.round(req.session.data.payPeriodOneNic * 0.43)

    //  pay period two // Days in pay period
    req.session.data.payPeriodTwoFurloughSalary = Math.round(req.session.data.payTwo * 0.8)
    if (req.session.data.payPeriodTwoFurloughSalary > 2500) {
      req.session.data.payPeriodTwoFurloughSalary = 2500
    }
    req.session.data.payPeriodTwoNic = Math.round(req.session.data.payPeriodTwoFurloughSalary * 0.138)
    req.session.data.payPeriodTwoPension = Math.round(req.session.data.payPeriodTwoNic * 0.43)

    // set the totals
    req.session.data.totalFurlough = req.session.data.payPeriodOneFurloughSalary + req.session.data.payPeriodTwoFurloughSalary
    req.session.data.totalNic = req.session.data.payPeriodOneNic + req.session.data.payPeriodTwoNic
    req.session.data.totalPension = req.session.data.payPeriodOnePension + req.session.data.payPeriodTwoPension
    // console.log('total =' + req.session.data.totalFurlough)
    res.redirect('/' + sprint + '/furlough-calcs')
  })

  // route - nic category
  router.post('/' + sprint + '/route-tax-pay-date', function (req, res) {
    req.session.data.payTaxDate = req.session.data.payDateDay + '/' + req.session.data.payDateMonth + '/' + req.session.data.payDateYear
    var titleMonth = Math.round(req.session.data.payDateMonth)
    if (titleMonth === 2) {
      req.session.data.payDateMonthTitle = ' February'
    } else if (titleMonth === 3) {
      req.session.data.payDateMonthTitle = ' March'
    } else if (titleMonth === 4) {
      req.session.data.payDateMonthTitle = ' April'
    } else if (titleMonth === 5) {
      req.session.data.payDateMonthTitle = ' May'
    }

    req.session.data.payTaxDateTitle = Math.round(req.session.data.payDateDay) + req.session.data.payDateMonthTitle
    if (req.session.data.payVary){
      res.redirect('/' + sprint + '/variable-length-employed-partial-pay-amount')
    } else {
      res.redirect('/' + sprint + '/nic-category')
    }

  })

  // route - furlough calcs
  router.post('/' + sprint + '/route-topup-question', function (req, res) {
    var data = req.session.data.topUp
    if (data === 'yes') {
      req.session.data.topUps = true
      res.redirect('/' + sprint + '/coming-soon')
    } else if (data === 'no') {
      res.redirect('/' + sprint + '/confirmation')
    }
  })

  // route - select period
  router.post('/' + sprint + '/route-pay-period-select', function (req, res) {
    res.redirect('/' + sprint + '/pay-periods-topup')
  })

  // route - top up select
  router.post('/' + sprint + '/route-topup', function (req, res) {
    req.session.data.topupTotal = req.session.data.topupAmount
    res.redirect('/' + sprint + '/confirmation')
  })

  // clear data
  router.post('/' + sprint + '/reset', function (req, res) {
    req.session.data = {}
    req.session.destroy()
    res.redirect('/' + sprint + '/claim-period')
  })
}
