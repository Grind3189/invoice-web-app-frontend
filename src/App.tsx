import { Routes, Route } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Invoice from "./components/invoice/Invoice"
import Invoices from "./components/invoices/Invoices"
import { Theme } from "./components/context/ThemeContext"
import Layout from "./components/layout/Layout"
import Auth from "./components/auth/Auth"
import Register from "./pages/register/Register"
import Login from "./pages/login/Login"
import { InvoiceType } from "./types/invoiceType"
import { getPort, getSixId } from "./util"

function App() {
  const { theme } = useContext(Theme)
  const [invoiceData, setInvoiceData] = useState<InvoiceType[] | []>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${getPort()}/api/invoice`, {
          credentials: "include",
        })
        if(!res.ok) {
          return 
        }
        const invoices: InvoiceType[] = await res.json()
        setInvoiceData(invoices)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [])

  const handleAddInvoice = async (data: InvoiceType, status: string) => {
    const updatedData = {
      ...data,
      id: getSixId(),
      status,
    }

    try {
      const res = await fetch(`${getPort()}/api/create/invoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
        credentials: "include",
      })

      const newInvoice = await res.json()

      setInvoiceData((prev) => {
        return [...prev, newInvoice]
      })
    } catch (err) {
      console.error(err)
    }
  }

  const deleteInvoice = (id: string) => {
    const filteredData = invoiceData.filter((invoice) => invoice.id !== id)
    setInvoiceData(filteredData)
  }

  const applyChangesToHome = (data: InvoiceType) => {
    setInvoiceData((prev) => {
      return prev.map((invoice) => {
        return invoice._id === data._id ? data : invoice
      })
    })
  }

  document.body.style.backgroundColor = theme === "dark" ? "#141625" : "#F8F8FB"
  document.body.style.color = theme === "dark" ? "#fff" : "#0C0E16"

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route element={<Auth />}>
          <Route
            index
            element={
              <Invoices data={invoiceData} addInvoice={handleAddInvoice} />
            }
          />
        </Route>
        <Route element={<Auth />}>
          <Route
            path=":invoiceId"
            element={
              <Invoice
                data={invoiceData}
                deleteInvoice={deleteInvoice}
                applyChangesToHome={applyChangesToHome}
              />
            }
          />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
