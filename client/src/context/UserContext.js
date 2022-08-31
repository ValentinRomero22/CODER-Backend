import { useEffect, useState, createContext, useRef } from "react";

const UserContext = createContext()

export const UserProvider = ({ children }) =>{
    const [user, setUser] = useState(false)
    const render = useRef(0)

    useEffect(() =>{
        if(render.current === 0){
            fetch('http://localhost:8080')
            .then(res => res.json())
            .then(res => setUser(res.isAdmin))
        }

        render.current += 1
    }  )

    const getUserType = () =>{
        return user
    }

    return(
        <UserContext.Provider 
            value = {{ getUserType }}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContext