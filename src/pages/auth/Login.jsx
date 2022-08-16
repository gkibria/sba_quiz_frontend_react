import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import Input from "../../components/ui/Input"
import useAuth from "../../hooks/use-auth"
import { Helmet } from "react-helmet"
import { useNotify } from "../../context/notification"
import Button from "../../components/ui/Button"

const formInputs = [
   {
      id: 1,
      name: "username",
      label: "Username",
      type: "text",
      value: "",
      placeholder: "Enter your username",
      required: true,
      patern: null,
      errMsg: "Username is required",
      iconLeft: "email",
   },
   {
      id: 2,
      name: "password",
      label: "Password",
      type: "password",
      value: "",
      placeholder: "Enter your password",
      required: true,
      patern: null,
      errMsg: "Password is required",
      iconLeft: "lock",
   },
]

const Login = () => {
   const navigate = useNavigate()
   const auth = useAuth({ checkAuthReversed: true })
   const { notify } = useNotify()
   const [loginData, setLoginData] = useState({
      username: "",
      password: "",
   })

   const onChangeInput = (e) => {
      setLoginData({
         ...loginData,
         [e.target.name]: e.target.value,
      })
   }

   const loginHandler = (e) => {
      e.preventDefault()
      if (e.target.checkValidity()) {
         console.log(loginData)
         try {
            localStorage.setItem("sba-token", "token")
            localStorage.setItem("sba-user", JSON.stringify(loginData))
            notify({
               type: "is-success",
               msg: "Logged In Success! Now you can use SBA quiz interface",
            })
            navigate("/")
         } catch (error) {
            console.log(error)
         }

         // notify({
         //    type: "is-success",
         //    msg: "Logged In Success! Now you can use SBA quiz interface",
         // })
      }
   }
   return (
      <>
         <Helmet>
            <title>SBA Quiz Login</title>
         </Helmet>
         <div className="columns is-centered is-mobile">
            <div className="column box is-4-desktop m-5">
               <h3 className="subtitle has-text-centered has-text-info">
                  Login
               </h3>
               <form
                  onSubmit={loginHandler}
                  noValidate
               >
                  {formInputs.map((input) => (
                     <Input
                        key={input.id}
                        {...input}
                        value={loginData[input.name]}
                        onChange={onChangeInput}
                     />
                  ))}

                  <Button
                     color={"is-primary"}
                     className="is-right"
                  >
                     Login
                  </Button>
               </form>
            </div>
         </div>
         <div className="block has-text-centered">
            <Link
               to="/auth/resetpass"
               className="button is-light has-text-weight-bold"
            >
               Forget Password?
            </Link>
            <br />
            <br />
            <Link
               to="/auth/register"
               className="button is-primary is-inverted has-text-weight-bold"
            >
               Not a member? Register Here
            </Link>
         </div>
      </>
   )
}

export default Login
