import './layout.scss'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {

  return (
    <div className="layout-container">
      <div className="layout-left">
        <Header/>
      </div>
      <div className="layout-right">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout