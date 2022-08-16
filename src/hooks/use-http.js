import useAxios from "./use-axios"

const useHttp = () => {
    const { axiosClient: axios, isLoading, error } = useAxios()

    const get = (url) => {
        return axios.get(url)
    }

    const post = (url, payload) => {
        return axios.post(url, payload)
    }

    const patch = (url, payload) => {
        return axios.patch(url, payload)
    }

    const del = (url) => {
        return axios.delete(url)
    }

    return {
        get,
        post,
        patch,
        del,
        isLoading,
        error,
    }
}

export default useHttp
