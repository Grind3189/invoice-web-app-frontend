import { useParams, useLocation, useNavigate } from "react-router-dom"
import { InvoiceType } from "../../types/invoiceType"
import { getPort, getStatusStyle } from "../../util"
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

type InvoiceProp = {
  data: InvoiceType[]
  deleteInvoice: (id: string) => void
  applyChangesToHome: (data: InvoiceType) => void
}

const Invoice = ({ data, deleteInvoice, applyChangesToHome }: InvoiceProp) => {
  const { theme } = useContext(Theme)
  const { width } = useContext(Width)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [showEdit, toggleShowEdit] = useToggle(false)
  const [showDelete, toggleShowDelete] = useToggle(false)
  const [isLoading, setIsLoading] = useState(true)
  const { invoiceId } = useParams()
  const filteredInvoice = data.filter((invoice) => invoice.id === invoiceId)
  const [invoice, setInvoice] = useState<InvoiceType>(filteredInvoice[0])
  const [prevStatus, setPrevStatus] = useState<string>("")
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
        const res = await fetch(
          `${getPort()}/api/invoice/${invoiceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (!res.ok) {
          return navigate("/", { state: location })
        }
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
    setPrevStatus(invoice.status)
    const newData = { ...invoice, status: "paid" }
    setInvoice(newData)
    applyChangesToHome(newData)

    try {
      const res = await fetch(
        `${getPort()}/api/edit/invoice/paid/${invoice._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!res.ok) {
        const newData = { ...invoice, status: prevStatus }
        setInvoice(newData)
        applyChangesToHome(newData)
        return navigate("/")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async () => {
    navigate("/", { state: location })
    deleteInvoice(invoice.id)
    await fetch(`${getPort()}/api/delete/invoice/${invoice._id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  }

  const handleSave = async (invoiceData: InvoiceType) => {
    setInvoice(invoiceData)
    applyChangesToHome(invoiceData)
    const res = await fetch(
      `${getPort()}/api/edit/invoice/${invoiceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(invoiceData),
      }
    )
    console.log(res)
    await res.json()
  }

  const invoiceBtnEl = (
    <div className="invoice-buttons" style={btnStyle}>
      <DarkGrayButton handleClick={toggleShowEdit}>Edit</DarkGrayButton>
      <RedButton handleClick={toggleShowDelete}>Delete</RedButton>
      <PurpleButton handleClick={handlePaid}>Mark as Paid</PurpleButton>
    </div>
  )

  if (isLoading) {
    return
  }

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
        <section className={`invoice-status-container ${theme}`}>
          <p>Status</p>
          <div
            className="invoice-status"
            style={getStatusStyle(invoice.status, theme)}
          >
            <Dot status={invoice.status} theme={theme} />
            <p>{invoice.status}</p>
          </div>
          {width >= 768 && invoiceBtnEl}
        </section>

        <section className={`invoice-info-container ${theme}`}>
          <div className={`invoice-info ${theme}`}>
            <div className="id-container">
              <h3>
                <span className={`hashtag-${theme}`}>#</span>
                {invoice.id}
              </h3>
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
              <p className={theme}>Invoice Date</p>
              <h3>{invoice.createdAt}</h3>
            </div>

            <div className="payment-due-container">
              <p className={theme}>Payment Due</p>
              <h3>{invoice.paymentDue}</h3>
            </div>
            <div className="bill-to-container">
              <p className={theme}>Bill To</p>
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
              <p className={theme}>Sent to</p>
              <h3>{invoice.clientEmail}</h3>
            </div>
          </div>

          <div className={`item-desc-container ${theme}`}>
            <div className="item-info-container">
              {width >= 768 && (
                <>
                  <p className={`label-name ${theme}`}>Item Name</p>
                  <p className={`label-qty ${theme}`}>QTY.</p>
                  <p className={`label-price ${theme}`}>Price</p>
                  <p className={`label-total ${theme}`}>Total</p>
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
