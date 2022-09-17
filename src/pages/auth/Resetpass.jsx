import { Link, useSearchParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import { Helmet } from "react-helmet"
import useAuth from "../../hooks/use-auth"
import { useNotify } from "../../context/notification"

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
   const auth = useAuth()
   const { notify } = useNotify()
   const isResetMode = params.has("token")
   const [resetData, setResetData] = useState({
      email: "",
      token: "",
      password: "",
      reset_url: "",
   })
   let conditionalInputs = []

   if (!isResetMode) {
      conditionalInputs = formInputs.filter((item) => item.name === "email")
   } else {
      conditionalInputs = formInputs.filter(
         (item) => item.name === "password" || item.name === "token"
      )
   }

   useEffect(() => {
      setResetData({
         ...resetData,
         token: params.get("token"),
         reset_url: window.location.href,
      })
   }, [])

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
         if (!isResetMode) {
            _sendResetRequest()
         } else {
            auth.passwordReset(resetData)
         }
      }
   }

   const _sendResetRequest = async () => {
      try {
         await auth.passwordResetRequest(resetData)
         setResetData({
            ...resetData,
            email: "",
         })
         notify({
            type: "is-success",
            msg: "If you have an account with us, you shoud get an email!",
         })
      } catch (error) {
         console.log(error)
         notify({
            type: "is-danger",
            msg: error?.response?.data?.errors?.[0].message,
         })
      }
   }

   const _resetPassword = async () => {
      try {
         await auth.passwordReset(resetData)
         notify({
            type: "is-success",
            msg: "If you have an account with us, you shoud get an email!",
         })
      } catch (error) {
         console.log(error)
         notify({
            type: "is-danger",
            msg: error?.response?.data?.errors?.[0].message,
         })
      }
   }

   return (
      <>
         <Helmet>
            <title>SBA Quiz Reset Password</title>
         </Helmet>
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
                     isLoading={auth.isLoading}
                  >
                     {isResetMode
                        ? "Reset Password"
                        : "Send Password Reset Instruction"}
                  </Button>
               </form>
            </div>
         </div>
         <div className="block has-text-centered">
            {/* {!isResetMode && (
               <>
                  <Link
                     to="?token=reset"
                     className="button is-light has-text-weight-bold"
                  >
                     I have a reset code
                  </Link>
                  <br />
                  <br />
               </>
            )} */}
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
