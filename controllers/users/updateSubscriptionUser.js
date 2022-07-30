const { User, joiUpdateSubscriptionSchema } = require("../../models");

const { createError } = require("../../helpers");

const updateSubscriptionUser = async (req, res) => {
  const { error } = joiUpdateSubscriptionSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  res.json(result);
};

module.exports = updateSubscriptionUser;
