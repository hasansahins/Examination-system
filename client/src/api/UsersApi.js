import { Post, Get } from "../api/index";



export async function List() {
  return await Get("users");
}

export async function UserDetail(id) {
  return await Get("users/" + id);
}

export async function CreateOrUpdate(data) {
  return await Post("users", data);
}
