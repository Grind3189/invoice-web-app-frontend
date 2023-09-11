import Invoice from "./components/invoice/Invoice"
import Invoices from "./components/invoices/Invoices"
import { Theme } from "./components/context/ThemeContext"
import Layout from "./components/layout/Layout"
import { Routes, Route } from 'react-router-dom'
import { useContext, useState } from 'react'
import { InvoiceType } from "./types/invoiceType"
import { getSixId } from "./util"
import data from './data.json'


function App() {
  const {theme} = useContext(Theme)
  const [invoiceData, setInvoiceData] = useState(data)


  const handleAddInvoice = (data: InvoiceType, status: string) => {
    const updatedData = {
      ...data,
      id: getSixId(),
      status
    }
    setInvoiceData(prev => {
      return [
        ...prev,
        updatedData
      ]
    })
  }

  document.body.style.backgroundColor = theme === 'dark' ? '#141625' : '#F8F8FB'
  document.body.style.color = theme === 'dark' ? '#fff' : '#0C0E16'
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Invoices data={invoiceData} addInvoice={handleAddInvoice}/>} />
        <Route path=":invoiceId" element={<Invoice data={invoiceData} theme={theme} />} />
      </Route>
    </Routes>
  )
}

export default App
