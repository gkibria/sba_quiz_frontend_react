import React, { useEffect, useState } from "react"
import QuizList from "../../components/quiz/QuizList"
import useAuth from "../../hooks/use-auth"
import useQuiz from "../../hooks/use-quiz"
import Button from "../../components/ui/Button"
import Loading from "../../components/Loading"
import { Helmet } from "react-helmet"
import useLoadMore from "../../hooks/use-loadmore"

const QuizIndex = () => {
   // const [quizList, setQuizList] = useState([])
   const quiz = useQuiz()
   const {
      paging,
      updatePagingInfo,
      fetchData,
      data: quizList,
   } = useLoadMore({
      recordPerPage: 20,
      fetchFnc: quiz.getList,
   })

   const getQuizList = async () => {
      try {
         const { data, meta } = await quiz.getList({
            page: paging.page,
            limit: paging.recordPerPage,
         })
         // console.log(data, meta, paging)
         setQuizList((oldData) => oldData.concat(data))
         updatePagingInfo(meta?.total_count)
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      fetchData()
   }, [])

   return (
      <>
         <Helmet>
            <title>SBA Quiz Listing</title>
         </Helmet>
         <QuizList quizList={quizList} />
         {paging.nextPage && (
            <div className="block has-text-centered">
               <Button
                  isLoading={quiz.isLoading}
                  onClick={fetchData}
               >
                  Load More
               </Button>
            </div>
         )}
         {quiz.isLoading && !quizList.length && <Loading />}
      </>
   )
}

export default QuizIndex
