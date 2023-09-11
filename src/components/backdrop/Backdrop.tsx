import "./backdrop.scss"
type BackdropProp = {
  children: React.ReactNode
  toggleShow: () => void
  show: boolean
}
const Backdrop = ({ children, toggleShow, show }: BackdropProp) => {

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }
  return (
    show && (
      <div className="backdrop-container" onClick={toggleShow}>
        <div className="backdrop-content" onClick={handleClick}>{children}</div>
      </div>
    )
  )
}

export default Backdrop
