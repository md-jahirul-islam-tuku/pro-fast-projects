import axios from "axios";
import { getAuth } from "firebase/auth";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

// for verifyFirebaseToken
api.interceptors.request.use(async (config) => {
  const user = getAuth().currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getParcelById = async (id) => {
  const res = await api.get(`/parcel/${id}`);
  return res.data;
};

// Get user by email
export const getUserByEmail = async (email) => {
  if (!email) return null;

  const res = await api.get(`/users/${email}`);
  return res.data.data; // IMPORTANT: always return something
};
