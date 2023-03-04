const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchemas),
  ctrl.updateFavorite
);

router.delete("/:contactId", isValidId, ctrl.removeContact);

module.exports = router;

// const express = require("express");
// const ctrl = require("../../controllers/contacts");
// const { validateBody } = require("../../middlewares");
// const schemas = require("../../schemas/contacts");
// const router = express.Router();

// router.get("/", ctrl.listContacts);

// router.get("/:id", ctrl.getContactById);

// router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

// router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContact);

// router.delete("/:id", ctrl.removeContact);

// module.exports = router;
