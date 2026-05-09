import axios from "axios";

const BASE_URL = "http://localhost:8081/api/auth";

export const signup = (data) => axios.post(`${BASE_URL}/signup`, data);

export const login = (data) => axios.post(`${BASE_URL}/login`, data);

export const getUser = (email) =>
  axios.get(`${BASE_URL}/home/${email}`);