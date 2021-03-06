// const url = require('url')

module.exports = function (router) {
  // set the sprint folder name as a variable
  var sprint = 'v1-6'

  // helpers - month converter
  const getMonthName = (titleMonth) => {
    if (titleMonth === 2) {
      return ' February'
    } else if (titleMonth === 3) {
      return ' March'
    } else if (titleMonth === 4) {
      return ' April'
    } else if (titleMonth === 5) {
      return ' May'
    } else if (titleMonth === 6) {
      return ' June'
    } else if (titleMonth === 7) {
      return ' July'
    } else if (titleMonth === 8) {
      return ' August'
    } else if (titleMonth === 9) {
      return ' September'
    } else if (titleMonth === 10) {
      return ' October'
    } else if (titleMonth === 11) {
      return ' November'
    } else if (titleMonth === 12) {
      return ' December'
    }
  }

  // route-claim date
  router.post('/' + sprint + '/route-claim-start', function (req, res) {
    var titleMonth = Math.round(req.session.data.claimPeriodStartMonth)
    req.session.data.claimPeriodStartMonthTitle = getMonthName(titleMonth)
    req.session.data.payClaimPeriodTitle = Math.round(req.session.data.claimPeriodStartDay) + req.session.data.claimPeriodStartMonthTitle
    req.session.data.claimStart = titleMonth + '' + Math.round(req.session.data.claimPeriodStartDay)
    // console.log(req.session.data.claimStart)
    res.redirect('/' + sprint + '/claim-period-end')
  })

  // route-claim date
  router.post('/' + sprint + '/route-claim-end', function (req, res) {
    var titleMonth = Math.round(req.session.data.claimPeriodEndMonth)
    req.session.data.claimPeriodEndMonthTitle = getMonthName(titleMonth)
    req.session.data.payClaimPeriodEndTitle = Math.round(req.session.data.claimPeriodEndDay) + req.session.data.claimPeriodEndMonthTitle
    req.session.data.claimEnd = titleMonth + '' + Math.round(req.session.data.claimPeriodEndDay)
    res.redirect('/' + sprint + '/furlough-start')
  })

  // route - fulrough question
  router.post('/' + sprint + '/route-furlough-question', function (req, res) {
    var titleMonth = Math.round(req.session.data.furloughStartMonth)
    req.session.data.furloughStartMonthTitle = getMonthName(titleMonth)
    req.session.data.furloughStartTitle = Math.round(req.session.data.furloughStartDay) + req.session.data.furloughStartMonthTitle
    req.session.data.furloughStart = titleMonth + '' + Math.round(req.session.data.furloughStartDay)
    res.redirect('/' + sprint + '/furlough-ongoing')
  })

  // route - furlough end date question
  router.post('/' + sprint + '/route-dates-end-question', function (req, res) {
    var data = req.session.data.furloughEndQuestion
    if (data === 'yes') {
      res.redirect('/' + sprint + '/furlough-end')
    } else if (data === 'no') {
      res.redirect('/' + sprint + '/pay-frequency')
    }
  })

  // route furlough date start
  router.post('/' + sprint + '/route-furlough-dates-start', function (req, res) {
    var titleMonth = Math.round(req.session.data.furloughStartMonth)
    req.session.data.furloughStartMonthTitle = getMonthName(titleMonth)
    req.session.data.furloughStartTitle = Math.round(req.session.data.furloughStartDay) + req.session.data.furloughStartMonthTitle
    req.session.data.furloughStart = titleMonth + '' + Math.round(req.session.data.furloughStartDay)
    res.redirect('/' + sprint + '/pay-frequency')
  })

  // // furlough end
  router.post('/' + sprint + '/route-furlough-dates-end', function (req, res) {
    var titleMonth = Math.round(req.session.data.furloughEndMonth)
    req.session.data.furloughEndMonthTitle = getMonthName(titleMonth)
    req.session.data.furloughEndTitle = Math.round(req.session.data.furloughEndDay) + req.session.data.furloughEndMonthTitle
    req.session.data.furloughEnd = titleMonth + '' + Math.round(req.session.data.furloughEndDay)
    res.redirect('/' + sprint + '/pay-frequency')
  })

  // // furlough  start end
  router.post('/' + sprint + '/route-furlough-dates-start-end', function (req, res) {
    req.session.data.furloughPartialStart = req.session.data.furloughPartialStartDay + '/' + req.session.data.furloughPartialStartMonth + '/' + req.session.data.furloughPartialStartYear
    req.session.data.furloughPartialStartMonthTitle = getMonthName(Math.round(req.session.data.furloughPartialStartMonth))
    req.session.data.furloughPartialStartTitle = Math.round(req.session.data.furloughPartialStartDay) + req.session.data.furloughPartialStartMonthTitle

    //  end
    req.session.data.furloughPartialEnd = req.session.data.furloughPartialEndDay + '/' + req.session.data.furloughPartialEndMonth + '/' + req.session.data.furloughPartialEndYear
    req.session.data.furloughPartialEndMonthTitle = getMonthName(Math.round(req.session.data.furloughPartialEndMonth))
    req.session.data.furloughPartialEndTitle = Math.round(req.session.data.furloughPartialEndDay) + req.session.data.furloughPartialEndMonthTitle
    res.redirect('/' + sprint + '/pay-frequency')
  })

  // route-pay frequency
  router.post('/' + sprint + '/route-frequency', function (req, res) {
    var data = req.session.data.payFrequency
    if (data === 'monthly') {
      req.session.data.payFrequencyDisplay = 'each month'
      req.session.data.payFrequencyDays = 28
    } else if (data === '4Weekly') {
      req.session.data.payFrequencyDisplay = 'every four weeks'
      req.session.data.payFrequencyDays = 28
    } else if (data === 'fortnightly') {
      req.session.data.payFrequencyDisplay = 'every two weeks'
      req.session.data.payFrequencyDays = 14
    } else if (data === 'weekly') {
      req.session.data.payFrequencyDisplay = 'each week'
      req.session.data.payFrequencyDays = 7
    }
    res.redirect('/' + sprint + '/pay-method')
  })

  // route - pay dates
  router.post('/' + sprint + '/route-pay-question', function (req, res) {
    var data = req.session.data.payQuestion
    if (data === 'payRegular') {
      req.session.data.payRegular = 'The employee is paid the same amount each month'
      res.redirect('/' + sprint + '/pay-dates-1')
    } else if (data === 'payVariable') {
      req.session.data.payVary = 'The employees pay varies each time'
      res.redirect('/' + sprint + '/variable-pay-how-long-working')
    }
  })

  // route - vairable length time employed
  router.post('/' + sprint + '/route-employed-length-question', function (req, res) {
    var data = req.session.data.employLength
    if (data === 'lessThan12') {
      req.session.data.lessThan12 = 'true'
      res.redirect('/' + sprint + '/variable-pay-start-date')
    } else if (data === 'moreThan12') {
      req.session.data.varyMoreThan = 'true'
      res.redirect('/' + sprint + '/pay-dates-1')
    }
  })

  // route - vairable lengt start dates
  router.post('/' + sprint + '/route-variable-start-date', function (req, res) {
    var titleMonth = Math.round(req.session.data.employeeStartMonth)
    var titleDay = Math.round(req.session.data.employeeStartDay)
    req.session.data.employeeStartMonthCalc = titleMonth
    req.session.data.employeeStartMonth = getMonthName(titleMonth)
    req.session.data.employeeStartTitle = titleDay + req.session.data.employeeStartMonth + ' ' + req.session.data.employeeStartYear
    req.session.data.employeeStart = titleMonth + '0' + req.session.data.employeeStartDay
    if (titleMonth === 4 && titleDay <= 5) {
      req.session.data.varyMoreThan = 'true'
      // console.log('more than journey')
    }
    // console.log(req.session.data.employeeStart)
    res.redirect('/' + sprint + '/pay-dates-1')

  })

  // route- route partial pay period
  router.post('/' + sprint + '/route-part-pay-period', function (req, res) {
    res.redirect('/' + sprint + '/topup-question')
  })

  // route- salary
  router.post('/' + sprint + '/route-reg-salary', function (req, res) {
    req.session.data.salaryAmount = req.session.data.salary
    req.session.data.salaryFurlough = Math.round(req.session.data.salary * 0.8)
    res.redirect('/' + sprint + '/topup-question')
  })

  // route - pay dates 1
  router.post('/' + sprint + '/route-pay-dates-1', function (req, res) {
    var titleMonth = Math.round(req.session.data.payPeriodOneStartMonth)
    req.session.data.payPeriodOneTitleMonth = getMonthName(titleMonth)
    req.session.data.payPeriodOneTitle = Math.round(req.session.data.payPeriodOneStartDay) + req.session.data.payPeriodOneTitleMonth
    req.session.data.payPeriodOne = titleMonth + '' + Math.round(req.session.data.payPeriodOneStartDay)

    // calc dates for diff pay periods
    var frequency = req.session.data.payFrequencyDays
    var date1 =   Math.round(req.session.data.payPeriodOneStartDay)
    if (date1 > 30) {
      date1 = date1 - 30
      var newMonth1 = getMonthName(titleMonth + 1)
      var increment = true
    } else {
      if (increment){
        var newMonth1 = getMonthName(titleMonth + 1)
      } else {
        var newMonth1 = getMonthName(titleMonth)
      }
    }
    var date2 = date1 + frequency
    if (date2 > 30) {
      date2 = date2 - 30
      var newMonth2 = getMonthName(titleMonth + 1)
      var increment = true
    } else {
      if (increment){
        var newMonth2 = getMonthName(titleMonth + 1)
      } else {
        var newMonth2 = getMonthName(titleMonth)
      }
    }
    var date3 = date2 + frequency
    if (date3 > 30) {
      date3 = date3 - 30
      var newMonth3 = getMonthName(titleMonth + 1)
      var increment = true
    } else {
      if (increment){
        var newMonth3 = getMonthName(titleMonth + 1)
      } else {
        var newMonth3 = getMonthName(titleMonth)
      }
    }
    var date4 = date3 + frequency
    if (date4 > 30) {
      date4 = date4 - 30
      var newMonth4 = getMonthName(titleMonth + 1)
    } else {
      var newMonth4 = newMonth3
    }
    req.session.data.weekOne = date1 + '' + newMonth1
    req.session.data.weekTwo = date2 + '' + newMonth2
    req.session.data.weekThree = date3 + '' + newMonth3
    req.session.data.weekFour = date4 + '' + newMonth4

    // console.log('frequency = ' + req.session.data.payFrequencyDays)
    // console.log('1 date = ' + req.session.data.weekOne)
    // console.log('2 date = ' + req.session.data.weekTwo)
    // console.log('3 date = ' + req.session.data.weekThree)
    // console.log('4 date = ' + req.session.data.weekFour)

    // if (req.session.data.payFrequency === 'monthly') {
    //   res.redirect('/' + sprint + '/pay-dates-2')
    // } else {
    //   res.redirect('/' + sprint + '/last-pay-date')
    // }
    res.redirect('/' + sprint + '/pay-dates-2')
  })

  // route - pay dates 2
  router.post('/' + sprint + '/route-pay-dates-2', function (req, res) {
    var titleMonth = Math.round(req.session.data.payPeriodTwoStartMonth)
    req.session.data.payPeriodTwoTitleMonth = getMonthName(titleMonth)
    req.session.data.payPeriodTwoTitle = Math.round(req.session.data.payPeriodTwoStartDay) + req.session.data.payPeriodTwoTitleMonth
    req.session.data.payPeriodTwo = titleMonth + '' + Math.round(req.session.data.payPeriodTwoStartDay)

    res.redirect('/' + sprint + '/pay-dates-3')
  })

  // route - pay dates 3
  router.post('/' + sprint + '/route-pay-dates-3', function (req, res) {
    var titleMonth = Math.round(req.session.data.payPeriodThreeStartMonth)
    req.session.data.payPeriodThreeStartMonth = getMonthName(titleMonth)
    req.session.data.payPeriodThreeTitle = Math.round(req.session.data.payPeriodThreeStartDay) + req.session.data.payPeriodThreeStartMonth
    req.session.data.payPeriodThree = titleMonth + '' + Math.round(req.session.data.payPeriodThreeStartDay)
    var dataFreq = req.session.data.payFrequency
    if (dataFreq === 'fortnightly' || dataFreq === 'weekly') {
      res.redirect('/' + sprint + '/pay-dates-4')
    } else  {
      res.redirect('/' + sprint + '/last-pay-date')
    }
  })

  // route - pay dates 4
  router.post('/' + sprint + '/route-pay-dates-4', function (req, res) {
    var titleMonth = Math.round(req.session.data.payPeriodFourStartMonth)
    req.session.data.payPeriodFourStartMonth = getMonthName(titleMonth)
    req.session.data.payPeriodFourTitle = Math.round(req.session.data.payPeriodFourStartDay) + req.session.data.payPeriodFourStartMonth
    req.session.data.payPeriodFour = titleMonth + '' + Math.round(req.session.data.payPeriodFourStartDay)
    var dataFreq = req.session.data.payFrequency
    if (dataFreq === 'weekly') {
      res.redirect('/' + sprint + '/pay-dates-5')
    } else  {
      res.redirect('/' + sprint + '/last-pay-date')
    }

  })

  // route - pay dates 5
  router.post('/' + sprint + '/route-pay-dates-5', function (req, res) {
    var titleMonth = Math.round(req.session.data.payPeriodFiveStartMonth)
    req.session.data.payPeriodFiveStartMonth = getMonthName(titleMonth)
    req.session.data.payPeriodFiveTitle = Math.round(req.session.data.payPeriodFiveStartDay) + req.session.data.payPeriodFiveStartMonth
    req.session.data.payPeriodFive = titleMonth + '' + Math.round(req.session.data.payPeriodFiveStartDay)
  res.redirect('/' + sprint + '/pay-dates-6')
  })
  // route - pay dates 6
  router.post('/' + sprint + '/route-pay-dates-6', function (req, res) {
    var titleMonth = Math.round(req.session.data.payPeriodSixStartMonth)
    req.session.data.payPeriodSixStartMonth = getMonthName(titleMonth)
    req.session.data.payPeriodSixTitle = Math.round(req.session.data.payPeriodSixStartDay) + req.session.data.payPeriodSixStartMonth
    req.session.data.payPeriodSix = titleMonth + '' + Math.round(req.session.data.payPeriodSixStartDay)
    res.redirect('/' + sprint + '/last-pay-date')
  })

  // route - pay date
  router.post('/' + sprint + '/route-tax-pay-date', function (req, res) {
    req.session.data.payTaxDate = req.session.data.payDateDay + '/' + req.session.data.payDateMonth + '/' + req.session.data.payDateYear
    var titleMonth = Math.round(req.session.data.payDateMonth)
    req.session.data.payDateMonthTitle = getMonthName(titleMonth)
    req.session.data.payTaxDateTitle = Math.round(req.session.data.payDateDay) + req.session.data.payDateMonthTitle
    req.session.data.pastOneMonthTitle = getMonthName(Math.round(req.session.data.payDateMonth) - 1)
    req.session.data.pastTwoMonthTitle = getMonthName(Math.round(req.session.data.payDateMonth))
    if (req.session.data.payVary) {
      if (req.session.data.varyMoreThan === 'true') {
        res.redirect('/' + sprint + '/last-year-pay-1')
      } else if (req.session.data.lessThan12 === 'true') {
        res.redirect('/' + sprint + '/annual-pay-amount')
      }
    } else {
      res.redirect('/' + sprint + '/regular-pay-amount')
    }
  })

  // route-vary-salary-1
  router.post('/' + sprint + '/route-vary-salary-1', function (req, res) {
    req.session.data.salaryAmount = req.session.data.salary
    req.session.data.salaryFurlough = Math.round(req.session.data.salary * 0.8)
    res.redirect('/' + sprint + '/last-year-pay-2')
  })
  // route-vary-salary-2
  router.post('/' + sprint + '/route-vary-salary-2', function (req, res) {
    req.session.data.salaryAmount2 = req.session.data.salary2
    req.session.data.salaryFurlough2 = Math.round(req.session.data.salary2 * 0.8)
    var dataFreq = req.session.data.payFrequency
    if (dataFreq === 'fortnightly' || dataFreq === 'weekly') {
      res.redirect('/' + sprint + '/last-year-pay-3')
    } else  {
      res.redirect('/' + sprint + '/annual-pay-amount')
    }
  })
  // route-vary-salary-3
  router.post('/' + sprint + '/route-vary-salary-3', function (req, res) {
    var dataFreq = req.session.data.payFrequency
    if (dataFreq === 'weekly') {
      res.redirect('/' + sprint + '/last-year-pay-4')
    } else  {
      res.redirect('/' + sprint + '/annual-pay-amount')
    }
  })
  // route-vary-salary-4
  router.post('/' + sprint + '/route-vary-salary-4', function (req, res) {
    res.redirect('/' + sprint + '/last-year-pay-5')
  })

  // route-vary-salary-5
  router.post('/' + sprint + '/route-vary-salary-5', function (req, res) {
    res.redirect('/' + sprint + '/last-year-pay-6')
  })
  // route-vary-salary-6
  router.post('/' + sprint + '/route-vary-salary-6', function (req, res) {
    res.redirect('/' + sprint + '/annual-pay-amount')
  })

  // route-vary-gross salary
  router.post('/' + sprint + '/route-vary-gross-salary', function (req, res) {
    // req.session.data.variableGrosSalaryAmount = req.session.data.variableGrossSalary
    var data = req.session.data.employLength
    if (data === 'lessThan12') {
      var grossSalary = req.session.data.variableGrossSalary
      var claimMonthTotal = Math.round(req.session.data.claimPeriodStartMonth) + 12
      var monthStart = Math.round(req.session.data.employeeStartMonthCalc)
      req.session.data.salaryFurlough = Math.round((grossSalary / 30) * (claimMonthTotal - monthStart))
      req.session.data.salaryFurlough2 = req.session.data.salaryFurlough - 27
      var dataFreq = req.session.data.payFrequency
      if (dataFreq === 'weekly') {
        req.session.data.salaryFurlough = Math.round(req.session.data.salaryFurlough /4)
      } else if (dataFreq === 'fortnightly') {
        req.session.data.salaryFurlough = Math.round(req.session.data.salaryFurlough /3)
      }
    }
    if (req.session.data.furloughStart <= req.session.data.claimStart) {
      res.redirect('/' + sprint + '/topup-question')
    } else {
      res.redirect('/' + sprint + '/variable-pay-partial-pay-amount')
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

  // route - discretionary
  router.post('/' + sprint + '/route-discretionary-question', function (req, res) {
    var data = req.session.data.discretionary
    if (data === 'yes') {
      req.session.data.discretionary = true
      res.redirect('/' + sprint + '/additional-pay-periods')
    } else if (data === 'no') {
      res.redirect('/' + sprint + '/ni-category-letter')
    }
  })

  // route-discretionary-period-select
  router.post('/' + sprint + '/route-discretionary-period-select', function (req, res) {
    res.redirect('/' + sprint + '/additional-pay-amount')
  })

  // route - top up select
  router.post('/' + sprint + '/route-discretionary-amount', function (req, res) {
    // req.session.data.discretionaryPay = req.session.data.discretionaryPay
    res.redirect('/' + sprint + '/ni-category-letter')
  })

  // route - top up question
  router.post('/' + sprint + '/route-topup-question', function (req, res) {
    var data = req.session.data.topUp
    if (data === 'yes') {
      req.session.data.topUps = true
      res.redirect('/' + sprint + '/topup-pay-periods')
    } else if (data === 'no') {
      res.redirect('/' + sprint + '/additional-pay-question')
    }

  })

  // route - select period
  router.post('/' + sprint + '/route-pay-period-select', function (req, res) {
    res.redirect('/' + sprint + '/topup-pay-amount')
  })

  // route - top up select
  router.post('/' + sprint + '/route-topup', function (req, res) {
    req.session.data.topupTotal = req.session.data.topupAmount
    res.redirect('/' + sprint + '/additional-pay-question')
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
    if (req.session.data.salaryAmount) {
      req.session.data.periodsalaryAmount = Math.round(req.session.data.salaryAmount * 0.8)
      if (req.session.data.salaryAmount2) {
        req.session.data.periodsalaryAmountTwo = Math.round(req.session.data.salaryAmount2 * 0.8)
      } else {
        req.session.data.periodsalaryAmountTwo = req.session.data.periodsalaryAmount
      }
    } else if (req.session.data.variableGrossSalary) {
      var grossSalary = req.session.data.variableGrossSalary
      var claimMonthTotal = Math.round(req.session.data.claimPeriodStartMonth) + 12
      var monthStart = Math.round(req.session.data.employeeStartMonthCalc)
      req.session.data.periodsalaryAmount = Math.round((grossSalary / 30) * (claimMonthTotal - monthStart))
    }
    console.log('vary gross salary = ' + req.session.data.variableGrossSalary)
    console.log(' salary = ' + req.session.data.salaryAmount)
    // console.log('claimMonthTotal = ' + claimMonthTotal)
    // console.log('period ave = ' + req.session.data.periodsalaryAmount)

    //  pay period one breakdown
    req.session.data.payPeriodOneFurloughSalary = req.session.data.periodsalaryAmount
    if (req.session.data.payPeriodOneFurloughSalary > 2500) {
      req.session.data.payPeriodOneFurloughSalary = 2500
    }
    req.session.data.payPeriodOneNic = Math.round(req.session.data.payPeriodOneFurloughSalary * 0.138)
    req.session.data.payPeriodOnePension = Math.round(req.session.data.payPeriodOneNic * 0.43)
    console.log('payPeriodOneFurloughSalary = ' + req.session.data.payPeriodOneFurloughSalary)
    //  pay period two // Days in pay period
    // if (req.session.data.payTwo < 1) {
    //   req.session.data.payTwo = 2365
    // }
    req.session.data.payPeriodTwoFurloughSalary = req.session.data.periodsalaryAmountTwo
    if (req.session.data.payPeriodTwoFurloughSalary > 2500) {
      req.session.data.payPeriodTwoFurloughSalary = 2500
    }
    req.session.data.payPeriodTwoNic = Math.round(req.session.data.payPeriodTwoFurloughSalary * 0.138)
    req.session.data.payPeriodTwoPension = Math.round(req.session.data.payPeriodTwoNic * 0.43)

    // set the totals
    req.session.data.totalFurlough = req.session.data.payPeriodOneFurloughSalary + req.session.data.payPeriodTwoFurloughSalary

    req.session.data.totalNic = req.session.data.payPeriodOneNic + req.session.data.payPeriodTwoNic
    req.session.data.totalPension = req.session.data.payPeriodOnePension + req.session.data.payPeriodTwoPension

    var dataFreq = req.session.data.payFrequency
    if (dataFreq === 'fortnightly') {
      req.session.data.totalFurlough = Math.round(req.session.data.totalFurlough + (req.session.data.totalFurlough * 0.333333333))
    } else if (dataFreq === 'weekly') {
      // console.log('total here')
      req.session.data.totalFurlough = req.session.data.totalFurlough * 2
      if (req.session.data.totalFurlough > 2500) {
        req.session.data.totalFurlough = 2500
      }
    }
    console.log('total = ' + req.session.data.totalFurlough)

    res.redirect('/' + sprint + '/confirmation')
  })

  // another calculation
  router.post('/' + sprint + '/another-calculation', function (req, res) {
      res.redirect('/' + sprint + '/claim-period-start')
  })

  // clear data and start again
  router.post('/' + sprint + '/route-start-again', function (req, res) {
    var data = req.session.data.restartClaim
    if (data === 'yes') {
      // res.redirect('/' + sprint + '/furlough-start')
      res.redirect('/' + sprint + '/pay-period-question')
    } else if (data === 'no') {
      req.session.data = {}
      req.session.destroy()
      res.redirect('/' + sprint + '/claim-period-start')
    }
  })

  // use pay periods
  router.post('/' + sprint + '/route-pay-periods', function (req, res) {
    var data = req.session.data.usePayPeriods
    if (data === 'yes') {
      res.redirect('/' + sprint + '/furlough-start')
      req.session.data.usePayPeriodsAgain = true
    } else if (data === 'no') {
      req.session.data.usePayPeriodsAgain = false
      req.session.data = {}
      req.session.destroy()
      res.redirect('/' + sprint + '/furlough-start')
    }
  })
}
