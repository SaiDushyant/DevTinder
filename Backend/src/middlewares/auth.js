const adminAuth = (req, res, next) => {
  console.log("The Admin Auth is being used");
  const token = "abc";
  const isAdminAuthorized = token === "abc";
  if (!isAdminAuthorized) {
    res.status(401).send("Access denied");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("The User Auth is being used");
  const token = "abc";
  const isUserAuthorized = token === "abc";
  if (!isUserAuthorized) {
    res.status(401).send("Access denied");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
