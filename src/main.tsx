import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeContext } from './components/context/ThemeContext.tsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ThemeContext>
        <App />
      </ThemeContext>
    </Router>
  </React.StrictMode>,
)
