import { Post } from "../api/index";

export async function Login(email, password) {
  const data = {
    email: email,
    password: password,
  };


  return Post("login", data);
}
