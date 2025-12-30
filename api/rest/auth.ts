// src/api/authApi.ts
import axios from "axios";
import { api } from "./axiosClient";
export const loginRequest = async (email: string, password: string) => {
  console.log("Logging in with:", email, password);
  // const res = await api.post("/auth/login", { email, password });
  // return res.data;
  try {
    const res = await axios.post("http://10.0.2.2:8080/api/v1/auth/login", { email, password });
  return res.data;
  } catch (error) {
    console.error("Login request failed:", error);
    throw error;
  }
  //
  
};

export const registerRequest = async (formData: any) => {
  const res = await api.post("/auth/register", formData);
  return res.data;
};

export const logoutRequest = async () => {
  return api.post("/auth/logout");
};
