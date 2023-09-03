import logo from '../../assets/logo.svg'
import moonIcon from '../../assets/icon-moon.svg'
import sunIcon from '../../assets/icon-sun.svg'
import avatar from '../../assets/avatar.png'
import './header.scss'

type HeaderProp = {
    theme: string,
    toggleTheme: () => void
}
const Header = ({ theme, toggleTheme }: HeaderProp) => {
    return (
        <header className={`header-${theme}`}>
            <img src={logo} alt='logo icon' className='logo' />
            <img
                src={theme === 'dark' ? sunIcon : moonIcon}
                alt='sun icon'
                className='theme-icon'
                onClick={toggleTheme}
            />
            <div className="avatar-container">
                <img src={avatar} alt='avatar' />
            </div>
        </header>
    )
}

export default Header