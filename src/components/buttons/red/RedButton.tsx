import { ButtonProp } from '../../../types/buttonType'
import './redButton.scss'


const RedButton = ({children} : ButtonProp) => {
  return (
    <button className='red-btn btn-general'>{children}</button>
  )
}

export default RedButton