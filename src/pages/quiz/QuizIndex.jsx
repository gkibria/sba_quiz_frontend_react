import React, { useEffect, useState } from "react"
import QuizList from "../../components/quiz/QuizList"
import useAuth from "../../hooks/use-auth"
// import { Directus } from "@directus/sdk"
import useDirectus from "../../hooks/use-directus"

// const directus = new Directus("http://localhost:8055/")

const QuizIndex = () => {
   const [drugs, setDrugs] = useState()
   const { directus, isLoading, error } = useDirectus()
   const fetchData = async () => {
      try {
         const res = await directus.items("drug_brand").readByQuery({
            fields: "name,strength,price,generic_id.name,company_id.name",
         })
         console.log(res.data)
         setDrugs(res.data)

         // const login = await directus.auth.login({
         //    email: "kibria@medicbd.com",
         //    password: "1234qwer",
         // })
         // const logout = await directus.auth.logout()
         // console.log(login, logout)
      } catch (error) {
         console.log(error.message)
      }
   }

   useEffect(() => {
      fetchData()
   }, [])
   const {} = useAuth({ checkAuth: true })
   return (
      <>
         <QuizList />
         {isLoading && <p>Loading</p>}
         {error && <pre>{JSON.stringify(error, null, 4)}</pre>}
         <pre>{drugs && JSON.stringify(drugs, null, 4)}</pre>
      </>
   )
}

export default QuizIndex
