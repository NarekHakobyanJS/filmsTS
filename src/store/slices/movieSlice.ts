import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { filmsAPI } from "../../api/api";
import { AxiosResponse } from 'axios'
import { refType } from "../../componetns/Movie/Movie";

export type ResponseType = {
    page: number,
    results: Array<MoviesType>,
    total_results: number,
    total_pages: number
}

export type MoviesType = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
}

export type MoviesStateType = {
    movies: Array<MoviesType>,
    pageCount: number,
    isLoading: boolean,
    movie: MoviesType | null,
    searchMovies: Array<MoviesType>,
    text: string
}

export type VideoType = {
    movieId: string | undefined,
    iframe: refType
}
export type Obj = {
    id: number,
    results: Array<VideoData>
}



export type VideoData = {
    id: string,
    iso_639_1: string,
    iso_3166_1: string,
    key: string,
    name: string,
    official: boolean,
    published_at: string,
    site: string
    size: number,
    type: string
}


export const fetchMoives = createAsyncThunk<Array<MoviesType>, number>(
    'fetchMoives',
    async (pageCount: number) => {
        const response: AxiosResponse<ResponseType> = await filmsAPI.getMovies(pageCount);
        return response.data.results
    }
)

export const fetchMovie = createAsyncThunk<MoviesType, string | undefined>(
    'fetchMovie',
    async (id: string | undefined) => {
        const response: AxiosResponse<MoviesType> = await filmsAPI.getOneMovie(id)

        return response.data
    }
)

export const fetchSearch = createAsyncThunk<Array<MoviesType>, string>(
    'fetchSearch',
    async (text: string) => {
        const response: AxiosResponse<ResponseType> = await filmsAPI.getSearch(text);

        return response.data.results
    }
)

export const fetchTrailer = createAsyncThunk<void, VideoType>(
    'fetchTrailer',
    async ({ movieId, iframe }: VideoType) => {
        const res: AxiosResponse<Obj> = await filmsAPI.getTrailer(movieId)

        res.data.results.forEach((elm: VideoData) => {
            if (elm.name === "Official Trailer") {
                iframe?.current?.setAttribute(
                    "src",
                    `https://www.youtube.com/embed/${elm.key}`
                );
            } else {
                iframe?.current?.setAttribute(
                    "src",
                    `https://www.youtube.com/embed/${elm.key}`
                );
            }
        })

    }
)

const initialState: MoviesStateType = {
    movies: [],
    pageCount: 1,
    isLoading: false,
    movie: null,
    searchMovies: [],
    text: ''
}

const movieSlcie = createSlice({
    name: 'movieSlcie',
    initialState,
    reducers: {
        changePage(state) {
            state.pageCount = state.pageCount + 1
        },
        changeText(state, action) {
            state.text = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMoives.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchMoives.fulfilled, (state, action: PayloadAction<Array<MoviesType>>) => {
            state.movies = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchMovie.pending, (state, action: PayloadAction<any>) => {
            state.isLoading = true
        })
        builder.addCase(fetchMovie.fulfilled, (state, action: PayloadAction<MoviesType>) => {
            state.movie = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchSearch.fulfilled, (state, action: PayloadAction<Array<MoviesType>>) => {
            state.searchMovies = action.payload
        })
    }
});

export const { changePage, changeText } = movieSlcie.actions
export default movieSlcie.reducer