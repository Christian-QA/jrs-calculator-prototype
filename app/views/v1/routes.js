const url = require('url');

module.exports = function (router) {
    // set the sprint folder name as a variable
    var sprint = "v1"



    //route-survey
    router.post('/' + sprint + '/route-frequency', function (req, res) {

        var data = req.session.data.payFrequency

        if (data == 'monthly') {
            req.session.data.payPeriod = 'each month';

        } else if (data == '4Weekly') {
            req.session.data.payPeriod = 'every 4 weeks';
            //console.log("4Weekly");
        } else if (data == 'fortnightly') {
            req.session.data.payPeriod = 'every 2 weeks';
            //console.log("fortnightly");

        } else if (data == 'weekly') {
            req.session.data.payPeriod = 'each week';
           // console.log("");

        }
        res.redirect('/' + sprint + '/pay');

    })
}
