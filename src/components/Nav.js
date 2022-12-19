import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Nav.css" 

export default function Nav() {
  const [show, setshow] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 50) {
        setshow(true)
      } else {
        setshow(false)
      }
    })

    return () => {
      window.removeEventListener("scroll", () => {
         
      })
    }

  })

  const handleChange = (e) => {
    setSearchValue(e.target.value)
    navigate(`/search?q=${e.target.value}`)
  }

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img 
        alt='Netflix logo'
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/220px-Netflix_2015_logo.svg.png"
        className='nav__logo'
        onClick={() => window.location.reload()}
      />

      <input 
        value={searchValue} 
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder="영화를 검색해주세요"
      />

      <img 
        alt="User logged"
        src="https://cdn-icons-png.flaticon.com/512/71/71403.png"
        className='nav__avatar'
      />
    </nav>
  )
}
