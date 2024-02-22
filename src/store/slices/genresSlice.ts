import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { filmsAPI } from "../../api/api";
import { AxiosResponse } from 'axios';
import { MoviesType, ResponseType } from "./movieSlice";

type FetchGenresMoviesReturnedType = {
    id : number,
    pageCount : number
}
type GenresType = {
    id: number,
    name: string,
}
type GenresStateType = {
    genres: Array<GenresType>,
    genresFilms: Array<MoviesType>,
    pageCount: number
}

export const fetchGenres = createAsyncThunk<Array<GenresType>>(
    'fetchGenres',
    async () => {
        const response: AxiosResponse<GenresStateType> = await filmsAPI.getGenres();

        return response.data.genres
    }
)

export const fetchGenresMovies = createAsyncThunk<Array<MoviesType>, FetchGenresMoviesReturnedType>(
    'fetchGenresMovies',
    async ({id, pageCount}) => {
        const resposne: AxiosResponse<ResponseType> = await filmsAPI.genresFilms(id, pageCount)

        return resposne.data.results
    }
)
const initialState: GenresStateType = {
    genres: [],
    genresFilms: [],
    pageCount: 1
}

const genresSlice = createSlice({
    name: "genresSlice",
    initialState,
    reducers: {
        changePageG(state) {
            state.pageCount = state.pageCount + 1
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGenres.fulfilled, (state, action: PayloadAction<Array<GenresType>>) => {
            state.genres = action.payload
        })
        builder.addCase(fetchGenresMovies.fulfilled, (state, action: PayloadAction<Array<MoviesType>>) => {
            state.genresFilms = action.payload
        })
    }
})

export const { changePageG } = genresSlice.actions
export default genresSlice.reducer