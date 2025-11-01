import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/status";
import { 
  fetchAsyncGameDetails, 
  fetchAsyncGames,
  fetchAsyncGameScreenshots 
} from "../utils/gameUtils";

const initialState = {
    games: [],
    gamesStatus: STATUS.IDLE,
    gamesError: null,
    gamesSingle: {},
    gamesSingleStatus: STATUS.IDLE,
    gamesSingleError: null,
    screenshots: [],
    screenshotsStatus: STATUS.IDLE
}

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
      clearGamesError: (state) => {
        state.gamesError = null;
      }
    },
    extraReducers: (builder) => {
        // Fetch All Games
        builder.addCase(fetchAsyncGames.pending, (state) => {
            state.gamesStatus = STATUS.LOADING;
            state.gamesError = null;
        });

        builder.addCase(fetchAsyncGames.fulfilled, (state, action) => {
            state.games = action.payload;
            state.gamesStatus = STATUS.SUCCEEDED;
        });

        builder.addCase(fetchAsyncGames.rejected, (state, action) => {
            state.gamesStatus = STATUS.FAILED;
            state.gamesError = action.error.message;
        });

        // Fetch Game Details
        builder.addCase(fetchAsyncGameDetails.pending, (state) => {
            state.gamesSingleStatus = STATUS.LOADING;
            state.gamesSingleError = null;
        });

        builder.addCase(fetchAsyncGameDetails.fulfilled, (state, action) => {
            state.gamesSingle = action.payload;
            state.gamesSingleStatus = STATUS.SUCCEEDED;
        });

        builder.addCase(fetchAsyncGameDetails.rejected, (state, action) => {
            state.gamesSingleStatus = STATUS.FAILED;
            state.gamesSingleError = action.error.message;
        });

        // Fetch Game Screenshots
        builder.addCase(fetchAsyncGameScreenshots.pending, (state) => {
            state.screenshotsStatus = STATUS.LOADING;
        });

        builder.addCase(fetchAsyncGameScreenshots.fulfilled, (state, action) => {
            state.screenshots = action.payload.results || [];
            state.screenshotsStatus = STATUS.SUCCEEDED;
        });

        builder.addCase(fetchAsyncGameScreenshots.rejected, (state) => {
            state.screenshotsStatus = STATUS.FAILED;
        });
    }
});

export const { clearGamesError } = gameSlice.actions;

// Selectors
export const selectAllGames = (state) => state.game.games.results || [];
export const selectAllGamesStatus = (state) => state.game.gamesStatus;
export const selectGamesError = (state) => state.game.gamesError;
export const selectGamesNextPage = (state) => state.game.games.next;
export const selectGamesPrevPage = (state) => state.game.games.previous;
export const selectGamesCount = (state) => state.game.games.count;
export const selectSingleGame = (state) => state.game.gamesSingle;
export const selectSingleGameStatus = (state) => state.game.gamesSingleStatus;
export const selectGameScreenshots = (state) => state.game.screenshots;
export const selectScreenshotsStatus = (state) => state.game.screenshotsStatus;

export default gameSlice.reducer;