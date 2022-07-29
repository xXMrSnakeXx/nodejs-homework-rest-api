const express = require("express");

const ctrl = require("../../controllers/contacts");

const { auth } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/",auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId",auth, ctrlWrapper(ctrl.getContactById));

router.post("/",auth, ctrlWrapper(ctrl.addContact));

router.put("/:contactId",auth, ctrlWrapper(ctrl.updateContact));

router.patch("/:contactId/favorite",auth, ctrlWrapper(ctrl.updateStatusContact));

router.delete("/:contactId",auth, ctrlWrapper(ctrl.removeContact));

module.exports = router;
