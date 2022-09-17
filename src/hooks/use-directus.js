import React, { useEffect, useState } from "react"
import { Directus } from "@directus/sdk"

const directus = new Directus("http://localhost:8055/")

const useDirectus = () => {
   const [isLoading, setIsloading] = useState(false)
   const [error, setError] = useState()

   // Add a request interceptor
   directus.transport.axios.interceptors.request.use(
      function (config) {
         // Do something before request is sent
         setIsloading(true)
         setError()
         return config
      },
      function (error) {
         setIsloading(false)
         setError(error)
         // Do something with request error
         return Promise.reject(error)
      }
   )
   //    console.log(directus.transport)

   // Add a response interceptor
   directus.transport.axios.interceptors.response.use(
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

   return {
      isLoading,
      error,
      directus,
   }
}

export default useDirectus
