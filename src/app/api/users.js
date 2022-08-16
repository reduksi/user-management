import axios from "axios";

const baseURL = "https://fakestoreapi.com";

export function getUsers() {
  return axios.get(`${baseURL}/users`);
}

export function deleteUser(id) {
  return axios.delete(`${baseURL}/users/${id}`);
}

export function updateUser(id, data) {
  return axios.put(`${baseURL}/users/${id}`, data);
}

export function addUser(data) {
  return axios.post(`${baseURL}/users`, data);
}
export function login(data) {
  return axios.post(`${baseURL}/auth/login`, data);
}
