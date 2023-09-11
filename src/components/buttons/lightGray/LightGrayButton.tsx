import { useContext } from "react"
import { Theme } from "../../context/ThemeContext"
import "./lightGrayButton.scss"

type LightGrayButtonProp = {
  children: React.ReactNode
  styles?: React.CSSProperties
  handleClick: () => void
}
const LightGrayButton = ({ children, styles, handleClick }: LightGrayButtonProp) => {
  const { theme } = useContext(Theme)
  return (
    <button className={`light-gray-btn ${theme} btn-general`} style={styles} onClick={handleClick}>
      {children}
    </button>
  )
}

export default LightGrayButton
