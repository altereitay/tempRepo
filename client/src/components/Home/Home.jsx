import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate() 
  const  [userName, setUserName]= useState("")

  const clearToken = () => { 
    sessionStorage.removeItem("token");
    navigate('/login')
  };

  useEffect(() => {
    const fetchHome = async () => {
      const token = sessionStorage.getItem('token')
      if (!token) {
        console.error('No token found, please log in')
        navigate('/login')
        return
      }

      try {
        const response = await fetch('/auth/home', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const result = await response.json()
          setUserName(result.userName);
        } else {
          console.error('Failed to fetch home data:', response.status)
          navigate('/login')
        }
      } catch (error) {
        console.error('Error:', error)
        navigate('/login')
      }
    }

    fetchHome()
  }, [navigate])

  return (
    <div>
      <h1>Welcome Home, {userName}</h1>
      <button onClick={clearToken}>clear token</button>
    </div>
  )
}

export default Home
