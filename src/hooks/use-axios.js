import axios from "axios"
import { useCallback, useState } from "react"

let SEND_TOKEN = true
const sendToken = (val) => {
   SEND_TOKEN = val
}

const useAxios = () => {
   const [isLoading, setIsloading] = useState(false)
   const [error, setError] = useState(null)

   const axiosClient = axios.create()

   axiosClient.defaults.baseURL = "https:/directus.gkibria.com"

   axiosClient.defaults.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
   }

   // All request will wait 2 seconds before timeout
   axiosClient.defaults.timeout = 5000

   axiosClient.defaults.withCredentials = true

   // Add a request interceptor
   axiosClient.interceptors.request.use(
      function (config) {
         // Do something before request is sent
         // console.log(SEND_TOKEN)
         if (SEND_TOKEN) {
            const token = localStorage.getItem("sba-token")
            config.headers.Authorization = token ? `Bearer ${token}` : ""
         }
         setIsloading(true)
         return config
      },
      function (error) {
         setIsloading(false)
         setError(error)
         // Do something with request error
         return Promise.reject(error)
      }
   )

   // Add a response interceptor
   axiosClient.interceptors.response.use(
      function (response) {
         // Any status code that lie within the range of 2xx cause this function to trigger
         setIsloading(false)
         // Do something with response data
         return response
      },
      function (error) {
         // Any status codes that falls outside the range of 2xx cause this function to trigger
         setIsloading(false)
         setError(error)
         // Do something with response error
         return Promise.reject(error)
      }
   )

   return { axiosClient, isLoading, error, sendToken }
}

export default useAxios
