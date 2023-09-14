import logo from "../../assets/logo.svg"
import moonIcon from "../../assets/icon-moon.svg"
import sunIcon from "../../assets/icon-sun.svg"
import avatar from "../../assets/avatar.png"
import { Theme } from "../context/ThemeContext"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPort } from "../../util"
import "./header.scss"

const Header = () => {
  const { theme, changeTheme } = useContext(Theme)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${getPort()}/api/invoice`, {
          credentials: "include",
        })
        if (res.status === 403) {
          return setIsLoggedIn(false)
        }
        setIsLoggedIn(true)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])


  return (
    <header className={`header-${theme}`}>
      <img src={logo} alt="logo icon" className="logo" />
      {isLoggedIn ? (
        <Link to="/register">Register</Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <img
        src={theme === "dark" ? sunIcon : moonIcon}
        alt="sun icon"
        className="theme-icon"
        onClick={changeTheme}
      />
      <div className="avatar-container">
        <img src={avatar} alt="avatar" />
      </div>
    </header>
  )
}

export default Header
