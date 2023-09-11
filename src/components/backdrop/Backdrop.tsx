import './backdrop.scss'
type BackdropProp = {
    children: React.ReactNode
    toggleShow: () => void,
    show: boolean
}
const Backdrop = ({children, toggleShow, show}: BackdropProp) => {
  return (
    show && <div className="backdrop-container" onClick={toggleShow}>{children}</div> 
  )
}

export default Backdrop