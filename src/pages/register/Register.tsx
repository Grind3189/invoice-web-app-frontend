import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.svg"
import { useEffect, useRef, useState, useContext } from "react"
import { Width } from "../../components/context/WidthContext"
import "./register.scss"
import { getPort } from "../../util"

interface RegisterData {
  email: string
  password: string
  repeatPassword: string
}
interface EmptyErrorState {
  email: boolean
  password: boolean
  repeatPassword: boolean
}
function Register() {
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: "",
    password: "",
    repeatPassword: "",
  })

  const [emptyError, setEmptyError] = useState<EmptyErrorState>({
    email: false,
    password: false,
    repeatPassword: false,
  })

  const [error, setError] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null!)
  const { width } = useContext(Width)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleRegister = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const { email, password, repeatPassword } = registerData

    const setEmpty = (elementName: string, isEmpty: boolean) => {
      setEmptyError((prev) => ({ ...prev, [elementName]: isEmpty }))
    }

    if (!email || !password || !repeatPassword) {
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
      if (!repeatPassword) {
        setEmpty("repeatPassword", true)
      } else {
        setEmpty("repeatPassword", false)
      }
    }

    const res = await fetch(`${getPort()}/api/auth/register`, {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
    })

    if(res.status === 401) {
        return setError("Invalid password")
    } else if (res.status === 403) {
        return setError("Email is already registered")
    }

    await res.json()
    navigate('/login')

  }

  return (
    <main className="register-container">
      <img src={logo} alt="logo" />
      <form className="register-form">
        <h1>Register</h1>
        {error && <span className="error-mess general-err">{error}</span>}
        <div className="email-container">
          <input
            type="email"
            name="email"
            placeholder="Dummy email"
            value={registerData.email}
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
            value={registerData.password}
            onChange={handleChange}
          />
          {emptyError.password && (
            <span className="error-mess">
              {width < 450 ? "*" : "Can't be empty"}
            </span>
          )}
        </div>
        <div className="repeatPassword-container">
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat password"
            value={registerData.repeatPassword}
            onChange={handleChange}
          />
          {emptyError.repeatPassword && (
            <span className="error-mess">
              {width < 450 ? "*" : "Can't be empty"}
            </span>
          )}
        </div>
        <button onClick={handleRegister} onKeyDown={(e) => e.key === 'Enter' && handleRegister}>Create an account</button>
        <span>
          Already have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
    </main>
  )
}

export default Register