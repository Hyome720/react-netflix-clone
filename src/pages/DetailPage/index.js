import axios from '../../api/axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function DetailPage() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState({})

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        // baseURL이 있으니까 뒤에만 작성
        `/movie/${movieId}`
      )
      setMovie(request.data)
    }

    fetchData()
  // 내용이 바뀔때마다 movieId를 호출
  }, [movieId])
  
  if (!movie) return <div>...loading</div>

  return (
    <section>
      <img
        className='modal__poster-image'
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
    </section>
  )
}
