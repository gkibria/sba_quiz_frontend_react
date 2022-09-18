import useAxios from "./use-axios"
import qs from "query-string"

const useQuiz = () => {
   const { axiosClient: axios, isLoading, error, sendToken } = useAxios()

   const getList = async (payload) => {
      const query = {
         fields: [
            "id",
            "title",
            "difficulty",
            "questions",
            "tags",
            "user_created.*",
         ],
         sort: ["-date_created"],
         search: payload?.search ?? "",
         filter: JSON.stringify(payload?.filter),
         limit: payload?.limit ?? 20,
         page: payload?.page ?? 1,
         meta: ["*"],
      }
      //   console.log(qs.stringify(query))
      sendToken(false)
      const res = await axios.get(`/items/sba_quiz?${qs.stringify(query)}`)
      sendToken(true)
      return res.data
   }

   return {
      isLoading,
      error,
      getList,
   }
}

export default useQuiz
