import "./darkGraybutton.scss"
import { useContext } from "react"
import { Theme } from "../../context/ThemeContext"

type DarkGrayButtonProp = {
  children: React.ReactNode,
  handleClick: () => void
}
const DarkGrayButton = ({ children, handleClick }: DarkGrayButtonProp ) => {
  const { theme } = useContext(Theme)
  return (
    <button className={`dark-gray-btn ${theme} btn-general`} onClick={handleClick}>{children}</button>
  )
}

export default DarkGrayButton
