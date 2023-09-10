import Back from "../buttons/back/Back"
import "./addInvoice.scss"
import deleteIc from "../../assets/icon-delete.svg"
import { Theme } from "../context/ThemeContext"
import { useContext, useEffect, useState } from "react"
import ActionBtnContainer from "../../components/buttons/btnContainer/ActionBtnContainer"
import DarkGrayButton from "../buttons/darkGray/DarkGrayButton"
import LightGrayButton from "../buttons/lightGray/LightGrayButton"
import PurpleButton from "../buttons/purple/PurpleButton"
import useToggle from "../hooks/useToggle"
import arrowDown from "../../assets/icon-arrow-down.svg"
import { InvoiceType, Items, AddressInterface } from "../../types/invoiceType"
import { nanoid } from "nanoid"

interface AddInvoiceProp {
  show: boolean
  toggleShow: () => void
}
const AddInvoice = ({ show, toggleShow }: AddInvoiceProp) => {
  const { theme } = useContext(Theme)
  const [itemCounter, setItemCounter] = useState<number>(1)
  const [showPaymentTerms, togglePaymentTerms] = useToggle(false)
  const [senderAddress, setSenderAddress] = useState<AddressInterface>({
    street: "",
    city: "",
    postCode: "",
    country: "",
  })
  const [clientAddress, setClientAddress] = useState<AddressInterface>({
    street: "",
    city: "",
    postCode: "",
    country: "",
  })

  const [item, setItem] = useState<Items>({
    name: "",
    quantity: 0,
    price: 0,
    total: null,
  })
  const [invoiceData, setInvoiceData] = useState<InvoiceType>({
    id: "",
    createdAt: "",
    paymentDue: "",
    description: "",
    paymentTerms: 30,
    clientName: "",
    clientEmail: "",
    status: "",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    items: [],
    total: 0,
  })
  let itemsEl: JSX.Element[] = []

  useEffect(() => {
    setInvoiceData((prev) => {
      return {
        ...prev,
        senderAddress,
        clientAddress,
        items: [item],
      }
    })
  }, [senderAddress, clientAddress, item])

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
    console.log(e.target.name)

    if (e.target.name === "createdAt") {
      const selectedDate = new Date(e.target.value)
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
      const formattedDate = selectedDate.toLocaleDateString(undefined, options)
      console.log(formattedDate)
    }
    setInvoiceData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.name ==='paymentTerms' ? +e.target.value : e.target.value,
      }
    })
  }

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.name === "price" || e.target.name === "quantity"
            ? +e.target.value
            : e.target.value,
      }
    })
  }

  useEffect(() => {
    setItem((prev) => {
      return {
        ...prev,
        total: +prev.quantity * +prev.price,
      }
    })
  }, [item.price, item.quantity])

  const getItemList = () => {
    for (let i = 0; i < itemCounter; i++) {
      itemsEl.push(
        <div className="item-content" key={i} id={`${i}`}>
          <div className="item-name">
            <p>Item Name</p>
            <input
              type="text"
              className={`${theme}`}
              onChange={handleItemChange}
              value={item.name}
              name="name"
            />
          </div>
          <div className="item-qty">
            <p>QTY.</p>
            <input
              type="number"
              className={`${theme}`}
              onChange={handleItemChange}
              placeholder="0"
              value={item.quantity < 1 ? "" : item.quantity}
              name="quantity"
            />
          </div>

          <div className="item-price">
            <p>Item Price</p>
            <input
              type="number"
              className={`${theme}`}
              onChange={handleItemChange}
              placeholder="0"
              value={item.price < 1 ? "" : item.price}
              name="price"
            />
          </div>

          <div className="item-total">
            <p>Total</p>
            <p className="total-num">{item.total}</p>
          </div>

          <img
            src={deleteIc}
            alt="delete icon"
            onClick={() => setItemCounter((prev) => prev - 1)}
            data-share={`${i}`}
          />
          <p>{i}</p>
        </div>
      )
    }
    return itemsEl
  }

  console.log(invoiceData)

  return (
    <main className={`add-invoice-container ${!show ? "hide" : ""} ${theme}`}>
      <form className="padding-lr">
        <Back handleClick={toggleShow} />
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
              type="text"
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
              <p className="picked-terms">{`Net ${invoiceData.paymentTerms} ${invoiceData.paymentTerms === 1 ? 'day' : 'days'}`}</p>
              <img
                src={arrowDown}
                alt="arrow down"
                className={`${showPaymentTerms ? "show" : ""}`}
              />
            </div>
            <div
              className={`input-terms-container ${
                showPaymentTerms ? "show" : ""
              }`}
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
              <div className="horizontal-line" />
              <input
                type="radio"
                id="seven-days"
                name="paymentTerms"
                value={7}
                onChange={handleInvoiceChange}
                onClick={togglePaymentTerms}
              />
              <label htmlFor="seven-days">Net 7 Days</label>
              <div className="horizontal-line" />
              <input
                type="radio"
                id="fourteen-days"
                name="paymentTerms"
                value={14}
                onChange={handleInvoiceChange}
                onClick={togglePaymentTerms}
              />
              <label htmlFor="fourteen-days">Net 14 Days</label>
              <div className="horizontal-line" />
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
            />
          </div>
        </div>

        <h4 className={`item-list ${theme}`}>Item List</h4>
        <div className="item-list-container">
          {getItemList()}
          <button
            onClick={() => setItemCounter((prev) => prev + 1)}
            type="button"
            className={`${theme}`}
          >
            + Add New Item
          </button>
        </div>
      </form>
      <ActionBtnContainer>
        <DarkGrayButton>Discard</DarkGrayButton>
        <LightGrayButton styles={{ width: "117px" }}>
          Save as Draft
        </LightGrayButton>
        <PurpleButton>Save & Send</PurpleButton>
      </ActionBtnContainer>
    </main>
  )
}

export default AddInvoice
