const bcrypt = require("bcryptjs");

const gravatar = require("gravatar");

const { v4 } = require("uuid");

const { User, joiSignupSchema } = require("../../models");

const { createError, sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { error } = joiSignupSchema.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const data = {
    to: email,
    subject: "Verification email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to confirm registration</a>`,
  };
  await sendEmail(data);
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = signup;
