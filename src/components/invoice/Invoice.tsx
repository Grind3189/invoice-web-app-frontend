import { useParams, useLocation, useNavigate } from "react-router-dom"
import { InvoiceType } from "../../types/invoiceType"
import { getEmptyInvoice, getPort, getStatusStyle } from "../../util"
import DarkGrayButton from "../buttons/darkGray/DarkGrayButton"
import RedButton from "../buttons/red/RedButton"
import PurpleButton from "../buttons/purple/PurpleButton"
import Dot from "../dot/Dot"
import "./invoice.scss"
import { useContext, useEffect, useState } from "react"
import { Theme } from "../context/ThemeContext"
import { Width } from "../context/WidthContext"
import useToggle from "../hooks/useToggle"
import ActionBtnContainer from "../../components/buttons/btnContainer/ActionBtnContainer"
import Back from "../buttons/back/Back"
import EditInvoice from "../editInvoice/EditInvoice"
import { Auth } from "../context/AuthContext"

const Invoice = () => {
  const navigate = useNavigate()
  const { theme } = useContext(Theme)
  const { width } = useContext(Width)
  const {changeAuth} = useContext(Auth)
  const [showEdit, toggleShowEdit] = useToggle(false)
  const [showDelete, toggleShowDelete] = useToggle(false)
  const [isLoading, setIsLoading] = useState(true)
  const { invoiceId } = useParams()
  const [invoice, setInvoice] = useState<InvoiceType>(getEmptyInvoice())
  const location = useLocation().state
  const btnStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
  }

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await fetch(`${getPort()}/api/invoice/${invoiceId}`, {
          credentials: "include",
        })
        if (res.status === 403) {
          return changeAuth(false)
        } else if (res.status === 404) {
          return navigate("/", { state: location })
        }
        changeAuth(true)
        const result = await res.json()
        setInvoice(result)
        setIsLoading(false)
      } catch (err) {
        console.error(err)
      }
    }
    fetchInvoice()
  }, [])

  const handlePaid = async () => {
    try {
      const res = await fetch(
        `${getPort()}/api/edit/invoice/paid/${invoice._id}`,
        {
          method: "PUT",
          credentials: "include",
        }
      )
      if (res.status === 404) {
        return navigate("/")
      }
      if (res.status === 403) {
        return changeAuth(false)
      }
      changeAuth(true)
      const newData = { ...invoice, status: "paid" }
      setInvoice(newData)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async () => {
    const res = await fetch(`${getPort()}/api/delete/invoice/${invoice._id}`, {
      method: "DELETE",
      credentials: "include",
    })

    if (res.status === 403) {
      return changeAuth(false)
    }
    changeAuth(true)
    navigate("/", { state: location })
  }

  const handleSave = async (invoiceData: InvoiceType) => {
    const res = await fetch(`${getPort()}/api/edit/invoice/${invoiceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
      credentials: "include",
    })
    toggleShowEdit
    if (res.status === 404 || res.status === 400) {
      return navigate("/")
    }
    await res.json()
    setInvoice(invoiceData)
  }

  const invoiceBtnEl = (
    <div className="invoice-buttons" style={btnStyle}>
      <DarkGrayButton handleClick={toggleShowEdit}>Edit</DarkGrayButton>
      <RedButton handleClick={toggleShowDelete}>Delete</RedButton>
      <PurpleButton handleClick={handlePaid}>Mark as Paid</PurpleButton>
    </div>
  )

  return (
    <>
      {showDelete && (
        <div className="delete-backdrop">
          <div className="delete-container">
            <h1>Confirm Deletion</h1>
            <p>
              Are you sure you want to delete invoice <br />#{invoice.id}? This
              action cannot be undone.
            </p>
            <div className="delete-btn-container">
              <DarkGrayButton handleClick={toggleShowDelete}>
                Cancel
              </DarkGrayButton>
              <RedButton handleClick={handleDelete}>Delete</RedButton>
            </div>
          </div>
        </div>
      )}

      <main className="invoice-container padding-lr">
        {
          <EditInvoice
            show={showEdit}
            toggleShow={toggleShowEdit}
            invoice={invoice}
            handleSave={handleSave}
          />
        }
        <Back state={location} />
        <section
          className={`invoice-status-container ${theme} ${isLoading && 'skeleton-' + theme}`}
        >
          {!isLoading && <p>Status</p>}
          {!isLoading && (
            <div
              className="invoice-status"
              style={getStatusStyle(invoice.status, theme)}
            >
              <Dot status={invoice.status} theme={theme} />
              <p>{invoice.status}</p>
            </div>
          )}
          {width >= 768 && !isLoading && invoiceBtnEl}
        </section>

        <section
          className={`invoice-info-container ${theme} ${isLoading && 'skeleton-' + theme}`}
        >
          <div className={`invoice-info ${theme}`}>
            <div className={`id-container`}>
              {!isLoading && <h3>
                <span className={`hashtag-${theme}`}>#</span>
                {invoice.id}
              </h3>}
              <p className={theme}>{invoice.description}</p>
            </div>
            <p className={`sender-address ${theme}`}>
              {invoice.senderAddress.street}
              <br />
              {invoice.senderAddress.city}
              <br />
              {invoice.senderAddress.postCode}
              <br />
              {invoice.senderAddress.country}
              <br />
            </p>

            <div className="invoice-date-container">
              <p className={theme}>{!isLoading && "Invoice Date"}</p>
              <h3>{invoice.createdAt}</h3>
            </div>

            <div className="payment-due-container">
              <p className={theme}>{!isLoading && "Payment Due"}</p>
              <h3>{invoice.paymentDue}</h3>
            </div>
            <div className="bill-to-container">
              <p className={theme}>{!isLoading && "Bill To"}</p>
              <h3>{invoice.clientName}</h3>
              <p className={`client-address ${theme}`}>
                {invoice.clientAddress.street}
                <br />
                {invoice.clientAddress.city}
                <br />
                {invoice.clientAddress.postCode}
                <br />
                {invoice.clientAddress.country}
                <br />
              </p>
            </div>

            <div className="sent-to-container">
              <p className={theme}>{!isLoading && "Sent to"}</p>
              <h3>{invoice.clientEmail}</h3>
            </div>
          </div>

          <div
            className={`item-desc-container ${theme} item-${isLoading && 'skeleton-' + theme}`}
          >
            <div className="item-info-container">
              {width >= 768 && (
                <>
                  {!isLoading && (
                    <>
                      <p className={`label-name ${theme}`}>Item Name</p>
                      <p className={`label-qty ${theme}`}>QTY.</p>
                      <p className={`label-price ${theme}`}>Price</p>
                      <p className={`label-total ${theme}`}>Total</p>
                    </>
                  )}
                </>
              )}

              {invoice.items.map((item, index) => {
                return (
                  <div key={index} className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <p className={`item-qty ${theme}`}>
                      {item.quantity}
                      {width < 768 && "x"}
                    </p>
                    <p className={`item-price ${theme}`}>
                      ₱ {item.price.toFixed(2)}
                    </p>
                    <h3 className="item-total">₱ {item.total.toFixed(2)}</h3>
                  </div>
                )
              })}
            </div>

            <div className={`total-container ${theme}`}>
              <h4>Amount Due</h4>
              <h1>₱ {invoice.total.toFixed(2)}</h1>
            </div>
          </div>
        </section>
      </main>

      {width < 768 && <ActionBtnContainer>{invoiceBtnEl}</ActionBtnContainer>}
    </>
  )
}

export default Invoice
