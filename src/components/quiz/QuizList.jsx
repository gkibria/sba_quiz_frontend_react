import React from "react"
import { Link } from "react-router-dom"
import Icon from "../ui/Icon"

const latestQuiz = [
   {
      id: 1,
      name: "Front of the thigh",
      subjects: [
         { id: 1, name: "Anatomy" },
         { id: 30, name: "Neurology" },
      ],
      difficulty: "Easy",
      user: {
         id: 1,
         name: "Mohammad Golam Kibria",
      },
   },
   {
      id: 2,
      name: "Motor neuron pathway",
      subjects: [{ id: 1, name: "Anatomy" }],
      difficulty: "Medium",
      user: {
         id: 1,
         name: "Sumon Patwari",
      },
   },
   {
      id: 3,
      name: "Renal Physiology",
      subjects: [{ id: 1, name: "Physiology" }],
      difficulty: "Hard",
      user: {
         id: 1,
         name: "Milton Kumar Das",
      },
   },
   {
      id: 4,
      name: "Cardiac Physiology",
      subjects: [{ id: 1, name: "Physiology" }],
      difficulty: "Hard",
      user: {
         id: 1,
         name: "Milton Kumar Das",
      },
   },
   {
      id: 5,
      name: "Arrythmia",
      subjects: [{ id: 1, name: "Cardiology" }],
      difficulty: "Hard",
      user: {
         id: 1,
         name: "Milton Kumar Das",
      },
   },
]

const QuizList = ({ title = "Latest Quiz" }) => {
   return (
      <div className="section">
         <div className="container">
            <h3 className="title has-text-centered is-size-4">{title}</h3>
            <div className="columns is-multiline">
               {latestQuiz.map((quiz) => (
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

const QuizItem = ({ id, name, subjects, difficulty, user }) => {
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
                     text={name}
                  />
               </h4>
               {subjects.length && (
                  <span className="tags mb-0">
                     {subjects.map((item) => (
                        <span
                           className="tag"
                           key={item.id}
                        >
                           {item.name}
                        </span>
                     ))}
                  </span>
               )}

               <p className="is-size-7 has-text-weight-medium has-text-grey">
                  <Icon
                     name="account"
                     text={user.name}
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
