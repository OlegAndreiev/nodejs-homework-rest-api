const { Contact, schemas } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  return result;
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { error } = schemas.addSchema.validate(req.body);
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (error) {
    return res.status(400).json({
      message: "missing field favorite",
    });
  }
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success" });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  removeContact: ctrlWrapper(removeContact),
};

// const Joi = require("joi");
// const contacts = require("../models/contacts");

// const { ctrlWrapper } = require("../helpers");
// // const { HttpError, ctrlWrapper } = require("../helpers");

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

// const listContacts = async (req, res) => {
//   const result = await contacts.listContacts();
//   res.json(result);
// };

// const getContactById = async (req, res) => {
//   const { id } = req.params;
//   const result = await contacts.getContactById(id);
//   if (!result) {
//     return res.status(404).json({
//       message: "Not found",
//     });
//   }
//   res.json(result);
// };

// const addContact = async (req, res) => {
//   const { error } = addSchema.validate(req.body);
//   if (error) {
//     // throw HttpError(400, error.message);
//     return res.status(400).json({
//       message: "missing required name field",
//     });
//   }
//   const result = await contacts.addContact(req.body);
//   res.status(201).json(result);
// };

// const updateContact = async (req, res) => {
//   const { error } = addSchema.validate(req.body);
//   if (error) {
//     // throw HttpError(400, error.message);
//     return res.status(400).json({
//       message: "missing fields",
//     });
//   }
//   const { id } = req.params;
//   const result = await contacts.updateContact(id, req.body);
//   if (!result) {
//     // throw HttpError(404, "Not found");
//     return res.status(404).json({
//       message: "Not found",
//     });
//   }
//   res.json(result);
// };

// const removeContact = async (req, res) => {
//   const { id } = req.params;
//   const result = await contacts.removeContact(id);
//   if (!result) {
//     // throw HttpError(404, "Not found");
//     return res.status(404).json({
//       message: "Not found",
//     });
//   }
//   // res.status(204).send()
//   res.json({
//     message: "contact deleted",
//   });
// };

// module.exports = {
//   listContacts: ctrlWrapper(listContacts),
//   getContactById: ctrlWrapper(getContactById),
//   addContact: ctrlWrapper(addContact),
//   updateContact: ctrlWrapper(updateContact),
//   removeContact: ctrlWrapper(removeContact),
// };
