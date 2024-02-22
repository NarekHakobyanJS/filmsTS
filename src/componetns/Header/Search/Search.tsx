import React from 'react'
import { MoviesType } from '../../../store/slices/movieSlice'
import './Search.css'
import { imgUrl } from '../../../api/api'
import { NavLink } from 'react-router-dom'

export type SearchPropsType = {
    movie : MoviesType
}

const Search = ({movie} : SearchPropsType) => {
  return (
    <NavLink to={`/movie/${movie.id}`} className='s-b'>
        <img src={imgUrl + movie.poster_path} />
        <h3>{movie.title}</h3>
    </NavLink>
  )
}

export default Search