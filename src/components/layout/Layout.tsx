import './layout.scss'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'

type LayoutProp = {
    theme: string,
    toggleTheme: () => void
}
const Layout = ({theme, toggleTheme}: LayoutProp) => {
  return (
    <div className="layout-container">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Outlet />
    </div>
  )
}

export default Layout