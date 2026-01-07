import axios from "axios";
import type { Guest } from "../types/guest";

const API = import.meta.env.VITE_BASE_URL;
console.log("VITE_BASE_URL =", import.meta.env.VITE_BASE_URL);

export const searchGuests = async (search: string): Promise<Guest[]> => {
  const res = await axios.get(`${API}/guests?search=${search}`);
  
  return res.data.payload;
};

export const confirmRSVP = async (
  guestId: string,
  data: Partial<Guest>
) => {
  return axios.patch(`${API}/guests/${guestId}/rsvp`, data);
  
};
