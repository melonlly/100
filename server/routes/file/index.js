const FileController = require('../../controller/FileController')
const fileController = new FileController()

module.exports = {
    "post /upload": fileController.upload,
    "post /download": fileController.download
}