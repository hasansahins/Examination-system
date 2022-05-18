import axios from "axios";
const baseUrl = "http://localhost:3030/";
const options = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
};
export async function Get(url) {
  return await axios.get(baseUrl + url, options);
}

export async function GetWithParams(url) {
  return await axios.get(baseUrl + url, options);
}

export async function Post(url, data) {
  return await axios.post(baseUrl + url, data, options);
}

export async function Put(url, data) {
  return await axios.put(baseUrl + url, data, options);
}

export async function Delete(url) {
  return await axios.delete(baseUrl + url, options);
}
