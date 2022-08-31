import { useEffect, useState } from "react";

export const useAsync = (asyncFunction, dependence = []) =>{
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        setLoading(true)

        asyncFunction()
        .then(res => res.json())
        .then(res => setData(res))
        .catch(error => {
            setError(error)
        }).finally(() => {
            setLoading(false)
        })
        
    }, dependence)

    return{
        data, 
        loading, 
        error
    }
}