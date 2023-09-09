import logo from '../../assets/logo.svg'
import moonIcon from '../../assets/icon-moon.svg'
import sunIcon from '../../assets/icon-sun.svg'
import avatar from '../../assets/avatar.png'
import { Theme } from '../context/ThemeContext'
import { useContext } from 'react'
import './header.scss'


const Header = () => {
    const {theme, changeTheme } = useContext(Theme)
    return (
        <header className={`header-${theme}`}>
            <img src={logo} alt='logo icon' className='logo' />
            <img
                src={theme === 'dark' ? sunIcon : moonIcon}
                alt='sun icon'
                className='theme-icon'
                onClick={changeTheme}
            />
            <div className="avatar-container">
                <img src={avatar} alt='avatar' />
            </div>
        </header>
    )
}

export default Header