import React, { useState } from "react"

const Input = ({
   label,
   name,
   type,
   value,
   onChange,
   placeholder,
   iconLeft,
   iconRight,
   patern,
   required,
   errMsg,
}) => {
   const [error, SetError] = useState(false)
   const checkValidity = (e) => {
      // console.log(e.target.validity)
      if (e.target.validity.valid) {
         SetError("")
      } else {
         SetError(errMsg ?? "Validation Error")
      }
   }

   const inputType = type ?? "text"
   const hasIconL = iconLeft && "has-icon-left"
   const iconL = iconLeft && (
      <span className="icon is-left">
         <i className={`mdi mdi-${iconLeft} mdi-24px`}></i>
      </span>
   )
   const hasIconR = iconRight && "has-icon-right"
   const iconR = iconRight && (
      <span className="icon is-right">
         <i className={`mdi mdi-${iconRight} mdi-24px`}></i>
      </span>
   )
   return (
      <div className="field">
         <label className="label">{label}</label>
         <div
            className={`control ${hasIconL && "has-icons-left"} ${
               hasIconR && "has-icons-right"
            }`}
         >
            <input
               className={`input ${error && "is-danger"}`}
               name={name}
               type={inputType}
               placeholder={placeholder}
               value={value}
               onChange={onChange}
               required={required}
               pattern={patern}
               onInvalid={checkValidity}
               onInput={checkValidity}
               onBlur={checkValidity}
            />
            {iconL}
            {iconR}
         </div>
         {error && <p className="help is-danger">{error}</p>}
      </div>
   )
}

export default Input
