import { Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import { Theme } from "./components/context/ThemeContext"
import { Auth } from "./components/context/AuthContext"
import Invoice from "./components/invoice/Invoice"
import Invoices from "./components/invoices/Invoices"
import Layout from "./components/layout/Layout"
import Register from "./pages/register/Register"
import Login from "./pages/login/Login"

function App() {
  const { theme } = useContext(Theme)
  const {isAuth} = useContext(Auth)
  document.body.style.backgroundColor = theme === "dark" ? "#141625" : "#F8F8FB"
  document.body.style.color = theme === "dark" ? "#fff" : "#0C0E16"

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={isAuth ? <Invoices /> : <Navigate to="/login" />} />
        <Route path=":invoiceId" element={isAuth ? <Invoice /> : <Navigate to="/login" />} />
      </Route>
    </Routes>
  )
}

export default App
