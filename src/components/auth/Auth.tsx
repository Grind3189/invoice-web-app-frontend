import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { getPort } from "../../util"

const Auth = () => {
  const [isLoggedIn, setIsLogggedIn] = useState<boolean | "">(true)

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch(`${getPort()}/api/invoice`, {
        credentials: "include",
      })
      if (!res.ok) {
        setIsLogggedIn(false)
      } else {
        setIsLogggedIn(true)
      }
    }
    checkAuth()
  }, [])

  if (isLoggedIn) {
    return <Outlet />
  }

  if (!isLoggedIn) {
    return <Navigate to="/register" />
  }
}

export default Auth
