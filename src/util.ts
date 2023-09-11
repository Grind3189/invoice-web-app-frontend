import { InvoiceType } from "./types/invoiceType"
import { nanoid } from "nanoid"

export const getStatusStyle = (status: string) => {
  const style = {
    backgroundColor:
      status === "paid"
        ? "rgba(51, 214, 159, 0.05)"
        : status === "pending"
        ? "rgba(255, 143, 0, 0.05)"
        : "	rgb(223, 227, 250, .05)",
    color:
      status === "paid"
        ? "#33D69F"
        : status === "pending"
        ? "#FF8F00"
        : "#dfe3fa",
  }
  return style
}

export const getSixId = () => {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let result = ""
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }
  return result
}

export const getEmptyInvoice = () => {
  const emptyInvoice: InvoiceType = {
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
  }
  return emptyInvoice
}

export const getEmptySenderAddress = () => {
  const emptySenderAddress = {
    street: "",
    city: "",
    postCode: "",
    country: ""
  }
  return emptySenderAddress
}

export const getEmptyClientAddress = () => {
  const emptyClientAdd = {
    street: "",
    city: "",
    postCode: "",
    country: ""
  }
  return emptyClientAdd
}
export const getEmptyItems = () => {
  const emptyItems = [{
    name: "",
    quantity: 0,
    price: 0,
    total: 0,
    id: nanoid()
  }]
  return emptyItems
}
