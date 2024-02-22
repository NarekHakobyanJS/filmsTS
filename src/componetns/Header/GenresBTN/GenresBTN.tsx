import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchGenresMovies } from '../../../store/slices/genresSlice'

import './GenresBTN.css'
type GenresBTNPropsType = {
    genre: {
        id: number,
        name: string
    }
}

const GenresBTN = ({ genre }: GenresBTNPropsType) => {
    const dispatch = useAppDispatch();
    const {pageCount} = useAppSelector((state) => state.genresData)
    const getMovieGenre = (id: number) => {
        dispatch(fetchGenresMovies({id, pageCount}))
    }
    return (
        <button onClick={() => getMovieGenre(genre.id)} className='genresBTN'>
            <NavLink to={`/genere/${genre.name}`}>{genre.name}</NavLink>
        </button>
    )
}

export default GenresBTN