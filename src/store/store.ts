import { configureStore } from "@reduxjs/toolkit";
import genresSlice from "./slices/genresSlice";
import movieSlice from "./slices/movieSlice";

const store = configureStore({
    reducer : {
        genresData : genresSlice,
        moviesData : movieSlice 
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store