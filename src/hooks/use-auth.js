import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useNotify } from "../context/notification"
import useAxios from "./use-axios"
import useHttp from "./use-http"

const useAuth = ({ checkAuth = false, checkAuthReversed = false } = {}) => {
   const navigate = useNavigate()
   const location = useLocation()
   const currentLocation = location.pathname + location.search
   const { axiosClient: axios, isLoading, error, sendToken } = useAxios()
   // const { post, error, isLoading } = useHttp()
   const { notify } = useNotify()

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

   const logIn = async (payload) => {
      const resToken = await axios.post("/auth/login", {
         email: payload.username,
         password: payload.password,
         mode: "cookie",
      })
      console.log(resToken.data)
      localStorage.setItem("sba-token", resToken.data.data.access_token)
      const userRes = await axios.get("/users/me")
      localStorage.setItem("sba-user", JSON.stringify(userRes.data.data))

      notify({
         type: "is-success",
         msg: "Logged In Success! Now you can use SBA quiz interface",
      })
      const redirect = localStorage.getItem("sba-redirect")
      redirect ? navigate(redirect) : navigate("/")
   }

   const logOut = async () => {
      await axios.post("auth/logout")
      localStorage.clear()
      navigate("/")
   }

   const register = async (payload) => {
      const res = await axios.post("/users", {
         first_name: payload.first_name,
         last_name: payload.last_name,
         email: payload.email,
         password: payload.password,
      })
      navigate("/auth/login")
   }

   const passwordResetRequest = async (payload) => {
      const res = await axios.post("/auth/password/request", {
         email: payload.email,
         reset_url: payload.reset_url,
      })
   }

   const passwordReset = async (payload) => {
      try {
         await axios.post("/auth/password/reset", {
            token: payload.token,
            password: payload.password,
         })
         notify({
            type: "is-success",
            msg: "Password reset sussessfull",
         })
         navigate("/auth/login")
      } catch (error) {
         notify({
            type: "is-danger",
            msg: error?.response?.data?.errors?.[0].message,
         })
      }
   }

   return {
      isLoggegIn: token && user,
      user,
      logOut,
      logIn,
      register,
      passwordResetRequest,
      passwordReset,
      isLoading,
      error,
   }
}

export default useAuth
