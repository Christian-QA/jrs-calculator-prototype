// const url = require('url')
var moment = require('moment')
module.exports = function (router) {

  // set the sprint folder name as a variable
  var sprint = 'v2-2'

  // helpers - month converter
  const getMonthName = (titleMonth) => {
    if (titleMonth === 2) {
      return ' February'
    } else if (titleMonth === 1) {
      return ' January'
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

  // final calulation
  function finalCalc(req) {
    if (req.session.data.phaseTwoGenerosityVal === '70%') {
      var rate = 0.7
    } else if (req.session.data.phaseTwoGenerosityVal === '60%') {
      var rate = 0.6
    } else {
      var rate = 0.8
    }
    if (req.session.data.salaryAmount) {
      // reg and var pay calc
      var grossSalary = req.session.data.varySalary

      if (req.session.data.payFrequencyTime === 1) {
        req.session.data.totalPeriod = ((grossSalary / 333) * 30).toFixed(2)
      } else {
        req.session.data.totalPeriod = ((grossSalary / 333) * req.session.data.payFrequencyTime).toFixed(2)
      }

      if (req.session.data.salaryAmount2) {
        req.session.data.totalPeriodOne = (req.session.data.salaryAmount * (5/7)).toFixed(2)
        req.session.data.totalPeriodTwo = (req.session.data.salaryAmount2 * (2/7)).toFixed(2)
      } else {
        req.session.data.totalPeriodOne = req.session.data.salaryAmount
        req.session.data.totalPeriodTwo = 0
      }
      req.session.data.totalMethodOne =  (eval(req.session.data.totalPeriodOne) + eval(req.session.data.totalPeriodTwo)).toFixed(2)
      if (grossSalary) {
        if (req.session.data.totalMethodOne > req.session.data.totalPeriod){

          req.session.data.totalPeriodDays =  req.session.data.totalMethodOne
        } else if (req.session.data.totalPeriod > req.session.data.totalMethodOne) {

          req.session.data.totalPeriodDays = req.session.data.totalPeriod
        }
      } else {
        req.session.data.totalPeriodDays = req.session.data.salaryAmount
      }
      if (req.session.data.parttime === 'yes'){
        req.session.data.totalMethod = ((req.session.data.totalPeriodDays / req.session.data.normalHours) * req.session.data.furloughHours).toFixed(2)
      } else {
        req.session.data.totalMethod = req.session.data.totalPeriodDays
      }

      req.session.data.totalPeriodFurlough = (req.session.data.totalMethod * rate).toFixed(2)
      req.session.data.totalPeriodNic = (req.session.data.totalPeriodFurlough * 0.138).toFixed(2)
      req.session.data.totalPeriodPension = (req.session.data.totalPeriodNic * 0.3).toFixed(2)

      req.session.data.totalToPay =  ((req.session.data.totalMethod * 0.1) * req.session.data.payFrequencyTime).toFixed(2)

    } else if (req.session.data.variableGrossSalary) {
      // Average Daily pay calc
      var grossSalary = req.session.data.variableGrossSalary
      var monthStart = Math.round(req.session.data.employeeStartMonthCalc)
      req.session.data.daysCalc = Math.round((16 - monthStart) * 30)
      req.session.data.totalPeriodDays = ((grossSalary / req.session.data.daysCalc) * req.session.data.payFrequencyTime).toFixed(2)
      if (req.session.data.parttime === 'yes') {
        req.session.data.totalPeriod = ((req.session.data.totalPeriodDays / req.session.data.normalHours) * req.session.data.furloughHours).toFixed(2)
      } else {
        req.session.data.totalPeriod = req.session.data.totalPeriodDays
      }
      req.session.data.totalPeriodFurlough = (req.session.data.totalPeriod * rate).toFixed(2)
      req.session.data.totalPeriodNic = (req.session.data.totalPeriodFurlough * 0.138).toFixed(2)
      req.session.data.totalPeriodPension = (req.session.data.totalPeriodNic * 0.3).toFixed(2)
      req.session.data.totalToPay =  ((req.session.data.totalPeriod * 0.1) * req.session.data.payFrequencyTime).toFixed(2)
    }


    console.log('part time = ' + req.session.data.parttime)
    req.session.data.totalFurlough = (req.session.data.totalPeriodFurlough * req.session.data.periodNumber).toFixed(2)

    req.session.data.totalNic =  (req.session.data.totalPeriodNic * req.session.data.periodNumber).toFixed(2)
    req.session.data.totalPension =  (req.session.data.totalPeriodPension * req.session.data.periodNumber).toFixed(2)

  }

  // set phase two
  router.get('/', function (req, res) {
    req.session.data.phaseTwo = true
    res.redirect('/index')
  })


  // route-claim date
  router.post('/' + sprint + '/route-claim-start', function (req, res) {
    var titleMonth = Math.round(req.session.data.claimPeriodStartMonth)
    req.session.data.claimPeriodStartMonthTitle = getMonthName(titleMonth)
    req.session.data.payClaimPeriodTitle = Math.round(req.session.data.claimPeriodStartDay) + req.session.data.claimPeriodStartMonthTitle
    req.session.data.claimStart = titleMonth + '' + Math.round(req.session.data.claimPeriodStartDay)
    req.session.data.phaseTwo = true
     if (titleMonth > 0 && titleMonth <= 6 ) {
      req.session.data.phaseTwo = false
       req.session.data.phaseOne = true
     }
    if (titleMonth >= 8 ) {
      req.session.data.phaseTwoNicPension = true
      req.session.data.phaseTwoNicInfo = true
    }
    if (titleMonth >= 9 ) {
      req.session.data.phaseTwoNicInfo = false
      req.session.data.phaseTwoGenerosityMonth = "September"
      req.session.data.phaseTwoGenerosityVal = "70%"
    }
    if (titleMonth >= 10 ) {
      req.session.data.phaseTwoGenerosityMonth = "October"
      req.session.data.phaseTwoGenerosityVal = "60%"
    }
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
    if (req.session.data.phaseOne) {
      if (data === 'yes') {
        res.redirect('/' + sprint + '/furlough-end')
      } else if (data === 'no') {
        if (req.session.data.usePayPeriodsAgain) {
          res.redirect('/' + sprint + '/pay-method')
        } else {
          res.redirect('/' + sprint + '/pay-frequency')
        }
      }
    } else {
      if (data === 'no') {
        res.redirect('/' + sprint + '/furlough-end')
      } else {
        if (req.session.data.usePayPeriodsAgain) {
          res.redirect('/' + sprint + '/pay-method')
        } else {
          res.redirect('/' + sprint + '/pay-frequency')
        }
      }
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
      req.session.data.payFrequencyPeriod = 'month'
      req.session.data.payFrequencyTime = 1
    } else if (data === '4Weekly') {
      req.session.data.payFrequencyDisplay = 'every four weeks'
      req.session.data.payFrequencyPeriod = 'days'
      req.session.data.payFrequencyTime = 28
    } else if (data === 'fortnightly') {
      req.session.data.payFrequencyDisplay = 'every two weeks'
      req.session.data.payFrequencyPeriod = 'days'
      req.session.data.payFrequencyTime = 14
    } else if (data === 'weekly') {
      req.session.data.payFrequencyDisplay = 'each week'
      req.session.data.payFrequencyPeriod = 'days'
      req.session.data.payFrequencyTime = 7
    }
    res.redirect('/' + sprint + '/pay-method')
  })

  // route - pay dates
  router.post('/' + sprint + '/route-pay-question', function (req, res) {
    var data = req.session.data.payQuestion
    if (data === 'payRegular') {
      req.session.data.payRegular = 'The employee is paid the same amount each month'
      if (req.session.data.usePayPeriodsAgain) {
        res.redirect('/' + sprint + '/regular-pay-amount')
      } else  {
        res.redirect('/' + sprint + '/pay-dates-1')
      }
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
      if (req.session.data.usePayPeriodsAgain) {
        if ( req.session.data.periodList) {
          req.session.data.periodTitle =  req.session.data.periodList[0].periodStart + ' to ' + req.session.data.periodList[0].periodEnd
        }
        res.redirect('/' + sprint + '/last-year-pay-1')
      } else  {
        res.redirect('/' + sprint + '/pay-dates-1')
      }
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
      req.session.data.lessThan12 = 'false'
      // console.log('more than journey')
    }
    // console.log(req.session.data.employeeStart)
    if (req.session.data.usePayPeriodsAgain) {
      if (req.session.data.varyMoreThan === 'true') {
        if ( req.session.data.periodList) {
          req.session.data.periodTitle =  req.session.data.periodList[0].periodStart + ' to ' + req.session.data.periodList[0].periodEnd
        }
        res.redirect('/' + sprint + '/last-year-pay-1')
      } else {
        res.redirect('/' + sprint + '/annual-pay-amount')
      }
    } else {
      res.redirect('/' + sprint + '/pay-dates-1')
    }
  })

  // route- route partial pay period
  router.post('/' + sprint + '/route-part-pay-period', function (req, res) {
    // res.redirect('/' + sprint + '/topup-question')
    console.log(req.session.data.furloughEndQuestion)

    if (req.session.data.phaseTwo) {
      res.redirect('/' + sprint + '/part-time-question')
    } else {
      res.redirect('/' + sprint + '/topup-question')
    }


  })

  // route- salary
  router.post('/' + sprint + '/route-reg-salary', function (req, res) {
    req.session.data.salaryAmount = req.session.data.salary
    //req.session.data.salaryFurlough = Math.round(req.session.data.salary * 0.8)

    if (req.session.data.phaseTwo) {
      res.redirect('/' + sprint + '/part-time-question')
    } else {
      res.redirect('/' + sprint + '/topup-question')

    }

  })

  // route-part-time-question
  router.post('/' + sprint + '/route-part-time-question', function (req, res) {
    var data = req.session.data.parttime
    if (data === 'yes') {
      res.redirect('/' + sprint + '/part-time-periods')
    } else if (data === 'no') {
      if (req.session.data.phaseTwoNicPension){
        finalCalc(req)
        res.redirect('/' + sprint + '/confirmation')
      } else {
        res.redirect('/' + sprint + '/ni-category-letter')
      }


    }
  })

  // route - route-parttime-period-select
  router.post('/' + sprint + '/route-parttime-period-select', function (req, res) {
    var boxes = req.session.data.periodSelect
    if(req.session.data.periodList){
      req.session.data.periodTitle = req.session.data.periodList[boxes].periodStart + ' to ' + req.session.data.periodList[boxes].periodEnd
    }
    res.redirect('/' + sprint + '/part-time-normal-hours')

  })

  // route - route-parttime-hours
  router.post('/' + sprint + '/route-part-time-hours', function (req, res) {
    req.session.data.furloughHours = req.session.data.normalHours - req.session.data.partTimeHours
    if (req.session.data.phaseTwoNicPension){
      finalCalc(req)
      res.redirect('/' + sprint + '/confirmation')
    } else {
      res.redirect('/' + sprint + '/ni-category-letter')
    }
  })

  // route - route-normal-hours
  router.post('/' + sprint + '/route-normal-hours', function (req, res) {
    res.redirect('/' + sprint + '/part-time-hours')

  })



  // route - pay dates 1
  router.post('/' + sprint + '/route-pay-dates-1', function (req, res) {
    var titleMonth = Math.round(req.session.data.payPeriodOneStartMonth)
    req.session.data.payPeriodOneTitleMonth = getMonthName(titleMonth)
    req.session.data.payPeriodOneTitle = Math.round(req.session.data.payPeriodOneStartDay) + req.session.data.payPeriodOneTitleMonth

    req.session.data.payPeriodOne = titleMonth + '' + Math.round(req.session.data.payPeriodOneStartDay)
    req.session.data.payPeriodStart = Math.round(req.session.data.payPeriodOneStartDay) + 1

    // dummy data if doesn't exist
    if (!req.session.data.claimPeriodEndDay){
      req.session.data.claimPeriodEndDay = '31'
      req.session.data.claimPeriodEndMonthTitle = '7'
      req.session.data.claimPeriodEndMonth = '7'
    }
    if (!req.session.data.payPeriodOneStartDay) {
      req.session.data.payPeriodOneStartDay = '1'
      req.session.data.payPeriodOneTitleMonth = '7'
    }
    if (!req.session.data.payFrequencyTime) {
      req.session.data.payFrequencyTime = '7'
      req.session.data.payFrequencyPeriod = 'days'
    }

   if (req.session.data.payFrequencyTime !=1) {
     var startDate = moment(`2020-${req.session.data.payPeriodOneTitleMonth}-${Math.round(req.session.data.payPeriodOneStartDay)}`).add(1, 'day')
   } else {
     var startDate = moment(`2020-${req.session.data.payPeriodOneTitleMonth}-${Math.round(req.session.data.payPeriodOneStartDay)}`)
   }


    // periods list - use moment.js
    const start = startDate
    const end = moment(`2020-${req.session.data.claimPeriodEndMonthTitle}-${Math.round(req.session.data.claimPeriodEndDay)}`)
    const frequency = req.session.data.payFrequencyTime
    const timeFrame = req.session.data.payFrequencyPeriod
    const periodList = []
    function returnDates(start, end) {
      const f = 'D MMMM'
      if (start >= end) {
        return;
      } else {
        if (timeFrame === 'month') {
          var periodStart = moment(start).add(1, 'day').format(f)
          var periodEnd = moment(start).add(1, timeFrame).format(f)
        } else {
          var periodStart = start.format(f)
          var periodEnd = moment(start).add(frequency - 1, timeFrame).format(f)
        }
        let periodDate = {
          periodStart,
          periodEnd
        }
        periodList.push(periodDate)
        returnDates(start.add(frequency, timeFrame), end)
      }
    }
    returnDates(start,end)
    req.session.data.periodList = periodList
    req.session.data.periodNumber = periodList.length
    // used when predicting dates
    if (req.session.data.payFrequency === 'monthly') {
      res.redirect('/' + sprint + '/pay-dates-2')
    } else {
      //res.redirect('/' + sprint + '/last-pay-date')
      res.redirect('/' + sprint + '/pay-periods-list')
    }


  })

  // route - pay dates 2
  router.post('/' + sprint + '/route-pay-dates-2', function (req, res) {
    var titleMonth = Math.round(req.session.data.payPeriodTwoStartMonth)
    req.session.data.payPeriodTwoTitleMonth = getMonthName(titleMonth)
    req.session.data.payPeriodTwoTitle = Math.round(req.session.data.payPeriodTwoStartDay) + req.session.data.payPeriodTwoTitleMonth
    req.session.data.payPeriodTwo = titleMonth + '' + Math.round(req.session.data.payPeriodTwoStartDay)

    if (titleMonth > Math.round(req.session.data.claimPeriodEndMonth) || titleMonth === Math.round(req.session.data.claimPeriodEndMonth) && Math.round(req.session.data.payPeriodTwoStartDay) >= Math.round(req.session.data.claimPeriodEndDay)) {
      res.redirect('/' + sprint + '/pay-periods-list')
    } else {
      res.redirect('/' + sprint + '/pay-dates-3')
    }
  })

  // route - pay dates 3
  router.post('/' + sprint + '/route-pay-dates-3', function (req, res) {
    var titleMonth = Math.round(req.session.data.payPeriodThreeStartMonth)
    req.session.data.payPeriodThreeStartMonth = getMonthName(titleMonth)
    req.session.data.payPeriodThreeTitle = Math.round(req.session.data.payPeriodThreeStartDay) + req.session.data.payPeriodThreeStartMonth
    req.session.data.payPeriodThree = titleMonth + '' + Math.round(req.session.data.payPeriodThreeStartDay)

    if (titleMonth > Math.round(req.session.data.claimPeriodEndMonth) || titleMonth === Math.round(req.session.data.claimPeriodEndMonth) && Math.round(req.session.data.payPeriodThreeStartDay) >= Math.round(req.session.data.claimPeriodEndDay)) {
      res.redirect('/' + sprint + '/pay-periods-list')
    } else {
      res.redirect('/' + sprint + '/pay-dates-4')
    }
  })

  // route - pay dates 4
  router.post('/' + sprint + '/route-pay-dates-4', function (req, res) {
    var titleMonth = Math.round(req.session.data.payPeriodFourStartMonth)
    req.session.data.payPeriodFourStartMonth = getMonthName(titleMonth)
    req.session.data.payPeriodFourTitle = Math.round(req.session.data.payPeriodFourStartDay) + req.session.data.payPeriodFourStartMonth
    req.session.data.payPeriodFour = titleMonth + '' + Math.round(req.session.data.payPeriodFourStartDay)

    if (titleMonth > Math.round(req.session.data.claimPeriodEndMonth) || titleMonth === Math.round(req.session.data.claimPeriodEndMonth) && Math.round(req.session.data.payPeriodFourStartDay) >= Math.round(req.session.data.claimPeriodEndDay)) {
      res.redirect('/' + sprint + '/pay-periods-list')
    } else {
      res.redirect('/' + sprint + '/pay-dates-5')
    }

  })

  // route - pay dates 5
  router.post('/' + sprint + '/route-pay-dates-5', function (req, res) {
    var titleMonth = Math.round(req.session.data.payPeriodFiveStartMonth)
    req.session.data.payPeriodFiveStartMonth = getMonthName(titleMonth)
    req.session.data.payPeriodFiveTitle = Math.round(req.session.data.payPeriodFiveStartDay) + req.session.data.payPeriodFiveStartMonth
    req.session.data.payPeriodFive = titleMonth + '' + Math.round(req.session.data.payPeriodFiveStartDay)

    if (titleMonth > Math.round(req.session.data.claimPeriodEndMonth) || titleMonth === Math.round(req.session.data.claimPeriodEndMonth) && Math.round(req.session.data.payPeriodFiveStartDay) >= Math.round(req.session.data.claimPeriodEndDay)) {
      res.redirect('/' + sprint + '/pay-periods-list')
    } else {
      res.redirect('/' + sprint + '/pay-dates-6')
    }
  })
  // route - pay dates 6
  router.post('/' + sprint + '/route-pay-dates-6', function (req, res) {
    var titleMonth = Math.round(req.session.data.payPeriodSixStartMonth)
    req.session.data.payPeriodSixStartMonth = getMonthName(titleMonth)
    req.session.data.payPeriodSixTitle = Math.round(req.session.data.payPeriodSixStartDay) + req.session.data.payPeriodSixStartMonth
    req.session.data.payPeriodSix = titleMonth + '' + Math.round(req.session.data.payPeriodSixStartDay)
    res.redirect('/' + sprint + '/pay-periods-list')
  })

  // route - pay date
  router.post('/' + sprint + '/route-last-pay-date', function (req, res) {
    req.session.data.payTaxDate = req.session.data.payDateDay + '/' + req.session.data.payDateMonth + '/' + req.session.data.payDateYear
    var titleMonth = Math.round(req.session.data.payDateMonth)
    req.session.data.payDateMonthTitle = getMonthName(titleMonth)
    req.session.data.payTaxDateTitle = Math.round(req.session.data.payDateDay) + req.session.data.payDateMonthTitle

    if (req.session.data.varyMoreThan === 'true') {
          if ( req.session.data.periodList) {
            req.session.data.periodTitle =  req.session.data.periodList[0].periodStart + ' to ' + req.session.data.periodList[0].periodEnd
          }
            res.redirect('/' + sprint + '/last-year-pay-1')
          } else if (req.session.data.lessThan12 === 'true') {
            res.redirect('/' + sprint + '/annual-pay-amount')
          } else {
            res.redirect('/' + sprint + '/regular-pay-amount')
          }

  })

  // route-list-periods - not used at the moment
  router.post('/' + sprint + '/route-list-periods', function (req, res) {
    var data = req.session.data.listPeriods
    if (data === 'yes') {
      if ( req.session.data.periodList) {
        req.session.data.periodTitle = req.session.data.periodList[0].periodEnd
      }
      res.redirect('/' + sprint + '/last-pay-date')

    } else  {
      res.redirect('/' + sprint + '/pay-dates-1')
    }
  })

  // route-vary-salary-1
  router.post('/' + sprint + '/route-vary-salary-1', function (req, res) {
    req.session.data.salaryAmount = req.session.data.salary
    req.session.data.salaryFurlough = Math.round(req.session.data.salary * 0.8)
    if ( req.session.data.periodList === undefined) {
      res.redirect('/' + sprint + '/annual-pay-amount')
    } else if (req.session.data.periodList[1]) {
        req.session.data.periodTitle =  req.session.data.periodList[1].periodStart + ' to ' + req.session.data.periodList[1].periodEnd

      res.redirect('/' + sprint + '/last-year-pay-2')
    } else {
      res.redirect('/' + sprint + '/annual-pay-amount')
    }

  })
  // route-vary-salary-2
  router.post('/' + sprint + '/route-vary-salary-2', function (req, res) {
    req.session.data.salaryAmount2 = req.session.data.salary2
    req.session.data.salaryFurlough2 = Math.round(req.session.data.salary2 * 0.8)
    if ( req.session.data.periodList[2] === undefined) {
      res.redirect('/' + sprint + '/annual-pay-amount')
    } else if (req.session.data.periodList[2]){
      req.session.data.periodTitle =  req.session.data.periodList[2].periodStart + ' to ' + req.session.data.periodList[2].periodEnd
      res.redirect('/' + sprint + '/last-year-pay-3')
    } else {
      res.redirect('/' + sprint + '/annual-pay-amount')
    }
  })
  // route-vary-salary-3
  router.post('/' + sprint + '/route-vary-salary-3', function (req, res) {
    var dataFreq = req.session.data.payFrequency
    if ( req.session.data.periodList[3] === undefined) {
      res.redirect('/' + sprint + '/annual-pay-amount')
    } else if (req.session.data.periodList[3]){
      req.session.data.periodTitle =  req.session.data.periodList[3].periodStart + ' to ' + req.session.data.periodList[3].periodEnd
      res.redirect('/' + sprint + '/last-year-pay-4')
    } else {
      res.redirect('/' + sprint + '/annual-pay-amount')
    }
  })
  // route-vary-salary-4
  router.post('/' + sprint + '/route-vary-salary-4', function (req, res) {
    if ( req.session.data.periodList[4] === undefined) {
      res.redirect('/' + sprint + '/annual-pay-amount')
    } else if (req.session.data.periodList[4]){
      req.session.data.periodTitle =  req.session.data.periodList[4].periodStart + ' to ' + req.session.data.periodList[4].periodEnd
      res.redirect('/' + sprint + '/last-year-pay-5')
    } else {
      res.redirect('/' + sprint + '/annual-pay-amount')
    }
  })

  // route-vary-salary-5
  router.post('/' + sprint + '/route-vary-salary-5', function (req, res) {
    if ( req.session.data.periodList[5] === undefined) {
      res.redirect('/' + sprint + '/annual-pay-amount')
    } else if (req.session.data.periodList[5]){
      req.session.data.periodTitle =  req.session.data.periodList[5].periodStart + ' to ' + req.session.data.periodList[5].periodEnd
      res.redirect('/' + sprint + '/last-year-pay-6')
    } else {
      res.redirect('/' + sprint + '/annual-pay-amount')
    }
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
      if (req.session.data.phaseTwo) {
        res.redirect('/' + sprint + '/part-time-question')
      } else {
        res.redirect('/' + sprint + '/topup-question')
      }


    } else {
      res.redirect('/' + sprint + '/variable-pay-partial-pay-amount')
    }
  })

  // route - nic category
  router.post('/' + sprint + '/route-nic', function (req, res) {
    var data = req.session.data.nicCategory

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
    var boxes = req.session.data.periodSelect
    if(req.session.data.periodList){
      req.session.data.periodTitle = req.session.data.periodList[boxes].periodEnd
    }
    res.redirect('/' + sprint + '/additional-pay-amount')
  })

  // route - top up select
  router.post('/' + sprint + '/route-discretionary-amount', function (req, res) {
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
    var boxes = req.session.data.periodSelect
    console.log(boxes)
    if(req.session.data.periodList){
      req.session.data.periodTitle = req.session.data.periodList[boxes].periodEnd
    }
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

    // set date
    //req.session.data.Today = moment().format("D MMMM YYYY")
    finalCalc(req)
    res.redirect('/' + sprint + '/confirmation')
  })

  // another calculation
  router.post('/' + sprint + '/another-calculation', function (req, res) {
      // For persisting pay periods
     res.redirect('/' + sprint + '/claim-period-question')
   //res.redirect('/' + sprint + '/claim-period-start')
  })

  // clear data and start again
  router.post('/' + sprint + '/route-start-again', function (req, res) {
    var data = req.session.data.restartClaim
    if (data === 'yes') {
      // res.redirect('/' + sprint + '/furlough-start')
      req.session.data.phaseTwo = true
      res.redirect('/' + sprint + '/furlough-period-question')
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
      req.session.data.usePayPeriodsAgain = true
      res.redirect('/' + sprint + '/pay-method')
    } else if (data === 'no') {
      req.session.data.usePayPeriodsAgain = false
      req.session.data = {}
      //req.session.destroy()
      req.session.data.hideBackButton = true
      res.redirect('/' + sprint + '/pay-frequency')
    }
  })
  // use useFurloughPeriodsAgain
  router.post('/' + sprint + '/route-furlough-periods', function (req, res) {
    var data = req.session.data.useFurloughPeriods
    if (data === 'yes') {
      req.session.data.useFurloughPeriodsAgain = true
      res.redirect('/' + sprint + '/pay-period-question')
    } else if (data === 'no') {
      req.session.data.useFurloughPeriodsAgain = false
      req.session.data = {}
      //req.session.destroy()
      req.session.data.hideBackButton = true
      res.redirect('/' + sprint + '/furlough-start')
    }
  })
}
