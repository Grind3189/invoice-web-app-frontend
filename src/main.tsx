import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeContext } from "./components/context/ThemeContext.tsx"
import { WidthContext } from "./components/context/WidthContext.tsx"
import "./index.scss"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <WidthContext>
        <ThemeContext>
          <App />
        </ThemeContext>
      </WidthContext>
    </Router>
  </React.StrictMode>
)
