import useAxios from "./use-axios"
import qs from "query-string"

const useQuizAdmin = () => {
   const { axiosClient: axios, isLoading, error, sendToken } = useAxios()

   const getQuizList = async (payload) => {
      const query = {
         fields: ["*", "user_created.*"],
         sort: ["-date_created"],
         search: payload?.search ?? "",
         filter: JSON.stringify(payload?.filter),
         limit: payload?.limit ?? 20,
         page: payload?.page ?? 1,
         meta: ["*"],
      }
      //   console.log(qs.stringify(query))
      const res = await axios.get(`/items/sba_quiz?${qs.stringify(query)}`)
      return res.data
   }

   return {
      isLoading,
      error,
      getQuizList,
   }
}

export default useQuizAdmin
