import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../componetns/Loading/Loading'
import Movie from '../../componetns/Movie/Movie'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchMovie } from '../../store/slices/movieSlice'
import './MoviePage.css'

const MoivePage = () => {
  const { movie, isLoading } = useAppSelector((state) => state.moviesData)
  const dispatch = useAppDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchMovie(id))
  }, [id])
  return (
    <div>
      {
        isLoading ? <Loading /> : <Movie movie={movie} movieId={id}/>
      }

    </div>
  )
}

export default MoivePage