const url = require('url')

module.exports = function (router) {
  // set the sprint folder name as a variable
  var sprint = 'v1-1'

  // route-claim date
  router.post('/' + sprint + '/route-claim', function (req, res) {
    // var data = req.session.data.payFrequency
    res.redirect('/' + sprint + '/salary-question')
  })

  // route - pay dates
  router.post('/' + sprint + '/route-salary-question', function (req, res) {
    // var data = req.session.data.payFrequency
    res.redirect('/' + sprint + '/salary')
  })

  // route- salary
  router.post('/' + sprint + '/route-salary', function (req, res) {
    // var data = req.session.data.payFrequency
    res.redirect('/' + sprint + '/pay-frequency')
  })

  // route-pay frequency
  router.post('/' + sprint + '/route-frequency', function (req, res) {
    var data = req.session.data.payFrequency
    if (data === 'monthly') {
      req.session.data.payPeriod = 'each month'
    } else if (data === '4Weekly') {
      req.session.data.payPeriod = 'every 4 weeks'

    } else if (data === 'fortnightly') {
      req.session.data.payPeriod = 'every 2 weeks'
    } else if (data === 'weekly') {
      req.session.data.payPeriod = 'each week'
    }
    res.redirect('/' + sprint + '/pay-dates')
  })

  // route - pay dates
  router.post('/' + sprint + '/route-pay-dates', function (req, res) {
    // var data = req.session.data.payFrequency
    res.redirect('/' + sprint + '/pay-dates-list')
    // res.redirect('/' + sprint + '/furlough-question')
  })

  // route - another-pay-date
  router.post('/' + sprint + '/another-pay-date', function (req, res) {
    var data = req.session.data.anotherDate
    if (data === 'yes') {
      req.session.data.extraDate = 'true';
      res.redirect('/' + sprint + '/pay-dates')
    } else {
      res.redirect('/' + sprint + '/furlough-question')
    }



  })

  // route - fulrough question
  router.post('/' + sprint + '/route-furlough-question', function (req, res) {
    // var data = req.session.data.payFrequency
    res.redirect('/' + sprint + '/nic-category')
  })

  // route - nic category
  router.post('/' + sprint + '/route-nic', function (req, res) {
    // var data = req.session.data.payFrequency
    res.redirect('/' + sprint + '/pension')
  })

  // route - pension
  router.post('/' + sprint + '/route-pension', function (req, res) {
    // var data = req.session.data.payFrequency
    res.redirect('/' + sprint + '/confirmation')
  })
}
