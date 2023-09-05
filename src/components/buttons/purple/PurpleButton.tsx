import { ButtonProp } from '../../../types/buttonType'
import './purpleButton.scss'

const PurpleButton = ({children} : ButtonProp) => {
  return (
    <button className='purple-btn btn-general'>{children}</button>
  )
}

export default PurpleButton