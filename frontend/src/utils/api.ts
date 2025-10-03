import axios from "axios";

// Use relative path for API, proxied via Vite
export const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true
});

export async function getNearby(lat: number, lng: number) {
  const res = await apiClient.get(`/data/nearby?lat=${lat}&lng=${lng}&radiusKm=5`);
  return res.data;
}