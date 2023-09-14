import { Routes, Route } from "react-router-dom"
import { useContext } from "react"
import { Theme } from "./components/context/ThemeContext"
import Invoice from "./components/invoice/Invoice"
import Invoices from "./components/invoices/Invoices"
import Layout from "./components/layout/Layout"
import Register from "./pages/register/Register"
import Login from "./pages/login/Login"

function App() {
  const { theme } = useContext(Theme)

  document.body.style.backgroundColor = theme === "dark" ? "#141625" : "#F8F8FB"
  document.body.style.color = theme === "dark" ? "#fff" : "#0C0E16"

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Invoices />} />
        <Route path=":invoiceId" element={<Invoice />} />
      </Route>
    </Routes>
  )
}

export default App
