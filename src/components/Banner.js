import axios from '../api/axios'
import React, { useState, useEffect } from 'react'
import requests from '../api/requests'
import "./Banner.css"
import styled from "styled-components"

export default function Banner() {
  const [movie, setMovie] = useState([])
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // 현재 상영중인 영화 정보 가져오기
    const request = await axios.get(requests.fetchNowPlaying)

    // 영화 리스트 중 랜덤으로 하나의 ID 가져오기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id

    // 해당 영화의 상세 정보 가져오기
    // axios 요청을 보낸 data 를 movieDetail에 할당하는 표현식인듯
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    })

    setMovie(movieDetail)

    console.log('111111')
    console.log(movieDetail)
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str
  }

  if (!isClicked) {
    return (
      <header
        className='banner'
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className='banner__contents'>
          {/* 제목 */}
          <h1 className='banner__title'>
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className='banner__buttons'>
            <button 
              className='banner__button play'
              onClick={() => setIsClicked(true)}  
            >
              재생
            </button>
            <button className='banner__button info'>
              <div className='space'>
                추가 정보
              </div>
            </button>
          </div>
  
          <h1 className='banner__description'>
            {truncate(movie?.overview, 100)}
          </h1>
        </div>
  
        <div className='banner--fadeBottom' />
        
      </header>
    )
  } else {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            width="640"
            height="360"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    )
  }
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`