import './purpleButton.scss'

type PurpleButtonProp = {
  children: React.ReactNode,
  handleClick: () => void,
}

const PurpleButton = ({children, handleClick } : PurpleButtonProp) => {

  return (
    <button className='purple-btn btn-general' onClick={handleClick} type='submit'>{children}</button>
  )
}

export default PurpleButton