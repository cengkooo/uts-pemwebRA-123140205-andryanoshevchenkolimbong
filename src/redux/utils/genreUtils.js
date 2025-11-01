import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { apiURL } from "../../constants";
import { API_KEY } from "../../api/api_key";

export const fetchAsyncGenres = createAsyncThunk(
  'genres/fetch', 
  async (page = 1) => {
    try {
      const { data } = await axios.get(
        `${apiURL.genresURL}?key=${API_KEY}&page=${page}`
      );
      return data;
    } catch (error) {
      console.error("Error fetching genres:", error);
      throw error;
    }
  }
);