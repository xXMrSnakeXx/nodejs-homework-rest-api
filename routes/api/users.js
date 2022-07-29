const express = require("express");

const ctrl = require("../../controllers/users");

const { auth } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.signup));

router.post("/login", ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch("/", auth, ctrlWrapper(ctrl.updateSubscriptionUser));

module.exports = router;
