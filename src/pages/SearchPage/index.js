import axios from '../../api/axios'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './SearchPage.css'
import { useDebounce } from '../../hooks/useDebounce'

export default function SearchPage() {
  const navigate = useNavigate()
  const [searchResults, setSearchResults] = useState([])
  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }

  let query = useQuery()
  const serachTerm = query.get("q")
  const debouncedSearchTerm = useDebounce(serachTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm])

  const fetchSearchMovie = async (debouncedSearchTerm) => {
    try {
      const request = await axios.get(`/search/multi?include_adult=false&query=${debouncedSearchTerm}`)
      console.log(request)
      setSearchResults(request.data.results)
    } catch (error) {
      console.log("error:", error )
    }
  }

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
            return (
              <div className='movie' key={movie.id}>
                <div
                  // navigate를 이용해 주소 변경
                  onClick={() => navigate(`/${movie.id}`)}
                  className='movie__column-poster'
                >
                  <img
                    src={movieImageUrl}
                    alt="movie image"
                    className='movie__poster'
                  />
                </div>
              </div>
            )
          }
        })}
      </section>
    ) :
      <section className='no-results'>
        <div className='no-results__text'>
          <p>
            "{debouncedSearchTerm}"에 대한 검색결과가 없습니다.
          </p>
        </div>
      </section>
  }

  return renderSearchResults()
}
