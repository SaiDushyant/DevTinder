const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailID, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name not valid");
  } else if (!validator.isEmail(emailID)) {
    throw new Error("Email not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

module.exports = { validateSignupData };
