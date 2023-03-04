const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchemas = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamp: true }
);

const schemas = {
  addSchema,
  updateFavoriteSchemas,
};

const Contact = model("contact", contactSchema);

contactSchema.post("save", handleMongooseError);

module.exports = { schemas, Contact };

// const fs = require("fs/promises");
// const path = require("path");
// const contactsPath = path.join(__dirname, "contacts.json");

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// };

// const getContactById = async (id) => {
//   const contactId = String(id);
//   const contacts = await listContacts();
//   const result = contacts.find((item) => item.id === contactId);
//   return result || null;
// };

// const addContact = async (data) => {
//   const contacts = await listContacts();
//   const newContactId = String(Number(contacts[contacts.length - 1].id) + 1);
//   console.log(newContactId);
//   const newContact = {
//     id: newContactId,
//     ...data,
//   };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// const updateContact = async (id, data) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id, ...data };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[index];
// };

// const removeContact = async (id) => {
//   const contactId = String(id);
//   const contacts = await listContacts();
//   const index = contacts.findIndex((item) => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   addContact,
//   updateContact,
//   removeContact,
// };
