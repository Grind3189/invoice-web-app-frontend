import { createContext, useState, useEffect } from "react"
import { getPort } from "../../util"

interface AuthContextProp {
    children: React.ReactNode
}

interface AuthContextType {
    isAuth: boolean,
    changeAuth: (value: boolean) => void
}
export const Auth = createContext({} as AuthContextType)

export const AuthContext = ({ children }: AuthContextProp) => {
    const [isAuth, setIsAuth] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${getPort()}/api/invoice`, {
                  credentials: "include",
                })

                if(res.status === 403) {
                   return setIsAuth(false)
                }
                setIsAuth(true)
              } catch (err) {
                console.error(err)
              }
        }

        fetchData()
    }, [])

    const changeAuth = (value: boolean) => {
        setIsAuth(value)
    }


  return (
    <Auth.Provider value={{isAuth, changeAuth}}>{children}</Auth.Provider>
  )
}

