import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com/";

export function Get(url) {
  return axios.get(baseUrl + url);
}

export function GetWithParams(url, params) {
  return axios.get(baseUrl + url, { params: params });
}

export function Post(url, data) {
  console.log("Post", "url:", url, "params,", data);

  return axios.post(baseUrl + url, { data: data });
}
