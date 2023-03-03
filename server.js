const mongoose = require("mongoose");
const app = require("./app");

// const { DB_HOST } = process.env;
const DB_HOST =
  "mongodb+srv://AND:pXxaXGDhNpxefyeA@cluster0.bkzm9g6.mongodb.net/contacts_phonebook?retryWrites=true&w=majority";

// process.setMaxListeners(0);

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
