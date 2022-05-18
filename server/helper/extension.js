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
    expiresIn: "30d",
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

const SetCookie = (res, [cookieName, value,date]) => {
  console.log("date",date);
  res.cookie(cookieName, value, {
    expires: date,
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
