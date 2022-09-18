import { useState } from "react"

const useLoadMore = ({ recordPerPage = 20 }) => {
   const [paging, setPaging] = useState({
      page: 1,
      recordPerPage: recordPerPage,
      nextPage: false,
   })

   const updatePagingInfo = (total_count) => {
      //   console.log("useLoadMore", total_count)
      if (total_count === 0) return
      if (total_count > paging.page * recordPerPage) {
         setPaging((oldPaging) => ({
            ...oldPaging,
            nextPage: true,
            page: oldPaging.page + 1,
         }))
      } else {
         setPaging((oldPaging) => ({
            ...oldPaging,
            nextPage: false,
         }))
      }
   }

   console.log("loadMore", paging)

   return {
      paging,
      updatePagingInfo,
   }
}

export default useLoadMore
