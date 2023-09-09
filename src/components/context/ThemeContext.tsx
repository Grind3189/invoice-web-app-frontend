import { useState, createContext } from 'react'

type ThemeState = 'dark' | 'light'

interface ThemeContextType {
    theme: string,
    changeTheme: () => void
}

interface ThemeContextProp {
    children: React.ReactNode
}

const Theme = createContext({} as ThemeContextType)

const ThemeContext = ({children}: ThemeContextProp) => {

    const [theme, setTheme] = useState<ThemeState>('dark')

    const changeTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }
    return (
        <Theme.Provider value={{theme, changeTheme}}>
            {children}
        </Theme.Provider>
    )
}

export {ThemeContext, Theme}