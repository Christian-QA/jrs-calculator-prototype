const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
require('./views/v1/routes')(router)
require('./views/v1-1/routes')(router)
require('./views/v1-2/routes')(router)
require('./views/v1-3/routes')(router)
require('./views/v1-4/routes')(router)

module.exports = router


