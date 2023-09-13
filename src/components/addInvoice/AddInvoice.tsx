import "./addInvoice.scss"
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
import {
  getEmptyInvoice,
  getEmptyItems,
  getEmptyClientAddress,
  getEmptySenderAddress,
  getEmptyEl,
} from "../../util"

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

interface emptyState {
  clientName: boolean | null
  clientEmail: boolean | null
  senderCity: boolean | null
  senderCountry: boolean | null
  senderPostCode: boolean | null
  senderStreet: boolean | null
  clientCity: boolean | null
  clientCountry: boolean | null
  clientPostCode: boolean | null
  clientStreet: boolean | null
  items: boolean | null
  createdAt: boolean | null
  paymentDue: boolean | null
  description: boolean | null
}

const AddInvoice = ({ show, toggleShow, addInvoice }: AddInvoiceProp) => {
  const { theme } = useContext(Theme)
  const { width } = useContext(Width)
  document.body.style.overflow = width > 768 && show ? "hidden" : "unset"
  const [showPaymentTerms, togglePaymentTerms] = useToggle(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const [emptyEl, setEmptyEl] = useState<emptyState>(getEmptyEl())
  const [senderAddress, setSenderAddress] = useState<AddressInterface>(
    getEmptySenderAddress()
  )
  const [clientAddress, setClientAddress] = useState<AddressInterface>(
    getEmptyClientAddress()
  )

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

  const addItem = async () => {
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

  const deleteItem = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    const updatedItems = items.filter(
      (item) => item.id !== e.currentTarget.dataset.id
    )
    setItems(updatedItems)
  }

  const setError = (name: string, value: boolean) => {
    setEmptyEl((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }


  const saveInvoice = () => {
    const {
      createdAt,
      paymentDue,
      description,
      clientName,
      clientEmail,
      senderAddress,
      clientAddress,
      items,
    } = invoiceData

    if (
      clientName &&
      clientEmail &&
      senderAddress.city &&
      senderAddress.country &&
      senderAddress.postCode &&
      senderAddress.street &&
      clientAddress.city &&
      clientAddress.country &&
      clientAddress.postCode &&
      clientAddress.street &&
      items[0].name &&
      items[0].price &&
      items[0].quantity &&
      createdAt &&
      paymentDue &&
      description
    ) {
      setHasError(true)
      addInvoice(invoiceData, "pending")
      toggleShow()
    } else {
      setHasError(true)
      !clientName ? setError("clientName", true) : setError("clientName", false)
      !clientEmail
        ? setError("clientEmail", true)
        : setError("clientEmail", false)
      !senderAddress.city
        ? setError("senderCity", true)
        : setError("senderCity", false)
      !senderAddress.country
        ? setError("senderCountry", true)
        : setError("senderCountry", false)
      !senderAddress.postCode
        ? setError("senderPostCode", true)
        : setError("senderPostCode", false)
      !senderAddress.street
        ? setError("senderStreet", true)
        : setError("senderStreet", false)
      !clientAddress.city
        ? setError("clientCity", true)
        : setError("clientCity", false)
      !clientAddress.country
        ? setError("clientCountry", true)
        : setError("clientCountry", false)
      !clientAddress.postCode
        ? setError("clientPostCode", true)
        : setError("clientPostCode", false)
      !clientAddress.street
        ? setError("clientStreet", true)
        : setError("clientStreet", false)
        !createdAt ? setError("createdAt", true) : setError("createdAt", false)
        !paymentDue ? setError("paymentDue", true) : setError("paymentDue", false)
        !description
        ? setError("description", true)
        : setError("description", false)
        !items[0].name ? setError("items", true) : setError("items", false)
        !items[0].price ? setError("items", true) : setError("items", false)
        !items[0].quantity ? setError("items", true) : setError("items", false)
    }
  }

  const saveDraft = () => {
    addInvoice(invoiceData, "draft")
    toggleShow()
  }

  const discard = () => {
    toggleShow()
    setClientAddress(getEmptyClientAddress())
    setSenderAddress(getEmptySenderAddress())
    setItems(getEmptyItems())
    setInvoiceData(getEmptyInvoice())
    setEmptyEl(getEmptyEl)
    setHasError(false)
  }

  const itemsEl = items.map((item) => {
    return (
      <div className="item-content" key={item.id}>
        <div className="item-name">
          <p>Item Name</p>
          <input
            type="text"
            className={`${theme} ${emptyEl.items && "empty"}`}
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
            className={`${theme} ${emptyEl.items && "empty"}`}
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
            className={`${theme} ${emptyEl.items && "empty"}`}
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

        <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg" data-id={item.id} onClick={deleteItem}>
          <path
            d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
            fill="#888EB0"
            fillRule="nonzero"
          />
        </svg>
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
                className={`${theme} ${emptyEl.senderStreet && "empty"}`}
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
                className={`${theme} ${emptyEl.senderCity && "empty"}`}
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
                className={`${theme} ${emptyEl.senderPostCode && "empty"}`}
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
                className={`${theme} ${emptyEl.senderCountry && "empty"}`}
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
                className={`${theme} ${emptyEl.clientName && "empty"}`}
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
                className={`${theme} ${emptyEl.clientEmail && "empty"}`}
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
                className={`${theme} ${emptyEl.clientStreet && "empty"}`}
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
                className={`${theme} ${emptyEl.clientCity && "empty"}`}
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
                className={`${theme} ${emptyEl.clientPostCode && "empty"}`}
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
                className={`${theme} ${emptyEl.clientCountry && "empty"}`}
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
                className={`${theme} ${emptyEl.createdAt && "empty"}`}
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
                className={`${theme} ${emptyEl.description && "empty"}`}
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
            <div className="error-container">
              {hasError && (
                <span className="empty-text">-All fields must be added</span>
              )}
              {emptyEl.items && (
                <span className="empty-item-text">-An item must be added</span>
              )}
            </div>
          </div>
        </form>

        <ActionBtnContainer>
          <DarkGrayButton handleClick={discard}>Discard</DarkGrayButton>
          <LightGrayButton styles={{ width: "117px" }} handleClick={saveDraft}>
            Save as Draft
          </LightGrayButton>
          <PurpleButton handleClick={saveInvoice}>Save & Send</PurpleButton>
        </ActionBtnContainer>
      </main>
    </Backdrop>
  )
}

export default AddInvoice
