import { Outlet } from "react-router-dom"
import NavBar from "../Navbar"

const DefaultLayout = () => {
   return (
      <div>
         <NavBar />
         <Outlet />
         <footer className="footer">
            <div className="content has-text-centered">
               <p>Copyright 2020</p>
            </div>
         </footer>
      </div>
   )
}

export default DefaultLayout
