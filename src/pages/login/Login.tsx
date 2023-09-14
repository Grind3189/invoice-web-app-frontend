import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.svg"
import { useEffect, useRef, useState, useContext } from "react"
import { Width } from "../../components/context/WidthContext"
import "./login.scss"
import { getPort } from "../../util"

interface LoginData {
  email: string
  password: string
}
interface EmptyErrorState {
  email: boolean
  password: boolean
}
function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  })

  const [emptyError, setEmptyError] = useState<EmptyErrorState>({
    email: false,
    password: false,
  })

  const [error, setError] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null!)
  const [isLoading, setIsLoading] = useState(false)
  const { width } = useContext(Width)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("")
    setLoginData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    setIsLoading(true)
    e.preventDefault()
    const { email, password } = loginData

    const setEmpty = (elementName: string, isEmpty: boolean) => {
      setEmptyError((prev) => ({ ...prev, [elementName]: isEmpty }))
    }

    if (!email || !password) {
      if (!email) {
        setEmpty("email", true)
      } else {
        setEmpty("email", false)
      }
      if (!password) {
        setEmpty("password", true)
      } else {
        setEmpty("password", false)
      }
    }

    const res = await fetch(`${getPort()}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include",
    })

    setIsLoading(false)
    if (res.status === 401) {
      return setError("Invalid email or password")
    } else if (res.status === 403) {
      return setError("Email is not registered")
    }

    await res.json()
    navigate("/")
  }

  return (
    <main className="login-container">
      <img src={logo} alt="logo" />
      <form className="login-form">
        <h1>Login</h1>
        {error && <span className="error-mess general-err">{error}</span>}
        <div className="email-container">
          <input
            type="email"
            name="email"
            placeholder="Dummy email"
            value={loginData.email}
            onChange={handleChange}
            ref={inputRef}
          />
          {emptyError.email && (
            <span className="error-mess">
              {width < 450 ? "*" : "Can't be empty"}
            </span>
          )}
        </div>
        <div className="password-container">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
          />
          {emptyError.password && (
            <span className="error-mess">
              {width < 450 ? "*" : "Can't be empty"}
            </span>
          )}
        </div>

        <button
          onClick={handleLogin}
          onKeyDown={(e) => e.key === "Enter" && handleLogin}
          disabled={isLoading}
        >
         {isLoading ? "Loading..." : "Login"}
        </button>
        <span>
          Don't have an account ? <Link to="/register">Register</Link>
        </span>
      </form>
    </main>
  )
}

export default Login
