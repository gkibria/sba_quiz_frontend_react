import React, { createContext, useEffect, useState } from "react"
import { useContext } from "react"
import styles from "../styles/Notification.module.css"

/**
 * Step 1: define initial state
 */
const initialState = {
   notify: ({ msg = "default message", type = "is-info" } = {}) => {},
   closeNotification: (id) => {},
}

/**
 * Step 2: Create context with initial state and export default
 */
export const NotificationContext = createContext(initialState)

/**
 * Step 3: create Provider with all the logics
 */
export const NotificationProvider = ({ children }) => {
   const [list, setList] = useState([])

   const notify = ({ msg = "default message", type = "is-info" } = {}) => {
      // add notification to the list
      const item = {
         id: Math.random(),
         msg,
         type,
      }
      setList((prev) => [...prev, item])
   }

   const closeNotification = (id) => {
      setList((prev) => list.filter((item) => item.id !== id))
   }

   useEffect(() => {
      if (list.length) {
         const interval = setInterval(() => {
            closeNotification(list[0].id)
            console.log("interval")
         }, 5000)

         return () => {
            clearInterval(interval)
         }
      }
   }, [list])

   return (
      <NotificationContext.Provider value={{ notify, closeNotification }}>
         {children}
         <NotificationContainer>
            {list.map((item) => (
               <Notification
                  key={item.id}
                  id={item.id}
                  type={item.type}
                  msg={item.msg}
               />
            ))}
         </NotificationContainer>
      </NotificationContext.Provider>
   )
}

/**
 * Step 4: create a custom hook and return the context
 */
export const useNotify = () => {
   return useContext(NotificationContext)
}

const NotificationContainer = ({ children }) => {
   return <div className={`${styles.container}`}>{children}</div>
}

const Notification = ({ type, msg, id }) => {
   const { closeNotification } = useNotify()

   const onClose = () => {
      closeNotification(id)
   }
   return (
      <div className={`notification ${styles.notification} ${type}`}>
         <button
            className="delete"
            onClick={onClose}
         ></button>
         {msg}
      </div>
   )
}

export default NotificationContext
