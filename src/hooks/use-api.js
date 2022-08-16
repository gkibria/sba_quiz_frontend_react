import useHttp from "./use-http"

const useApi = () => {
    const { get, post, isLoading, error } = useHttp()

    const auth = {
        login(payload) {
            return post("login", payload)
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
