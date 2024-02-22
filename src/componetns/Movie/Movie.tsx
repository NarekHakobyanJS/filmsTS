import React, { useRef, useEffect } from 'react'
import { MoviesType } from '../../store/slices/movieSlice'
import { imgUrl } from '../../api/api'
import { RiArrowGoBackLine } from 'react-icons/ri'
import './Movie.css'
import { useNavigate } from 'react-router-dom'
import {fetchTrailer} from  '../../store/slices/movieSlice';
import { useAppDispatch } from '../../store/hooks'

export type MoviePropsType = {
    movie: MoviesType | null,
    movieId : string | undefined
}



export type refType = {
    current : null | HTMLIFrameElement
  }

const Movie = ({ movie,  movieId }: MoviePropsType) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const iframe : refType = useRef(null)
    const goBack = () => navigate(-1)

    useEffect(() => {
        dispatch(fetchTrailer({ movieId, iframe }))
    }, [movieId])

    return (
        <div className='M'>
            <RiArrowGoBackLine
                onClick={goBack}
                className='go-back'>

            </RiArrowGoBackLine>
            <h1>{movie?.title}</h1>
            <div className='movie'>
                <div>
                    <img className='img-img' src={imgUrl + movie?.backdrop_path} />
                </div>
                <div>
                    <p>{movie?.overview}</p>
                    <br />
                    <h3> 10 / {movie?.vote_average}</h3>
                </div>
            </div>
            <div>
                <iframe ref={iframe} />
            </div>
        </div>
    )
}

export default Movie