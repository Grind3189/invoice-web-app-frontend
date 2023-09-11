import { InvoiceType } from '../../../types/invoiceType'
import './purpleButton.scss'

type PurpleButtonProp = {
  children: React.ReactNode,
  handleClick: (data: InvoiceType, status: string) => void,
  data: InvoiceType,
  toggleAddInvoice: () => void
}

const PurpleButton = ({children, handleClick, data, toggleAddInvoice} : PurpleButtonProp) => {

  const handleSave = () => {
    handleClick(data, 'pending')
    toggleAddInvoice()
  }

  return (
    <button className='purple-btn btn-general' onClick={handleSave} type='submit'>{children}</button>
  )
}

export default PurpleButton