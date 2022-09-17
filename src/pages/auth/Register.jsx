import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import useAuth from "../../hooks/use-auth"
import { useNotify } from "../../context/notification"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import { Helmet } from "react-helmet"

const formInputs = [
   {
      id: 1,
      name: "first_name",
      label: "First Name",
      type: "text",
      value: "",
      placeholder: "Enter your first name",
      required: true,
      patern: null,
      errMsg: "Firstname is required",
      iconLeft: "account",
   },
   {
      id: 2,
      name: "last_name",
      label: "Last Name",
      type: "text",
      value: "",
      placeholder: "Enter your last name",
      required: true,
      patern: null,
      errMsg: "Lastname is required",
      iconLeft: "account",
   },
   {
      id: 3,
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
      id: 4,
      name: "password",
      label: "Password [at least 8 chr]",
      type: "password",
      value: "",
      placeholder: "Enter password",
      required: true,
      patern: null,
      errMsg: "Password is required and at least 8 chr",
      iconLeft: "lock",
   },
]

const Register = () => {
   const navigate = useNavigate()
   const auth = useAuth({ checkAuthReversed: true })
   const { notify } = useNotify()
   const [userData, setUserData] = useState({
      first_name: "",
      email_name: "",
      password_name: "",
      password: "",
   })

   const onChangeInput = (e) => {
      setUserData({
         ...userData,
         [e.target.name]: e.target.value,
      })
   }

   const submitHandler = async (e) => {
      e.preventDefault()
      if (e.target.checkValidity()) {
         console.log(userData)
         try {
            await auth.register(userData)
         } catch (error) {
            console.log(error)
            notify({
               type: "is-danger",
               msg: error?.response?.data?.errors?.[0].message,
            })
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
            <title>SBA Quiz Registration</title>
         </Helmet>
         <div className="columns is-centered is-mobile">
            <div className="column box is-4-desktop m-5">
               <h3 className="subtitle has-text-centered has-text-info">
                  New Member Registration
               </h3>
               <form
                  onSubmit={submitHandler}
                  noValidate
               >
                  {formInputs.map((input) => (
                     <Input
                        key={input.id}
                        {...input}
                        value={userData[input.name]}
                        onChange={onChangeInput}
                     />
                  ))}

                  <Button
                     color={"is-primary"}
                     className="is-right"
                     isLoading={auth.isLoading}
                  >
                     Register Me
                  </Button>
               </form>
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
