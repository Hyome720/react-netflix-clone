import axios from '../api/axios'
import React, { useState, useEffect } from 'react'
import './Row.css  '

export default function Row({ isLargeRow, title, id, fetchURL }) {
  const [movies, setMovies] = useState([])
  const BASE_URL = "https://image.tmdb.org/t/p/original/"

  useEffect(() => {
    fetchMovieData()
  }, [fetchURL])
  
  const fetchMovieData = async () => {
    const request = await axios.get(fetchURL)
    setMovies(request.data.results)

    return request
  }

  return (
    <section className='row'>
      {/* 제목 */}
      <h2>{title}</h2>
      <div className='slider'>
        <div className='slider__arrow-left'>
          <span className='arrow'>
            {"<"}
          </span>
        </div>
        <div id={id} className="row__posters">
          {/* ROW__POSTER 머시기 */}
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              loading="lazy"
              alt={movie.name}
            />
          ))}
        </div>
        <div className='slider__arrow-right'>
          <span className='arrow'>
            {">"}
          </span>
        </div>
      </div>
         
    </section>
  )
}
