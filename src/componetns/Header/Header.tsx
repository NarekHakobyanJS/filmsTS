import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchGenres } from '../../store/slices/genresSlice';
import { changeText, fetchSearch } from '../../store/slices/movieSlice';
import GenresBTN from './GenresBTN/GenresBTN';
import './Header.css';
import Search from './Search/Search';

const Header = () => {
    const [open, setOpen] = useState<boolean | null>(false);
    const { text, searchMovies } = useAppSelector((state) => state.moviesData)
    const { genres } = useAppSelector((state) => state.genresData)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (text.length >= 3) {
            dispatch(fetchSearch(text))
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [text])

    useEffect(() => {
        dispatch(fetchGenres())
    }, [])

    const isPopup = () => {
        setOpen(false)
        dispatch(changeText(''))
    }
    return (
        <header>
            <div className='genres'>
                {
                    genres.map((genre) => {
                        return <GenresBTN key={genre.id} genre={genre} />
                    })
                }
            </div>
            <div className='search'>
                <input
                    value={text}
                    onChange={(e) => dispatch(changeText(e.target.value))}
                />
                {
                    open && <div
                        onClick={isPopup}
                        className='search-block'>
                        <div className='s'>
                            {
                                searchMovies.length === 0
                                    ? <h1>not found</h1>
                                    :
                                    searchMovies.map((movie) => {
                                        return <Search
                                            key={movie.id}
                                            movie={movie}
                                        />
                                    })
                            }
                        </div>
                    </div>
                }

            </div>
        </header>
    )
}

export default Header

function fetchGenresMovies(): any {
    throw new Error('Function not implemented.');
}
