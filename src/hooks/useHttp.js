import { useEffect } from "react"
import { useState } from "react"

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config)

    const resData = await response.json()

    if (!response.ok) {
        throw new Error(resData.message || "Something went wrong, failed to send request.")
    }

    return resData
}

export default function useHttp(url, config, initialData) {
    const [error, setError] = useState()
    const [data, setData] = useState(initialData)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function sendRequest() {
            setIsLoading(true)
            try {
                const resData = await sendHttpRequest(url, config)
                setData(resData)
            } catch (error) {
                setError(error.message || "Something went wrong!")
            }
            setIsLoading(false)
        }

        sendRequest()
    }, [])

    return {
        error,
        data,
        isLoading
    }
}