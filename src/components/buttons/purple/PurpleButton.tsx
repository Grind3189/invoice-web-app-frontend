import "./purpleButton.scss"

type PurpleButtonProp = {
  children: React.ReactNode
  handleClick: () => void
  isDisabled?: boolean
}

const PurpleButton = ({
  children,
  handleClick,
  isDisabled = false,
}: PurpleButtonProp) => {
  return (
    <button
      className="purple-btn btn-general"
      onClick={handleClick}
      type="submit"
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default PurpleButton
