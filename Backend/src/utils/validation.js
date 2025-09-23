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

const validateProfileEditData = async (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailID",
    "image",
    "gender",
    "age",
    "skills",
  ];

  const isAllowed = Object.keys(req.body).every((field) => {
    allowedEditFields.includes(field);
  });

  return isAllowed;
};

module.exports = { validateSignupData, validateProfileEditData };
