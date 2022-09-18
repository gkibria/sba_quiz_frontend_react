/**
 * pagination Hook
 */
import { useState } from "react"

const useLoadMore = ({
   recordPerPage = 20,
   fetchFnc = null,
   fetchParams = {},
}) => {
   const [paging, setPaging] = useState({
      page: 1,
      recordPerPage: recordPerPage,
      nextPage: false,
   })

   const [data, setData] = useState([])

   const fetchData = async () => {
      try {
         const { data, meta } = await fetchFnc({
            page: paging.page,
            limit: paging.recordPerPage,
            ...fetchParams,
         })

         const isFiltered = fetchParams?.filter || fetchParams.search
         if (paging.page === 1) {
            setData(data)
         } else {
            setData((oldData) => oldData.concat(data))
         }
         updatePagingInfo(isFiltered ? meta.filter_count : meta.total_count)
      } catch (error) {
         console.log(error)
      }
   }

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

   // console.log("loadMore", paging)

   return {
      paging,
      data,
      fetchData,
      updatePagingInfo,
   }
}

export default useLoadMore
