const experss = require("express")
const router = experss.Router()
const {getPrivateData} = require("../controllers/private")
const {protect} = require("../middleware/auth")
router.route("/").get(protect,getPrivateData)

module.exports = router