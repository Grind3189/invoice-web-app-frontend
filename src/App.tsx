import InvoiceLayout from "./components/layout/invoiceLayout/InvoiceLayout"
import Invoice from "./components/invoice/Invoice"
import Invoices from "./components/invoices/Invoices"
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Layout from "./components/layout/Layout"
import invoiceData from './data.json'

type ThemeState = 'dark' | 'light'

function App() {
  const [theme, setTheme] = useState<ThemeState>('dark')

  const changeTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  document.body.style.backgroundColor = theme === 'dark' ? '#141625' : '#F8F8FB'
  document.body.style.color = theme === 'dark' ? '#fff' : '#0C0E16'
  return (

    <Routes>
      <Route path="/" element={<Layout theme={theme} toggleTheme={changeTheme} />}>
        <Route index element={<Invoices theme={theme} data={invoiceData} />} />
        <Route path=":invoiceId" element={<InvoiceLayout />}>
        <Route index element={<Invoice data={invoiceData} theme={theme} />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
