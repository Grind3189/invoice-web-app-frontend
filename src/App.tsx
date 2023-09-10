import Invoice from "./components/invoice/Invoice"
import Invoices from "./components/invoices/Invoices"
import { Theme } from "./components/context/ThemeContext"
import Layout from "./components/layout/Layout"
import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import invoiceData from './data.json'


function App() {
  const {theme} = useContext(Theme)

  document.body.style.backgroundColor = theme === 'dark' ? '#141625' : '#F8F8FB'
  document.body.style.color = theme === 'dark' ? '#fff' : '#0C0E16'
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Invoices data={invoiceData} />} />
        <Route path=":invoiceId" element={<Invoice data={invoiceData} theme={theme} />} />
      </Route>
    </Routes>
  )
}

export default App
