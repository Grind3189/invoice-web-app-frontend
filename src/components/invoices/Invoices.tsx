import arrowDowIc from '../../assets/icon-arrow-down.svg'
import plusIcon from '../../assets/icon-plus.svg'
import data from '../../data.json'
import Dot from '../dot/Dot'
import { Link } from 'react-router-dom'
import { InvoiceType } from '../../types/invoiceType'
import './invoices.scss'

type InvoicesProp = {
    theme: string
}
const Invoices = ({ theme }: InvoicesProp) => {
    const invoiceDocu: InvoiceType[] = data

    const getStatusStyle = (status: string) => {
        const style = {
            backgroundColor: status === 'paid' ? 'rgba(51, 214, 159, 0.05)'
                : status === 'pending' ? 'rgba(255, 143, 0, 0.05)'
                    : '	rgb(223, 227, 250, .05)',
            color: status === 'paid' ? '#33D69F'
                : status === 'pending' ? '#FF8F00'
                    : '#dfe3fa'
        }
        return style
    }
    const invoicesEl = invoiceDocu.map(invoice => {
        return (
            <div className={`invoice-hero invoice-hero-${theme}`}>
                <Link to='/'>
                    <div className="invoice-first-row">
                        <p className='invoice-id'>
                            <span className={`hashtag-${theme}`}>#</span>
                            {invoice.id}
                        </p>
                        <p className='name'>{invoice.clientName}</p>
                    </div>
                    <div className="invoice-second-row">
                        <div className="left-col">
                            <p className={`due-date due-date-${theme}`}>Due {invoice.paymentDue}</p>
                            <p className='total'>₱ {invoice.total}</p>
                        </div>
                        <div className="status-container" style={getStatusStyle(invoice.status)}>
                            <Dot status={invoice.status} />
                            <p className='status'>{invoice.status}</p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    })
    return (
        <main className='main-container'>
            <section className='first-row'>
                <div className="left-col">
                    <h1>Invoices</h1>
                    <p className={`secondary-${theme}`}>Num of invoices</p>
                </div>
                <div className="right-col">
                    <div className="dropdown-filter">
                        <p>Filter</p>
                        <img src={arrowDowIc} alt='arrow down icon' />
                    </div>
                    <button>
                        <img src={plusIcon} alt='Add icon' />
                        <span>New</span>
                    </button>
                </div>
            </section>

            <section className="invoices-container">
                {invoicesEl}
            </section>

        </main>
    )
}

export default Invoices