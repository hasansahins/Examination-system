const express = require("express");
require("dotenv/config");

const router = express.Router();

const User = require("../models/User");
const Role = require("../models/Role");

const extension = require("../helper/extension");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(404).json({ message: "E-Posta veya Şifre Hatalı" });
  }

  const pages = await Role.findOne({ _id: user.role });
  if (!pages) {
    return res.status(404).json({
      message:
        "Yetkilendirme işlemi yapılmamıştır. Lütfen daha sonra tekrar deneyiniz",
    });
  }

  const result = {
    token: extension.generateToken(user),
    email: user.email,
    fullName: user.fullName,
    pages: pages,
  };

  res.status(200).json(extension.SetCookie(res, [ process.env.PANEL_COOKIENAME, result.token]));
});

router.post("/register", async (req, res) => {
  const { email, password, fullName } = req.body;

  const newUser = new User({
    email,
    password,
    fullName,
    role: process.env.REGISTER_ROLID,
  });

  const user = await user.save();

  if (!createUser) {
    return res.status(404).json({ message: "Kullanıcı oluşturulamadı" });
  }

  const pages = await Role.findOne({ _id: user.role });
  if (!pages) {
    return res.status(404).json({
      message:
        "Yetkilendirme işlemi yapılmamıştır. Lütfen daha sonra tekrar deneyiniz",
    });
  }

  const result = {
    token: extension.generateToken(user),
    email: user.email,
    fullName: user.fullName,
    pages: pages,
  };

  res.status(200).json(extension.SetCookie(res, [ process.env.PANEL_COOKIENAME, result.token]));
});

module.exports = router;
