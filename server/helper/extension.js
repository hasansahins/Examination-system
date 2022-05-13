const jwt = require("jsonwebtoken");

// user genererateToken function
// Language: javascript
const generateToken = (user) => {
  const payload = {
    subject: user._id,
    email: user.email,
    role: user.role,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, "examinationsystem2022", options);
};

const decodeToken = (token) => {
  return jwt.verify(token, "examinationsystem2022");
};

const DeleteCookie = (res, cookieName) => {
  res.clearCookie(cookieName);
};

const GetCookie = (req, cookieName) => {
  return req.cookies[cookieName];
};

const SetCookie = (res, [cookieName, value]) => {
  res.cookie(cookieName, value, {
    expires: new Date(Date.now() + 3600 * 1000),
    httpOnly: true,
  });
};

const UpdateCookie = (req, res, cookieName, newValue) => {
  const value = GetCookie(req, cookieName);
  if (value) {
    SetCookie(res, [cookieName, newValue]);
  }
};

module.exports = {
  generateToken,
  decodeToken,
  DeleteCookie,
  SetCookie,
  UpdateCookie,
  GetCookie,
};
