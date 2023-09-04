import { useParams } from 'react-router-dom'
import { InvoiceType } from '../../types/invoiceType'
import { getStatusStyle } from '../../util'
import DarkGrayButton from '../buttons/darkGray/DarkGrayButton'
import RedButton from '../buttons/red/RedButton'
import PurpleButton from '../buttons/purple/PurpleButton'
import Dot from '../dot/Dot'
import './invoice.scss'

type InvoiceProp = {
  data: InvoiceType[],
  theme: string
}
const Invoice = ({ data, theme }: InvoiceProp) => {
  const { invoiceId } = useParams()
  const filteredInvoice = data.filter(invoice => invoice.id === invoiceId)
  const invoiceInfo = filteredInvoice[0]
  console.log(invoiceInfo)

  return (
    <>
      <main className='invoice-container padding-lr'>
        <section className={`invoice-status-container ${theme}`} >
          <p>Status</p>
          <div className="invoice-status" style={getStatusStyle(invoiceInfo.status)}>
            <Dot status={invoiceInfo.status} />
            <p>{invoiceInfo.status}</p>
          </div>
        </section>

        <section className={`invoice-info-container ${theme}`}>
          <div className={`invoice-info ${theme}`}>
            <div className="id-container">
              <h3><span className={`hashtag-${theme}`}>#</span>{invoiceInfo.id}</h3>
              <p className={theme}>{invoiceInfo.description}</p>
            </div>
            <p className={`sender-address ${theme}`}>
              {invoiceInfo.senderAddress.street}<br />
              {invoiceInfo.senderAddress.city}<br />
              {invoiceInfo.senderAddress.postCode}<br />
              {invoiceInfo.senderAddress.country}<br />
            </p>

            <div className="invoice-date-container">
              <p className={theme}>Invoice Date</p>
              <h3>{invoiceInfo.createdAt}</h3>
            </div>

            <div className="payment-due-container">
              <p className={theme}>Payment Due</p>
              <h3>{invoiceInfo.paymentDue}</h3>
            </div>
            <div className="bill-to-container">
              <p className={theme}>Bill To</p>
              <h3>{invoiceInfo.clientName}</h3>
              <p className={`client-address ${theme}`}>
                {invoiceInfo.clientAddress.street}<br />
                {invoiceInfo.clientAddress.city}<br />
                {invoiceInfo.clientAddress.postCode}<br />
                {invoiceInfo.clientAddress.country}<br />
              </p>
            </div>

            <div className="sent-to-container">
              <p className={theme}>Sent to</p>
              <h3>{invoiceInfo.clientEmail}</h3>
            </div>
          </div>

          <div className={`item-desc-container ${theme}`}>

            <div className="item-info-container">
              {invoiceInfo.items.map((item, index) => {
                return (
                  <>
                    <div key={index} className="item-info">
                      <div key={index} className="item-left-col">
                        <div className="name">
                          <p className={`item-label ${theme}`}>Item Name</p>
                          <h3>{item.name}</h3>
                        </div>
                        <div className="item-second-row">
                          <div className="qty">
                            <p className={`item-label ${theme}`}>QTY.</p>
                            <p className={theme}>{item.quantity} x</p>
                          </div>
                          <div className="item-price">
                            <p className={`item-label ${theme}`}>Price</p>
                            <p className={theme}>₱ {item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="item-total">
                        <p className={`item-label ${theme}`}>Total</p>
                        <h3>₱ {item.total.toFixed(2)}</h3>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>

            <div className={`total-container ${theme}`}>
              <h4>Amount Due</h4>
              <h1>₱ {invoiceInfo.total.toFixed(2)}</h1>
            </div>
          </div>

        </section>

      </main>
      <section className={`invoice-btn-container padding-lr ${theme}`}>
        <DarkGrayButton theme={theme}>Edit</DarkGrayButton>
        <RedButton>Delete</RedButton>
        <PurpleButton>Mark as Paid</PurpleButton>
      </section>
    </>
  )
}

export default Invoice