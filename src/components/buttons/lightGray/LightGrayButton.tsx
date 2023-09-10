import { useContext } from "react"
import { Theme } from "../../context/ThemeContext"
import "./lightGrayButton.scss"

type LightGrayButtonProp = {
  children: React.ReactNode
  styles?: React.CSSProperties
}
const LightGrayButton = ({ children, styles }: LightGrayButtonProp) => {
  const { theme } = useContext(Theme)
  return (
    <button className={`light-gray-btn ${theme} btn-general`} style={styles}>
      {children}
    </button>
  )
}

export default LightGrayButton
