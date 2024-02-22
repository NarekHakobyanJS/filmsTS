import React, { useEffect } from 'react'
import FilmsCard from '../../componetns/FilmsCard/FilmsCard'
import Loading from '../../componetns/Loading/Loading'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { changePage, fetchMoives } from '../../store/slices/movieSlice'
import './HomePage.css'

const HomePage = () => {
    const dispatch = useAppDispatch()
    const { movies, pageCount, isLoading } = useAppSelector((state) => state.moviesData)
    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(fetchMoives(pageCount))
    }, [pageCount])

    return (
        <>
            <div className='movie-card'>
                {
                    movies.map((movie) => {
                        return <FilmsCard key={movie.id} movie={movie} />
                    })
                }
            </div>
            <div>
                <button
                    className='more'
                    disabled={isLoading}
                    onClick={() => dispatch(changePage())}
                >{isLoading ? <Loading /> : 'more'}</button>
            </div>
        </>
    )
}

export default HomePage