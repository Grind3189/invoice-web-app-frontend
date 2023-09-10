import { Theme } from "../../context/ThemeContext"
import { useContext } from "react"
import './actionBtnContainer.scss'

type ButtonContainerProps = {
    children: React.ReactNode
}

const ButtonContainer = ({children}: ButtonContainerProps) => {
  const {theme} = useContext(Theme)

  return (
    <section className={`action-btn-container ${theme} padding-lr`}>{children}</section>
  )
}

export default ButtonContainer