import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import Button from "../components/ui/Button"
import study from "../assets/study.svg"
import QuizList from "../components/quiz/QuizList"
import useQuiz from "../hooks/use-quiz"
import Loading from "../components/Loading"

const Home = () => {
   const [quizList, setQuizList] = useState([])
   const quiz = useQuiz()

   const getQuizList = async () => {
      try {
         const { data, meta } = await quiz.getList({
            limit: 6,
         })
         setQuizList((oldData) => oldData.concat(data))
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getQuizList()
   }, [])

   return (
      <>
         <Helmet>
            <title>SBA [Single Best Answer] Quiz</title>
         </Helmet>
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
                     <p>Learning by doing is the best afterall!</p>
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

         {quiz.isLoading && !quizList.length && <Loading />}
         <QuizList
            quizList={quizList}
            title="Popular Quiz"
         />
      </>
   )
}

// Home.layout = 'login';

export default Home
