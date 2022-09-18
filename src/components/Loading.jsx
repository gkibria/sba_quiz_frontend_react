import React from "react"
import style from "../styles/Loading.module.css"

const Loading = () => {
   return (
      <div className="block has-text-centered">
         <div className={style.loader}></div>
         <p>Loading</p>
      </div>
   )
}

export default Loading
