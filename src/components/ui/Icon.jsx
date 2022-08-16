import React from "react"

/**
 *
 * @param {{
 * name: String,
 * color: 'info' | 'success' | 'warning' | 'danger',
 * size: 'small' | 'medium' | 'large',
 * text: String
 * }}
 */
const Icon = ({ name, size, color, text }) => {
   const containerSize = size && `is-${size}`
   const iconSize = {
      small: "",
      medium: "mdi-18px",
      large: "mdi-24px",
   }
   if (text) {
      return (
         <span className="icon-text">
            <span className={`icon has-text-${color} ${containerSize}`}>
               <i className={`mdi mdi-${name} ${iconSize[size]}`}></i>
            </span>
            <span>{text}</span>
         </span>
      )
   }
   return (
      <span className={`icon has-text-${color} ${containerSize}`}>
         <i className={`mdi mdi-${name} ${iconSize[size]}`}></i>
      </span>
   )
}

export default Icon
