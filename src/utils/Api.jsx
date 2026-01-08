import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

export const getParcelById = async (id) => {
  const res = await api.get(`/parcel/${id}`);
  return res.data;
};
