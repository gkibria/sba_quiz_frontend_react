import { useState, useEffect } from "react"
import useHttp from "../hooks/use-http"
import useApi from "../hooks/use-api"
import useAuth from "../hooks/use-auth"
import { Helmet } from "react-helmet"
import Button from "../components/ui/Button"
import study from "../assets/study.svg"
import QuizList from "../components/quiz/QuizList"

const Home = () => {
   const { isLoggegIn } = useAuth()
   const [users, setUsers] = useState()
   // const { get, isLoading, error } = useHttp();
   const { auth, isLoading, error } = useApi()

   const fetchUser = async () => {
      // const res = await get('https://jsonplaceholder.typicode.com/users');
      const res = await auth.getUsers()
      setUsers(res.data)
   }

   useEffect(() => {
      // fetchUser();
   }, [])

   return (
      <>
         <section className="section has-background-success-light">
            <div className="container">
               <div className="columns is-vcentered is-multiline">
                  <div className="column is-4-desktop is-6-tablet">
                     <h1 className="is-size-1-desktop title">
                        Learn Medicine...
                     </h1>
                     <h2 className="is-size-2-desktop subtitle">
                        By making Quiz
                     </h2>
                     <p>Learning by doing!</p>
                  </div>
                  <div className="column is-4-desktop is-6-tablet has-text-centered">
                     <img
                        className="is-rounded"
                        src={study}
                        alt="product image"
                     />
                  </div>
                  <div className="column is-4-desktop is-12-tablet">
                     <div className="is-size-4 mb-4">Why?</div>
                     <p className="mb-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Corrupti cum voluptatem doloribus, animi nobis aliquam
                        ab laudantium officiis minima perspiciatis adipisci
                        perferendis rem numquam, dolores enim sed molestiae qui
                        placeat?
                     </p>
                     <button className="button is-warning">
                        Create New Quiz
                     </button>
                  </div>
               </div>
            </div>
         </section>

         <QuizList />
      </>
   )
}

// Home.layout = 'login';

export default Home
