import React from 'react'
import { NavLink } from 'react-router-dom'
import { MoviesType } from '../../store/slices/movieSlice'
import { imgUrl } from '../../api/api'
import './FilmsCard.css'

export type FilmsCardPropsType = {
  movie: MoviesType
}

const FilmsCard = ({ movie }: FilmsCardPropsType) => {
  return (
    <div className='card'>
      <h2>{movie.title}</h2>
      <NavLink to={`/movie/${movie.id}`}>
        <img src={imgUrl + movie.poster_path} />
      </NavLink>
    </div>
  )
}

export default FilmsCard