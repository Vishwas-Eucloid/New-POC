const express = require("express");
const router = express.Router();
const { getActiveOffersProducts } = require("../controllers/offers");

router.route("/").get(getActiveOffersProducts);

module.exports = router;
