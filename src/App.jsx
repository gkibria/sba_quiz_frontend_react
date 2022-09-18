import "bulma/css/bulma.min.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./components/layouts/DefaultLayout"
import LoginLayout from "./components/layouts/LoginLayout"
import { NotificationProvider } from "./context/notification"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Resetpass from "./pages/auth/Resetpass"
import Home from "./pages/Home"
import QuizAdmin from "./pages/quiz-admin/QuizAdmin"
import QuizIndex from "./pages/quiz/QuizIndex"
import QuizPage from "./pages/quiz/QuizPage"

function App() {
   return (
      <BrowserRouter>
         <NotificationProvider>
            <Routes>
               <Route
                  path="/"
                  element={<DefaultLayout />}
               >
                  <Route
                     index
                     element={<Home />}
                  />
                  <Route
                     path="quiz"
                     element={<QuizIndex />}
                  />
                  <Route
                     path="quiz/:quizId"
                     element={<QuizPage />}
                  />
               </Route>
               <Route
                  path="/auth"
                  element={<LoginLayout />}
               >
                  <Route
                     path="login"
                     element={<Login />}
                  />
                  <Route
                     path="register"
                     element={<Register />}
                  />
                  <Route
                     path="resetpass"
                     element={<Resetpass />}
                  />
               </Route>
               <Route
                  path="/quiz-admin"
                  element={<DefaultLayout />}
               >
                  <Route
                     index
                     element={<QuizAdmin />}
                  />
               </Route>
            </Routes>
         </NotificationProvider>
      </BrowserRouter>
   )
}

export default App
