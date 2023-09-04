import arrowDowIc from '../../assets/icon-arrow-down.svg'
import arrowRightIc from '../../assets/icon-arrow-right.svg'
import plusIcon from '../../assets/icon-plus.svg'
import data from '../../data.json'
import Dot from '../dot/Dot'
import { Link } from 'react-router-dom'
import { InvoiceType } from '../../types/invoiceType'
import './invoices.scss'
import { useEffect, useState } from 'react'

type InvoicesProp = {
    theme: string
}
const Invoices = ({ theme }: InvoicesProp) => {
    const invoiceDocu: InvoiceType[] = data
    const [width, setWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        const getInnerWidth = () => {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', getInnerWidth)

        return () => {
            window.removeEventListener('resize', getInnerWidth)
        }
    }, [])

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
            <div key={invoice.id} className={`invoice-hero invoice-hero-${theme}`}>
                <Link to='/'>
                    <p className='invoice-id'>
                        <span className={`hashtag-${theme}`}>#</span>
                        {invoice.id}
                    </p>
                    <p className={`due-date due-date-${theme}`}>Due {invoice.paymentDue}</p>
                    <p className='name'>{invoice.clientName}</p>
                    <p className='total'>₱ {invoice.total}</p>
                    <div className="status-container" style={getStatusStyle(invoice.status)}>
                        <Dot status={invoice.status} />
                        <p className='status'>{invoice.status}</p>
                    </div>
                    <img src={arrowRightIc} alt='arrow right' />
                </Link>
            </div>
        )
    })


    type wordsType = {
        totalInvoice: string,
        filter: string,
        newInvoice: string
    }

    const words: wordsType = {
        totalInvoice: width < 768 ? 'Num of invoices' : 'There are num total of invoices',
        filter: width < 768 ? 'Filter' : 'Filter by status',
        newInvoice: width < 768 ? 'New' : 'New Invoice'
    }

    return (
        <main className='main-container'>
            <section className='first-row'>
                <div className="left-col">
                    <h1>Invoices</h1>
                    <p className={`secondary-${theme}`}>{words.totalInvoice}</p>
                </div>
                <div className="right-col">
                    <div className="dropdown-filter">
                        <p>{words.filter}</p>
                        <img src={arrowDowIc} alt='arrow down icon' />
                    </div>
                    <button>
                        <img src={plusIcon} alt='Add icon' />
                        <span>{words.newInvoice}</span>
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