import useHttp from "./use-http"

const useApi = () => {
   const { get, post, isLoading, error } = useHttp()

   const auth = {
      register(payload) {
         return post("register", payload)
      },
      login(payload) {
         return post("login", payload)
      },
      logout() {
         return get("/logout")
      },
      forget_pass(payload) {
         return post("forget_pass", payload)
      },
      reset_pass(payload) {
         return post("reset_pass", payload)
      },
      me() {
         return get("me")
      },
      getUsers() {
         return get("https://jsonplaceholder.typicode.com/users")
      },
   }

   return {
      auth,
      isLoading,
      error,
   }
}

export default useApi
