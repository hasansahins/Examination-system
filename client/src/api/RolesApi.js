import { Post, Get,Delete } from "../api/index";

export async function List() {
  return await Get("roles");
}

export async function RoleDetail(id) {
  return await Get("roles/" + id);
}

export async function CreateOrUpdate(data) {
  return await Post("roles", data);
}

export async function DeleteRole(id) {
  return await Delete("roles/" + id);
}