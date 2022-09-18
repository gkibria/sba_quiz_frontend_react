import React, { useEffect, useState } from "react"
import Loading from "../../components/Loading"
import QuizList from "../../components/quiz/QuizList"
import Button from "../../components/ui/Button"
import useAuth from "../../hooks/use-auth"
import useLoadMore from "../../hooks/use-loadmore"
import useQuizAdmin from "../../hooks/use-quizadmin"

const QuizAdmin = () => {
   const auth = useAuth({ checkAuth: true })
   const [quizList, setQuizList] = useState([])
   const [status, setStatus] = useState("published")
   const [search, setSearch] = useState("")
   const { paging, updatePagingInfo } = useLoadMore({
      recordPerPage: 20,
   })
   const quiz = useQuizAdmin()

   const getQuizList = async () => {
      try {
         const { data, meta } = await quiz.getQuizList({
            page: paging.page,
            limit: paging.recordPerPage,
            search: search,
            filter: {
               status: {
                  _eq: status,
               },
            },
         })
         const isFiltered = status || search
         if (paging.page === 1) {
            setQuizList(data)
         } else {
            setQuizList((oldData) => oldData.concat(data))
         }
         updatePagingInfo(isFiltered ? meta.filter_count : meta.total_count)

         console.log(data, meta, paging)
      } catch (error) {
         console.log(error)
      }
   }

   const filterQuiz = async () => {
      paging.page = 1
      paging.nextPage = false
      getQuizList()
   }

   //    console.log("quizAdmin re-render", paging)

   useEffect(() => {
      getQuizList()
   }, [])

   return (
      <>
         <div className="section pb-0">
            <div className="container">
               <div className="field has-addons has-addons-centered">
                  <p className="control">
                     <span className="select">
                        <select onChange={(e) => setStatus(e.target.value)}>
                           <option value="published">Published</option>
                           <option value="draft">Draft</option>
                        </select>
                     </span>
                  </p>
                  <p className="control">
                     <input
                        className="input"
                        type="search"
                        placeholder="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                     />
                  </p>
                  <p className="control">
                     <Button
                        className="button"
                        onClick={filterQuiz}
                        isLoading={quiz.isLoading}
                     >
                        Filter
                     </Button>
                  </p>
               </div>
            </div>
         </div>

         {quiz.isLoading && !quizList.length && <Loading />}

         <QuizList
            quizList={quizList}
            title="Your Quiz"
         />
         {paging.nextPage && (
            <div className="block has-text-centered">
               <Button
                  isLoading={quiz.isLoading}
                  onClick={getQuizList}
               >
                  Load More
               </Button>
            </div>
         )}
      </>
   )
}

export default QuizAdmin
