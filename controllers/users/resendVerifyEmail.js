const { User, joiEmailSchema } = require("../../models");

const { createError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const { error } = joiEmailSchema.validate({ email });
  if (error) {
    throw createError(400, error.message);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404);
  }
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }
  const data = {
    to: email,
    subject: "Verification email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click to confirm registration</a>`,
  };
  await sendEmail(data);
  res.json({
    message: "Verification email sent",
  });
};
module.exports = resendVerifyEmail;
