import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { apiURL } from "../../constants";
import { API_KEY } from "../../api/api_key";

// Fetch games with filters
export const fetchAsyncGames = createAsyncThunk(
  'games/fetch', 
  async (params = {}) => {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams({
        key: API_KEY,
        page: params.page || 1,
        page_size: params.pageSize || 20,
        ...(params.search && { search: params.search }),
        ...(params.ordering && { ordering: params.ordering }),
        ...(params.platforms && { platforms: params.platforms }),
        ...(params.dates && { dates: params.dates }),
      });

      const { data } = await axios.get(
        `${apiURL.gamesURL}?${queryParams.toString()}`
      );
      
      return data;
    } catch (error) {
      console.error("Error fetching games:", error);
      throw error;
    }
  }
);

// Fetch single game details
export const fetchAsyncGameDetails = createAsyncThunk(
  'game/details/fetch', 
  async (id) => {
    try {
      const { data } = await axios.get(
        `${apiURL.gamesURL}/${id}?key=${API_KEY}`
      );
      return data;
    } catch (error) {
      console.error("Error fetching game details:", error);
      throw error;
    }
  }
);

// Fetch game screenshots
export const fetchAsyncGameScreenshots = createAsyncThunk(
  'game/screenshots/fetch',
  async (id) => {
    try {
      const { data } = await axios.get(
        `${apiURL.gamesURL}/${id}/screenshots?key=${API_KEY}`
      );
      return data;
    } catch (error) {
      console.error("Error fetching screenshots:", error);
      throw error;
    }
  }
);