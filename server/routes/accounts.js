const express = require("express");
require("dotenv/config");

const router = express.Router();

const User = require("../models/User");
const Role = require("../models/Role");

const extension = require("../helper/extension");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email, password: password });

  if (!user) {
    return res
      .status(400)
      .json({ message: "E-Posta veya Şifre Hatalı", isLogin: false });
  }

  const role = await Role.findOne({ _id: user.role });
  if (!role) {
    return res.status(200).json({
      message:
        "Yetkilendirme işlemi yapılmamıştır. Lütfen daha sonra tekrar deneyiniz",
    });
  }

  const result = {
    token: extension.generateToken(user),
    isLogin: true,
    email: user.email,
    fullName: user.fullName,
    pages: role.pages,
    _id: user._id,
    settings: user.settings,
  };
  extension.SetCookie(res, [
    process.env.PANEL_COOKIENAME,
    result.token,
    new Date(Date.now() + 2629800000),
  ]);

  res.status(200).json(result);
});

router.post("/register", async (req, res) => {
  const { email, password, fullName } = req.body;
  const newUser = new User({
    email,
    password,
    fullName,
    role: process.env.REGISTER_ROLID,
    settings: "1",
  });

  const user = await newUser.save();

  if (!user) {
    return res.status(404).json({ message: "Kullanıcı oluşturulamadı" });
  }

  const role = await Role.findOne({ _id: user.role });
  if (!role) {
    return res.status(404).json({
      message:
        "Yetkilendirme işlemi yapılmamıştır. Lütfen daha sonra tekrar deneyiniz",
    });
  }

  const result = {
    token: extension.generateToken(user),
    email: user.email,
    fullName: user.fullName,
    _id: user._id,
    settings: user.settings,
    pages: role.pages,
  };

  extension.SetCookie(res, [
    process.env.PANEL_COOKIENAME,
    result.token,
    new Date(Date.now() + 3600000000),
  ]);

  // res.cookie(process.env.PANEL_COOKIENAME, result.token, {
  //   expires: date,
  //   httpOnly: true,
  // });
  res.status(200).json(result);
});

router.get("/islogin", async (req, res) => {
  const token = extension.GetCookie(req, process.env.PANEL_COOKIENAME);
  if (!token)
    return res.status(404).json({ message: "Daha önce oturum açılmamış" });

  const user = extension.decodeToken(token);
  if (!user) return res.status(404).json({ message: "Kullanıcı Bulunamadı" });

  const data = await User.findOne({ email: user.email });
  if (!data)
    return res.status(404).json({ message: "Kullanıcı yetkileri bulunamadı" });

  const role = await Role.findOne({ _id: data.role });
  if (!role) {
    return res.status(404).json({
      message:
        "Yetkilendirme işlemi yapılmamıştır. Lütfen daha sonra tekrar deneyiniz",
    });
  }
  const result = {
    token: extension.generateToken(data),
    isLogin: true,
    email: data.email,
    fullName: data.fullName,
    _id: data._id,
    settings: data.settings,
    pages: role.pages,
  };
  res.status(200).json(result);
});

router.get("/logout", async (req, res) => {
  extension.SetCookie(res, [
    process.env.PANEL_COOKIENAME,
    "",
    new Date(Date.now() - 3600000000),
  ]);
  res.status(200).json(true);
});

module.exports = router;
