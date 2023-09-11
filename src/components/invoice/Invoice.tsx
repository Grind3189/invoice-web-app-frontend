import { useParams, useLocation } from 'react-router-dom'
import { InvoiceType } from '../../types/invoiceType'
import { getStatusStyle } from '../../util'
import DarkGrayButton from '../buttons/darkGray/DarkGrayButton'
import RedButton from '../buttons/red/RedButton'
import PurpleButton from '../buttons/purple/PurpleButton'
import Dot from '../dot/Dot'
import './invoice.scss'
import {useContext } from 'react'
import { Theme } from '../context/ThemeContext'
import { Width } from '../context/WidthContext'
import ActionBtnContainer from '../../components/buttons/btnContainer/ActionBtnContainer'
import Back from '../buttons/back/Back'


type InvoiceProp = {
  data: InvoiceType[],
  theme: string
}
const Invoice = ({ data }: InvoiceProp) => {
  const {theme} = useContext(Theme)
  const {width} = useContext(Width)
  const { invoiceId } = useParams()
  const filteredInvoice = data.filter(invoice => invoice.id === invoiceId)
  const invoiceInfo = filteredInvoice[0]
  const location = useLocation().state
  const btnStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px'
  }

  const invoiceBtnEl = (
    <div className="invoice-buttons" style={btnStyle}>
      <DarkGrayButton>Edit</DarkGrayButton>
      <RedButton>Delete</RedButton>
      <PurpleButton>Mark as Paid</PurpleButton>
    </div>
  )

  return (
    <>
      <main className='invoice-container padding-lr'>
        <Back state={location} />
        <section className={`invoice-status-container ${theme}`} >
          <p>Status</p>
          <div className="invoice-status" style={getStatusStyle(invoiceInfo.status)}>
            <Dot status={invoiceInfo.status} />
            <p>{invoiceInfo.status}</p>
          </div>
          {width >= 768 && invoiceBtnEl}
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
              {width >= 768 &&
                <>
                  <p className={`label-name ${theme}`}>Item Name</p>
                  <p className={`label-qty ${theme}`}>QTY.</p>
                  <p className={`label-price ${theme}`}>Price</p>
                  <p className={`label-total ${theme}`}>Total</p>
                </>
              }

              {invoiceInfo.items.map((item, index) => {
                return (
                  <div key={index} className='item-info'>
                    <h3 className='item-name'>{item.name}</h3>
                    <p className={`item-qty ${theme}`}>{item.quantity}{width < 768 && 'x'}</p>
                    <p className={`item-price ${theme}`}>₱ {item.price.toFixed(2)}</p>
                    <h3 className='item-total'>₱ {item.total.toFixed(2)}</h3>
                  </div>
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

      {width < 768 && <ActionBtnContainer>
        {invoiceBtnEl}
      </ActionBtnContainer>}

    </>
  )
}

export default Invoice