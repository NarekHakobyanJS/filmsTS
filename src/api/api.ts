import axios from "axios";
export const imgUrl = "https://image.tmdb.org/t/p/w500/";

const apiKey = 'f36f23edf6e10fd2ddcf939916b1f67a';
const instance = axios.create({
    baseURL : 'https://api.themoviedb.org/3/',
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM4NjNiZjI5MWY1NjUxOTAyYmIzYWY4MjI1NmUwMiIsInN1YiI6IjYxNTYyZWY2ZTE4Yjk3MDA2MjkyODgzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h_pBSpt1JQsgAdYyYZbt6dHDzEmGljF11e4m1MO-CHg",
    },
})

export const filmsAPI = {
    getGenres(){
        return instance.get(`genre/movie/list?api_key=${apiKey}&language=en-US`)
    },
    genresFilms(id : number, pageCount : number){
        return instance.get(`discover/movie?api_key=${apiKey}&language=en-US&with_genres=${id}&page=${pageCount}`)
    },
    getMovies(pageNumber : number){
        return instance.get(`discover/movie?api_key=${apiKey}&language=en-US&page=${pageNumber}`)
    },
    getOneMovie(id : string | undefined){
        return instance.get(`movie/${id}?api_key=${apiKey}&language=en-US`)
    },
    getSearch(text : string){
        return instance.get(`/search/movie?api_key=${apiKey}&query=${text}`)
    },
    getTrailer(movieId : string | undefined){
        return instance.get(`/movie/${movieId}/videos?language=en-US`)
    }
}