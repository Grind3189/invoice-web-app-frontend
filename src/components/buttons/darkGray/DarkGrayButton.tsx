import { ButtonProp } from "../../../types/buttonType"
import "./darkGraybutton.scss"
import { useContext } from "react"
import { Theme } from "../../context/ThemeContext"

const DarkGrayButton = ({ children }: ButtonProp) => {
  const { theme } = useContext(Theme)
  return (
    <button className={`dark-gray-btn ${theme} btn-general`}>{children}</button>
  )
}

export default DarkGrayButton
