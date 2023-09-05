import './layout.scss'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'

type LayoutProp = {
  theme: string,
  toggleTheme: () => void
}
const Layout = ({ theme, toggleTheme }: LayoutProp) => {
  return (
    <div className="layout-container">
      <div className="layout-left">
        <Header theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div className="layout-right">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout