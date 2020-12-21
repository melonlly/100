const BaseController = require('../../controller/BaseController')
const baseController = new BaseController()

module.exports = {
    "get /": baseController.root
}