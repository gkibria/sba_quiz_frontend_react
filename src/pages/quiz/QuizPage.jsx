import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Button from "../../components/ui/Button"
import { useNotify } from "../../context/notification"

const quizState = {
   INSTRUCTION: "instruction",
   LOAD_QUESTION: "load_question",
   CHECK_ANSWER: "check_answer",
}

const QuizPage = () => {
   const { quizId } = useParams()
   const { notify } = useNotify()
   const [state, setState] = useState("instruction")
   const [question, setQuestion] = useState(null)
   const [response, setResponse] = useState()
   const [score, setScore] = useState({
      total: 0,
      correct: 0,
      incorrect: 0,
   })

   const startQuiz = () => {
      // reset response
      setResponse()
      // load question
      setQuestion({
         id: 40,
         body: "<p>An obese 55 year old woman with Type II diabetes is referred as she has been found to have raised ALT and AST levels. She does not have a history of pruritus or jaundice. She is not on any medication and does not take alcohol. On examination, she has a smooth hepatomegaly of 3 cm edge. There are no xanthelasmata and she does not have signs of chronic liver disease.  \r\n</p><p>What is the likely diagnosis?</p>",
         user_id: 3,
         status: "Pending",
         choices: [
            {
               id: 197,
               answer: "Neuroacantocythosis",
            },
            {
               id: 198,
               answer: "Chronic hepatitis",
            },
            {
               id: 199,
               answer: "Hepatocellular carcinoma",
            },
            {
               id: 196,
               answer: "Non-alcoholic fatty liver disease",
            },
            {
               id: 200,
               answer: "Hepatorenal syndrome",
            },
         ],
      })
      // set state
      setState("question")
   }

   const onChoice = (response) => {
      // set the response if state is question
      if (state === "question") {
         setResponse(response)
      }
   }

   const checkAnswer = () => {
      // update question
      setQuestion((prev) => {
         return {
            ...prev,
            correct: 196,
            explanation:
               "<p>This diagnosis is non-alcoholic fatty liver disease. The mildest type is simple fatty liver (steatosis), an accumulation of fat within the liver that usually causes no liver damage. This disease is usually nonprogressive and rarely causes liver cirrhosis. A potentially more serious type, nonalcoholic steatohepatitis (NASH), is associated with liver fibrosis. Nonalcoholic fatty liver disease affects more women than men, and is associated with insulin resistance/diabetes and obesity.</p>",
         }
      })

      setState("check-answer")
      setScore((prev) => ({
         ...prev,
         total: prev.total++,
      }))
   }

   useEffect(() => {
      if (state === "check-answer") {
         console.log("response", response, "correct", question?.correct)
         if (+response === question?.correct) {
            notify({
               msg: "Well done! your answer is right.",
               type: "is-success",
            })
            setScore((prev) => ({
               ...prev,
               correct: prev.correct++,
            }))
         } else {
            notify({ msg: "Oops! Your answer was wrong.", type: "is-danger" })
            setScore((prev) => ({
               ...prev,
               incorrect: prev.incorrect++,
            }))
         }
      }
   }, [response, question?.correct])
   return (
      <div className="section">
         <div className="container">
            <h3 className="title has-text-centered is-size-4 mb-2">
               Quiz: Motor neuron pathway
            </h3>
            <h3 className="title has-text-centered is-size-6">
               Total Question: <span>10</span>
            </h3>

            {state === "instruction" && (
               <div className="notification is-info is-light has-text-centered">
                  <strong>Instruction:</strong>
                  <p className="mt-3 mb-3">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Facilis doloribus maxime deleniti, vel asperiores sint
                     quasi et illum reiciendis a dignissimos non totam
                     consectetur nobis ab dolorem autem similique beatae.
                  </p>

                  <Button
                     color="is-primary"
                     onClick={startQuiz}
                  >
                     <strong>Start Quiz</strong>
                  </Button>
               </div>
            )}

            {(state === "question" || state === "check-answer") && (
               <div className="notification">
                  <div className="box has-text-centered">
                     <div className="tags">
                        <span className="tag is-white">
                           <strong>Your Score</strong>
                        </span>
                        <span className="tag is-link is-light">
                           <strong>Total: {score.total}</strong>
                        </span>
                        <span className="tag is-success is-light">
                           <strong>Correct: {score.correct}</strong>
                        </span>
                        <span className="tag is-danger is-light">
                           <strong>Incorrect: {score.incorrect}</strong>
                        </span>
                        <span className="tag is-info is-light">
                           <strong>
                              Success Rate:{" "}
                              {score.total
                                 ? Math.floor(
                                      (score.correct / score.total) * 100
                                   )
                                 : 0}
                              %
                           </strong>
                        </span>
                     </div>
                  </div>
                  <strong>Question:</strong>
                  <div className="mt-3 mb-3">{question.body}</div>
                  <table className="table is-hoverable is-fullwidth">
                     <tbody>
                        {question?.choices.map((choice, index) => (
                           <tr
                              key={choice.id}
                              onClick={() => onChoice(choice.id)}
                           >
                              <td width="10">
                                 <span className="tag is-info">
                                    <strong>
                                       {String.fromCharCode(65 + index)}
                                    </strong>
                                 </span>
                              </td>
                              {state === "question" && (
                                 <td width="10">
                                    <input
                                       type="radio"
                                       name="response"
                                       value={choice.id}
                                       checked={response === choice.id}
                                       onChange={() => {}}
                                    ></input>
                                 </td>
                              )}
                              {state === "check-answer" && (
                                 <td width="10">
                                    {choice.id === question?.correct && (
                                       <span className="tag is-success">
                                          Correct Answer
                                       </span>
                                    )}
                                    {response !== question?.correct &&
                                       response === choice.id && (
                                          <span className="tag is-danger">
                                             Your Answer
                                          </span>
                                       )}
                                 </td>
                              )}
                              <td>
                                 <p>{choice.answer}</p>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
                  {state === "check-answer" && (
                     <>
                        <strong>Explanation:</strong>
                        <div className="mt-3 mb-3">{question.explanation}</div>
                     </>
                  )}

                  {state === "question" && (
                     <Button
                        color="is-primary"
                        isDisabled={!response}
                        onClick={checkAnswer}
                     >
                        <strong>Submit</strong>
                     </Button>
                  )}

                  {state === "check-answer" && (
                     <Button
                        color="is-info"
                        onClick={startQuiz}
                     >
                        <strong>Next Question</strong>
                     </Button>
                  )}
               </div>
            )}
         </div>
      </div>
   )
}

export default QuizPage
