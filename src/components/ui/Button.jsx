import React from "react"

/**
 *
 * @param {{
 * color: "is-primary" | 'is-info' | 'is-success' | 'is-warning' | 'is-danger' | 'is-white' | 'is-light' | 'is-dark' | 'is-text' | 'is-ghost',
 * size: 'is-small' | 'is-normal' | 'is-medium' | 'is-large'
 * isLoading: Boolean,
 * isDisabled: Boolean,
 * onClick: Function
 * }}
 */
const Button = ({ children, color, size, isLoading, isDisabled, onClick }) => {
   const loading = isLoading ? "is-loading" : ""
   return (
      <button
         className={`button ${color ?? ""} ${size ?? ""} ${loading}`}
         disabled={isDisabled}
         onClick={onClick}
      >
         {children}
      </button>
   )
}

export default Button
