import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import useAuth from "../hooks/use-auth"
import logo from "../assets/logo.png"

const NavBar = (props) => {
   const { isLoggegIn, user, logOut } = useAuth()
   const [isMenuActive, setIsMenuActive] = useState(false)

   const toggleMenu = () => {
      setIsMenuActive((prev) => !prev)
   }

   useEffect(() => {
      document.body.classList.add("has-navbar-fixed-top")
   }, [])

   return (
      <nav
         className="navbar has-shadow is-fixed-top"
         role="navigation"
         aria-label="main navigation"
      >
         <div className="navbar-brand">
            <Link
               className="navbar-item"
               to="/"
            >
               <img
                  src={logo}
                  width="130"
                  height="28"
               />
            </Link>

            <a
               role="button"
               onClick={toggleMenu}
               className={`navbar-burger ${isMenuActive && "is-active"}`}
               aria-label="menu"
               aria-expanded="false"
               data-target="navbarBasicExample"
            >
               <span aria-hidden="true"></span>
               <span aria-hidden="true"></span>
               <span aria-hidden="true"></span>
            </a>
         </div>

         <div
            id="navbarBasicExample"
            className={`navbar-menu ${isMenuActive && "is-active"}`}
         >
            <div className="navbar-start"></div>

            <div className="navbar-end">
               <Link
                  to="/"
                  className="navbar-item"
                  onClick={toggleMenu}
               >
                  Home
               </Link>
               <Link
                  to="/quiz"
                  className="navbar-item"
                  onClick={toggleMenu}
               >
                  Quiz List
               </Link>

               {isLoggegIn && (
                  <div className="navbar-item has-dropdown is-hoverable">
                     <a className="navbar-link">{user.email}</a>

                     <div className="navbar-dropdown">
                        <Link
                           to="/quiz-admin"
                           className="navbar-item"
                           onClick={toggleMenu}
                        >
                           Quiz Admin
                        </Link>
                        <a className="navbar-item">About</a>
                        <a className="navbar-item">Jobs</a>
                        <a className="navbar-item">Contact</a>
                        <hr className="navbar-divider" />
                        <a className="navbar-item">Report an issue</a>
                     </div>
                  </div>
               )}

               {!isLoggegIn && (
                  <div className="navbar-item">
                     <div className="buttons">
                        <Link
                           to="/auth/register"
                           className="button is-primary"
                           onClick={toggleMenu}
                        >
                           Register
                        </Link>
                        <Link
                           to="/auth/login"
                           className="button is-light"
                           onClick={toggleMenu}
                        >
                           Log In
                        </Link>
                     </div>
                  </div>
               )}
               {isLoggegIn && (
                  <div className="navbar-item">
                     <div className="buttons">
                        <a className="button is-primary">
                           <strong>Create Quiz</strong>
                        </a>
                        <Link
                           to="/"
                           className="button is-light"
                           onClick={logOut}
                        >
                           Log Out
                        </Link>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </nav>
   )
}

export default NavBar
