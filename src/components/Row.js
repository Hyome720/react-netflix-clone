import axios from '../api/axios'
import React, { useState, useEffect } from 'react'
import './Row.css'
import MovieModal from './MovieModal'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Row({ isLargeRow, title, id, fetchURL }) {
  const [movies, setMovies] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [movieSelected, setMovieSelected] = useState({})

  const BASE_URL = "https://image.tmdb.org/t/p/original/"

  useEffect(() => {
    fetchMovieData()
  }, [fetchURL])
  
  const fetchMovieData = async () => {
    const request = await axios.get(fetchURL)
    setMovies(request.data.results)

    return request
  }

  const handleClick = (movie) => {
    setModalOpen(true)
    setMovieSelected(movie)
  }

  return (
    <section className='row'>
      {/* 제목 */}
      <h2>{title}</h2>
        <Swiper
        // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            1378: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
            998: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            625: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            0: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }}
        >
          <div id={id} className="row__posters">
            {/* ROW__POSTER 머시기 */}
            {movies.map((movie) => (
              <SwiperSlide>
                <img
                  key={movie.id}
                  onClick={() => handleClick(movie)}
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  loading="lazy"
                  alt={movie.name}
                  />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        
      {modalOpen && (
        <MovieModal 
          setModalOpen={setModalOpen}
          {...movieSelected}
        />
      )}
         
    </section>
  )
}
