import { InvoiceType } from "./types/invoiceType"
import { nanoid } from "nanoid"

export const getStatusStyle = (status: string, theme: string) => {
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

  const lightstyle = {
    backgroundColor:
      status === "paid"
        ? "rgba(51, 214, 159, 0.05)"
        : status === "pending"
        ? "rgba(255, 143, 0, 0.05)"
        : "	rgba(55, 59, 83, .05)",
    color:
      status === "paid"
        ? "#33D69F"
        : status === "pending"
        ? "#FF8F00"
        : "#373B53",
  }
  return theme === 'light' ? lightstyle : style
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

export const getEmptyEl = () => {
  const empty = {
    clientName: false,
    clientEmail: false,
    senderCity: false,
    senderCountry: false,
    senderPostCode: false,
    senderStreet: false,
    clientCity: false,
    clientCountry: false,
    clientPostCode: false,
    clientStreet: false,
    items: false,
    createdAt: false,
    paymentDue: false,
    description: false,
  }

  return empty
}