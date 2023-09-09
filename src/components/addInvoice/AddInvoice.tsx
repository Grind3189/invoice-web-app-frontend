import Back from "../buttons/back/Back"
import './addInvoice.scss'
import { Theme } from "../context/ThemeContext"
import { useContext, useState } from 'react'

interface AddInvoiceProp {
  show: boolean
}
const AddInvoice = ({ show }: AddInvoiceProp) => {
  const { theme } = useContext(Theme)
  const [itemCounter, setItemCounter] = useState<number>(1)

  const getItemList = () => {
    const itemsEl = []
    for (let i = 0; i < itemCounter; i++) {
      itemsEl.push(
        <div className="item-content" key={i}>
          <div className="item-name">
            <p>Item Name</p>
            <input type="text" />
          </div>
          <div className="item-qty">
            <p>QTY.</p>
            <input type="number" />
          </div>
          <div className="item-price">
            <p>Item Price</p>
            <input type="number" />
          </div>
        </div>
      )
    }
    return itemsEl
  }



  return (
    <main className={`add-invoice-container padding-lr ${!show ? 'hide' : ''} ${theme}`}>
      <Back />
      <h1>New Invoice</h1>

      <form>

        <div className="bill-from-container">
          <h3>Bill From</h3>
          <div className="street-address">
            <p>Street Address</p>
            <input type="text" />
          </div>
          <div className="city">
            <p>City</p>
            <input type="text" />
          </div>
          <div className="post-code">
            <p>Post Code</p>
            <input type="text" />
          </div>
          <div className="country">
            <p>Country</p>
            <input type="text" />
          </div>
        </div>

        <div className="bill-to-container">
          <h3>Bill To</h3>
          <div className="client-name">
            <p>Client's Name</p>
            <input type="text" />
          </div>
          <div className="client-email">
            <p>Client's Email</p>
            <input type="text" />
          </div>
          <div className="client-address">
            <p>Street Address</p>
            <input type="text" />
          </div>
          <div className="client-city">
            <p>City</p>
            <input type="text" />
          </div>
          <div className="client-post-code">
            <p>Post Code</p>
            <input type="text" />
          </div>
          <div className="client-country">
            <p>Country</p>
            <input type="text" />
          </div>
          <div className="invoice-date">
            <p>Invoice Data</p>
            <input type="date" />
          </div>
          <div className="payment-terms-container">
            <p>Payment Terms</p>
            <div className="payment-terms">
              <input type="radio" id="one-day" name="terms-of-payment" />
              <label htmlFor="one-day">Net 1 Day</label>
              <input type="radio" id="seven-days" name="terms-of-payment" />
              <label htmlFor="seven-days">Net 7 Days</label>
              <input type="radio" id="fourteen-days" name="terms-of-payment" />
              <label htmlFor="fourteen-days">Net 14 Days</label>
              <input type="radio" id="thirty-days" name="terms-of-payment" />
              <label htmlFor="thirty-days">Net 30 Days</label>
            </div>
          </div>
          <div className="project-des">
            <p>Project Description</p>
            <input type="text" />
          </div>
        </div>

        <div className="item-list-container">
          <h3>Item List</h3>
          {getItemList()}
          <button onClick={() => setItemCounter(prev => prev + 1)} type="button">Add New Item</button>
        </div>

      </form>
    </main>
  )
}

export default AddInvoice