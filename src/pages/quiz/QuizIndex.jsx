import React from "react"
import QuizList from "../../components/quiz/QuizList"
import useAuth from "../../hooks/use-auth"

const QuizIndex = () => {
   const {} = useAuth({ checkAuth: false })
   return (
      <>
         <QuizList />
      </>
   )
}

export default QuizIndex
