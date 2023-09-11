import "./addInvoice.scss"
import deleteIc from "../../assets/icon-delete.svg"
import { Theme } from "../context/ThemeContext"
import { Width } from "../context/WidthContext"
import { useContext, useEffect, useState } from "react"
import ActionBtnContainer from "../buttons/btnContainer/ActionBtnContainer"
import Back from "../buttons/back/Back"
import DarkGrayButton from "../buttons/darkGray/DarkGrayButton"
import LightGrayButton from "../buttons/lightGray/LightGrayButton"
import PurpleButton from "../buttons/purple/PurpleButton"
import useToggle from "../hooks/useToggle"
import arrowDown from "../../assets/icon-arrow-down.svg"
import { InvoiceType, AddressInterface } from "../../types/invoiceType"
import { nanoid } from "nanoid"
import Backdrop from "../backdrop/Backdrop"
import { getEmptyInvoice, getEmptyItems, getEmptyClientAddress, getEmptySenderAddress} from "../../util"

interface AddInvoiceProp {
  show: boolean
  toggleShow: () => void
  addInvoice: (data: InvoiceType, status: string) => void
}

type ItemState = {
  name: string
  quantity: number
  price: number
  total: number
  id: string
}[]

const AddInvoice = ({ show, toggleShow, addInvoice }: AddInvoiceProp) => {
  const { theme } = useContext(Theme)
  const { width } = useContext(Width)
  document.body.style.overflow = width > 768 && show ? "hidden" : "unset"
  const [showPaymentTerms, togglePaymentTerms] = useToggle(false)
  const [senderAddress, setSenderAddress] = useState<AddressInterface>(getEmptySenderAddress())
  const [clientAddress, setClientAddress] = useState<AddressInterface>(getEmptyClientAddress())

  const [items, setItems] = useState<ItemState>(getEmptyItems())

  const [invoiceData, setInvoiceData] = useState<InvoiceType>(getEmptyInvoice())

  useEffect(() => {
    const itemsWithoutId = items.map((item) => {
      return {
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      }
    })
    setInvoiceData((prev) => {
      return {
        ...prev,
        senderAddress,
        clientAddress,
        items: itemsWithoutId,
      }
    })
  }, [senderAddress, clientAddress, items])

  useEffect(() => {
    if (invoiceData.createdAt && invoiceData.paymentTerms) {
      setInvoiceData((prev) => {
        const createdDate = new Date(prev.createdAt)
        createdDate.setDate(createdDate.getDate() + prev.paymentTerms)
        const dueDate = createdDate.toISOString().split("T")[0]
        return {
          ...prev,
          paymentDue: dueDate,
        }
      })
    }
  }, [invoiceData.createdAt, invoiceData.paymentTerms])

  useEffect(() => {
    let totalPrice = 0
    for (let i = 0; i < items.length; i++) {
      totalPrice += items[i].total
    }

    setInvoiceData((prev) => ({ ...prev, total: totalPrice }))
  }, [items])

  const handleClientAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClientAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSenderAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSenderAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoiceData((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.name === "paymentTerms" ? +e.target.value : e.target.value,
      }
    })
  }

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempItems = items
    const updatedItem = tempItems.map((item) => {
      if (item.id === e.currentTarget.dataset.id) {
        if (e.target.name === "price" || e.target.name === "quantity") {
          const convertedToNum = +e.target.value
          return {
            ...item,
            [e.target.name]: convertedToNum,
            total:
              e.target.name === "price"
                ? convertedToNum * +item.quantity
                : convertedToNum * +item.price,
          }
        } else {
          return {
            ...item,
            [e.target.name]: e.target.value,
          }
        }
      } else return { ...item }
    })

    setItems(updatedItem)
  }

  const addItem = () => {
    setItems((prev) => {
      return [
        ...prev,
        {
          name: "",
          quantity: 0,
          price: 0,
          total: 0,
          id: nanoid(),
        },
      ]
    })
  }

  const deleteItem = (e: React.MouseEvent<HTMLImageElement>) => {
    const updatedItems = items.filter(
      (item) => item.id !== e.currentTarget.dataset.id
    )
    setItems(updatedItems)
  }

  const saveInvoice = () => {
    addInvoice(invoiceData, 'pending')
    toggleShow()
  }

  const saveDraft = () => {
    addInvoice(invoiceData, 'draft')
    toggleShow()
  }

  const discard = () => {
    toggleShow()
    setClientAddress(getEmptyClientAddress())
    setSenderAddress(getEmptySenderAddress())
    setItems(getEmptyItems())
    setInvoiceData(getEmptyInvoice())
  }

  

  const itemsEl = items.map((item) => {
    return (
      <div className="item-content" key={item.id}>
        <div className="item-name">
          <p>Item Name</p>
          <input
            type="text"
            className={`${theme}`}
            onChange={handleItemChange}
            value={item.name}
            name="name"
            data-id={item.id}
            required
          />
        </div>
        <div className="item-qty">
          <p>QTY.</p>
          <input
            type="number"
            className={`${theme}`}
            onChange={handleItemChange}
            value={item.quantity === 0 ? "" : item.quantity}
            placeholder="0"
            name="quantity"
            data-id={item.id}
            required
          />
        </div>

        <div className="item-price">
          <p>Item Price</p>
          <input
            type="number"
            className={`${theme}`}
            onChange={handleItemChange}
            value={item.price === 0 ? "" : item.price}
            placeholder="0"
            name="price"
            data-id={item.id}
            required
          />
        </div>

        <div className="item-total">
          <p>Total</p>
          <p className="total-num">₱ {item.total}</p>
        </div>

        <img
          src={deleteIc}
          alt="delete icon"
          data-id={item.id}
          onClick={deleteItem}
        />
      </div>
    )
  })

  return (
    <Backdrop toggleShow={toggleShow} show={show}>
      <main className={`add-invoice-container ${!show ? "hide" : ""} ${theme}`}>
        <form className="padding-lr">
          {width < 768 && <Back handleClick={toggleShow} />}
          <h1>New Invoice</h1>

          <h3>Bill From</h3>
          <div className="bill-from-container">
            <div className="street-address">
              <p>Street Address</p>
              <input
                type="text"
                className={`${theme}`}
                onChange={handleSenderAddressChange}
                value={senderAddress.street}
                name="street"
                required
              />
            </div>
            <div className="city">
              <p>City</p>
              <input
                type="text"
                className={`${theme}`}
                onChange={handleSenderAddressChange}
                value={senderAddress.city}
                name="city"
                required
              />
            </div>
            <div className="post-code">
              <p>Post Code</p>
              <input
                type="text"
                className={`${theme}`}
                onChange={handleSenderAddressChange}
                value={senderAddress.postCode}
                name="postCode"
                required
              />
            </div>
            <div className="country">
              <p>Country</p>
              <input
                type="text"
                className={`${theme}`}
                onChange={handleSenderAddressChange}
                value={senderAddress.country}
                name="country"
                required
              />
            </div>
          </div>

          <h3>Bill To</h3>
          <div className="bill-to-container">
            <div className="client-name">
              <p>Client's Name</p>
              <input
                type="text"
                className={`${theme}`}
                onChange={handleInvoiceChange}
                value={invoiceData.clientName}
                name="clientName"
                required
              />
            </div>
            <div className="client-email">
              <p>Client's Email</p>
              <input
                type="email"
                className={`${theme}`}
                onChange={handleInvoiceChange}
                value={invoiceData.clientEmail}
                name="clientEmail"
                required
              />
            </div>
            <div className="client-address">
              <p>Street Address</p>
              <input
                type="text"
                className={`${theme}`}
                onChange={handleClientAddressChange}
                value={clientAddress.street}
                name="street"
                required
              />
            </div>
            <div className="client-city">
              <p>City</p>
              <input
                type="text"
                className={`${theme}`}
                onChange={handleClientAddressChange}
                value={clientAddress.city}
                name="city"
                required
              />
            </div>
            <div className="client-post-code">
              <p>Post Code</p>
              <input
                type="text"
                className={`${theme}`}
                onChange={handleClientAddressChange}
                value={clientAddress.postCode}
                name="postCode"
                required
              />
            </div>
            <div className="client-country">
              <p>Country</p>
              <input
                type="text"
                className={`${theme}`}
                onChange={handleClientAddressChange}
                value={clientAddress.country}
                name="country"
                required
              />
            </div>
            <div className="invoice-date">
              <p>Invoice Date</p>
              <input
                type="date"
                className={`${theme}`}
                placeholder="asd"
                name="createdAt"
                value={invoiceData.createdAt}
                onChange={handleInvoiceChange}
                required
              />
            </div>
            <div className="payment-terms-container">
              <p>Payment Terms</p>

              <div
                className={`picked-terms-container ${theme}`}
                onClick={togglePaymentTerms}
              >
                <p className="picked-terms">{`Net ${invoiceData.paymentTerms} ${
                  invoiceData.paymentTerms === 1 ? "day" : "days"
                }`}</p>
                <img
                  src={arrowDown}
                  alt="arrow down"
                  className={`${showPaymentTerms ? "show" : ""}`}
                />
              </div>
              <div
                className={`input-terms-container ${
                  showPaymentTerms ? "show" : ""
                } ${theme}`}
              >
                <input
                  type="radio"
                  id="one-day"
                  name="paymentTerms"
                  value={1}
                  onChange={handleInvoiceChange}
                  onClick={togglePaymentTerms}
                />
                <label htmlFor="one-day">Net 1 Day</label>
                <div className={`horizontal-line ${theme}`} />
                <input
                  type="radio"
                  id="seven-days"
                  name="paymentTerms"
                  value={7}
                  onChange={handleInvoiceChange}
                  onClick={togglePaymentTerms}
                />
                <label htmlFor="seven-days">Net 7 Days</label>
                <div className={`horizontal-line ${theme}`} />
                <input
                  type="radio"
                  id="fourteen-days"
                  name="paymentTerms"
                  value={14}
                  onChange={handleInvoiceChange}
                  onClick={togglePaymentTerms}
                />
                <label htmlFor="fourteen-days">Net 14 Days</label>
                <div className={`horizontal-line ${theme}`} />
                <input
                  type="radio"
                  id="thirty-days"
                  name="paymentTerms"
                  value={30}
                  onChange={handleInvoiceChange}
                  onClick={togglePaymentTerms}
                />
                <label htmlFor="thirty-days">Net 30 Days</label>
              </div>
            </div>
            <div className="project-des">
              <p>Project Description</p>
              <input
                type="text"
                className={`${theme}`}
                onChange={handleInvoiceChange}
                value={invoiceData.description}
                name="description"
                required
              />
            </div>
          </div>

          <h4 className={`item-list ${theme}`}>Item List</h4>
          <div className="item-list-container">
            {itemsEl}
            <button onClick={addItem} type="button" className={`${theme}`}>
              + Add New Item
            </button>
          </div>
        </form>

        <ActionBtnContainer>
          <DarkGrayButton handleClick={discard}>Discard</DarkGrayButton>
          <LightGrayButton styles={{ width: "117px" }} handleClick={saveDraft}>
            Save as Draft
          </LightGrayButton>
          <PurpleButton
            handleClick={saveInvoice}
          >
            Save & Send
          </PurpleButton>
        </ActionBtnContainer>
      </main>
    </Backdrop>
  )
}

export default AddInvoice
