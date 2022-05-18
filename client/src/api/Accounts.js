import { Post, Get } from "../api/index";

export async function Login(data) {
  return await Post("accounts/login", data);
}

export async function Register(data) {


  return await Post("accounts/register", data);
}

export async function IsLogin() {
  return await Get("accounts/islogin");
}
