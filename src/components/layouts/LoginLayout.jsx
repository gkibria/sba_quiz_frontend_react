import { Link, Outlet } from "react-router-dom"
import logo from "../../assets/logo.png"

const LoginLayout = () => {
   return (
      <div className="hero is-fullheight">
         <div className="hero-body">
            <div className="container">
               <div
                  style={{ width: "150px" }}
                  className="container has-text-centered"
               >
                  <Link to="/">
                     <img src={logo} />
                  </Link>
               </div>
               <Outlet />
            </div>
         </div>
      </div>
   )
}

export default LoginLayout
