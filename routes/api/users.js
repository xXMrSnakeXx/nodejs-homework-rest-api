const express = require("express");

const ctrl = require("../../controllers/users");

const { auth , upload} = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.signup));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post("/verify", ctrlWrapper(ctrl.resendVerifyEmail));

router.post("/login", ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch("/", auth, ctrlWrapper(ctrl.updateSubscriptionUser));

router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.setAvatar));

module.exports = router;
