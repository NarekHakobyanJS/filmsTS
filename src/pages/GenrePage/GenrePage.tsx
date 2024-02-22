import React from 'react'
import FilmsCard from '../../componetns/FilmsCard/FilmsCard'
import Loading from '../../componetns/Loading/Loading'
import {changePageG} from '../../store/slices/genresSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import './GenrePage.css'

const GenrePage = () => {
    const dispatch = useAppDispatch()
    const { genresFilms } = useAppSelector((state) => state.genresData)
    const {isLoading} = useAppSelector((state) => state.moviesData)
    return (
        <>
            <div className='movie-card'>
                {
                    genresFilms.map((gf) => {
                        return <FilmsCard key={gf.id} movie={gf} />
                    })
                }
            </div>
            <button
                className='more'
                disabled={isLoading}
                onClick={() => dispatch(changePageG())}
            >{isLoading ? <Loading /> : 'more'}</button>
        </>
    )
}

export default GenrePage