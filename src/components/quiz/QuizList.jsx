import React from "react"
import { Link } from "react-router-dom"
import Icon from "../ui/Icon"

const latestQuiz = [
   {
      id: 1,
      title: "Front of the thigh",
      tags: ["Anatomy", "Neurology"],
      difficulty: "Easy",
      user_created: {
         id: 1,
         first_name: "Mohammad Golam",
         last_name: "Kibria",
      },
   },
]

const QuizList = ({ title = "Latest Quiz", quizList = [] }) => {
   return (
      <div className="section">
         <div className="container">
            <h3 className="title has-text-centered is-size-4">{title}</h3>
            <div className="columns is-multiline">
               {quizList &&
                  quizList.map((quiz) => (
                     <QuizItem
                        key={quiz.id}
                        {...quiz}
                     />
                  ))}
            </div>
         </div>
      </div>
   )
}

const QuizItem = ({ id, title, tags, difficulty = "Easy", user_created }) => {
   const badgeType = (badge) => {
      const badgeType = {
         Easy: "is-info",
         Medium: "is-warning",
         Hard: "is-danger",
      }
      return badgeType[badge]
   }
   return (
      <div className="column is-6-tablet is-4-desktop">
         <Link to={`/quiz/${id}`}>
            <div className="box has-background-white-bis p-3 is-relative">
               <h4 className="is-size-5 has-text-success-dark has-text-weight-medium">
                  <Icon
                     name="folder"
                     color="dark"
                     text={title}
                  />
               </h4>
               {tags && tags.length && (
                  <span className="tags mb-0">
                     {tags.map((item) => (
                        <span
                           className="tag"
                           key={Math.random()}
                        >
                           {item}
                        </span>
                     ))}
                  </span>
               )}

               {!tags && (
                  <span className="tags mb-0">
                     <span className="tag">not tagged</span>
                  </span>
               )}

               <p className="is-size-7 has-text-weight-medium has-text-grey">
                  <Icon
                     name="account"
                     text={`${user_created.first_name} ${user_created.last_name}`}
                  />
               </p>
               <span
                  className={`tag ${badgeType(difficulty)}`}
                  style={{
                     position: "absolute",
                     top: 0,
                     right: 0,
                     opacity: 0.8,
                  }}
               >
                  {difficulty}
               </span>
            </div>
         </Link>
      </div>
   )
}

export default QuizList
