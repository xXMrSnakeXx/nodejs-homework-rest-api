const { Contact, addSchema, updateFavoriteSchema } = require("./contact");

const {
  User,
  joiSignupSchema,
  joiLoginSchema,
  joiUpdateSubscriptionSchema,
} = require("./user");

module.exports = {
  Contact,
  addSchema,
  updateFavoriteSchema,
  User,
  joiSignupSchema,
  joiLoginSchema,
  joiUpdateSubscriptionSchema,
};
