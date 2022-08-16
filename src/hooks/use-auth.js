import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const useAuth = ({ checkAuth = false, checkAuthReversed = false } = {}) => {
   const navigate = useNavigate()
   const location = useLocation()
   const currentLocation = location.pathname + location.search

   const token = localStorage.getItem("sba-token")
   const user = JSON.parse(localStorage.getItem("sba-user"))

   useEffect(() => {
      if (checkAuth && !checkAuthReversed) {
         if (!token || !user) {
            localStorage.setItem("sba-redirect", currentLocation)
            navigate("/auth/login")
         }
      }
      if (!checkAuth && checkAuthReversed) {
         if (token && user) {
            navigate("/")
         }
      }
   }, [])

   const logOut = () => {
      localStorage.clear()
      navigate("/")
   }

   return {
      isLoggegIn: token,
      user,
      logOut,
   }
}

export default useAuth
