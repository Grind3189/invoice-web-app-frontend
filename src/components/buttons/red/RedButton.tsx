import './redButton.scss'

interface RedButtonProp {
  children: React.ReactNode,
  handleClick: () => void
}
const RedButton = ({children, handleClick} : RedButtonProp) => {
  return (
    <button className='red-btn btn-general' onClick={handleClick}>{children}</button>
  )
}



export default RedButton