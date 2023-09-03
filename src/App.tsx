
import Invoices from "./components/invoices/Invoices"
import {Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import Layout from "./components/layout/Layout"

type ThemeState = 'dark' | 'light'

function App() {
  const [theme, setTheme] = useState<ThemeState>('dark')

  const changeTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  document.body.style.backgroundColor = theme === 'dark' ? '#141625' : '#F8F8FB'
  document.body.style.color = theme === 'dark' ? '#fff' : '#0C0E16'
  return (
    // <main className="app-container">
    //   <Header theme={theme} toggleTheme={changeTheme} />
    //   <Invoices theme={theme} />
    // </main>
    <Routes>
      <Route path="/" element={<Layout theme={theme} toggleTheme={changeTheme} />}>
        <Route index element={<Invoices theme={theme} />} />
      </Route>
    </Routes>
  )
}

export default App
