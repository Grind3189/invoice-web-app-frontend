export interface AddressInterface {
    street: string,
    city: string,
    postCode: string,
    country: string
}

export interface Items {
    name: string,
    quantity: number,
    price: number,
    total: number
}

export type InvoiceType = {
    _id?: string
    id: string,
    createdAt: string,
    paymentDue: string,
    description: string,
    paymentTerms: number,
    clientName: string,
    clientEmail: string,
    status: string,
    senderAddress: AddressInterface,
    clientAddress: AddressInterface,
    items: Items[],
    total: number
}

