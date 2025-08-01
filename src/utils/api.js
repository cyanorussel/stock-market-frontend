// filepath: src/utils/api.js

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const fetchPortfolios = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/portfolios`);
    return response.data;
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    throw error;
  }
};