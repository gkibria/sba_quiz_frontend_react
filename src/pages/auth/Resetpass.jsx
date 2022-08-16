import { Link, useSearchParams } from "react-router-dom"
import React, { useState } from "react"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"

const formInputs = [
   {
      id: 1,
      name: "email",
      label: "Email",
      type: "email",
      value: "",
      placeholder: "Enter your registered email",
      required: true,
      patern: null,
      errMsg: "Valid Email is required",
      iconLeft: "email",
   },
   {
      id: 2,
      name: "token",
      label: "Reset Code",
      type: "text",
      value: "",
      placeholder: "enter the code from your email",
      required: true,
      patern: null,
      errMsg: "Code is required",
      iconLeft: "numeric",
   },
   {
      id: 3,
      name: "password",
      label: "Password",
      type: "password",
      value: "",
      placeholder: "Enter your new password",
      required: true,
      patern: null,
      errMsg: "Password is required",
      iconLeft: "lock",
   },
]

const Resetpass = () => {
   const [params] = useSearchParams()
   const isResetMode = params.get("mode") === "reset"
   const [resetData, setResetData] = useState({
      email: "",
      token: "",
      password: "",
   })
   let conditionalInputs = []

   if (!isResetMode) {
      conditionalInputs = formInputs.filter((item) => item.name === "email")
   } else {
      conditionalInputs = formInputs
   }

   const onChangeInput = (e) => {
      setResetData({
         ...resetData,
         [e.target.name]: e.target.value,
      })
   }

   const formHandler = (e) => {
      e.preventDefault()
      if (e.target.checkValidity()) {
         console.log(resetData)
      }
   }

   return (
      <>
         <div className="columns is-centered is-mobile">
            <div className="column box is-4-desktop m-5">
               <h3 className="subtitle has-text-centered has-text-info">
                  {isResetMode ? "Reset Password" : "Forget Password"}
               </h3>
               <form
                  onSubmit={formHandler}
                  noValidate
               >
                  {conditionalInputs.map((input) => (
                     <Input
                        key={input.id}
                        {...input}
                        value={resetData[input.name]}
                        onChange={onChangeInput}
                     />
                  ))}

                  <Button
                     color={"is-primary"}
                     className="is-right"
                  >
                     {isResetMode
                        ? "Reset Password"
                        : "Send Password Reset Code"}
                  </Button>
               </form>
            </div>
         </div>
         <div className="block has-text-centered">
            {!isResetMode && (
               <>
                  <Link
                     to="?mode=reset"
                     className="button is-light has-text-weight-bold"
                  >
                     I have a reset code
                  </Link>
                  <br />
                  <br />
               </>
            )}
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

export default Resetpass
