import { Link } from "react-router-dom"
import React from "react"

const Register = () => {
   return (
      <>
         <div className="columns is-centered is-mobile">
            <div className="column box is-4-desktop m-5">
               <h3 className="subtitle has-text-centered has-text-info">
                  New Member Registration
               </h3>
            </div>
         </div>
         <div className="block has-text-centered">
            <Link
               to="/auth/login"
               className="button is-primary is-inverted has-text-weight-bold"
            >
               Already a member? Login Here
            </Link>
         </div>
      </>
   )
}
export default Register
