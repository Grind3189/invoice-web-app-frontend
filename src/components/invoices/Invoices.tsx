import arrowDowIc from '../../assets/icon-arrow-down.svg'
import arrowRightIc from '../../assets/icon-arrow-right.svg'
import plusIcon from '../../assets/icon-plus.svg'
import Dot from '../dot/Dot'
import { Link, useLocation } from 'react-router-dom'
import { InvoiceType } from '../../types/invoiceType'
import './invoices.scss'
import { useEffect, useState } from 'react'
import { getStatusStyle } from '../../util'
import emptyImage from '../../assets/illustration-empty.svg'

type InvoicesProp = {
    theme: string
    data: InvoiceType[]
}
const Invoices = ({ theme, data }: InvoicesProp) => {
    const [width, setWidth] = useState<number>(window.innerWidth)
    const [showFilterModal, setShowFilterModal] = useState<boolean>(false)
    const location = useLocation()
    const filterStatus = new URLSearchParams(location.search).get('status')
    const invoiceDocu: InvoiceType[] = filterStatus ? data.filter(invoice => invoice.status === filterStatus) : data

    useEffect(() => {
        const getInnerWidth = () => {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', getInnerWidth)

        return () => {
            window.removeEventListener('resize', getInnerWidth)
        }
    }, [])

    


    const invoicesEl = invoiceDocu.map(invoice => {
        return (
            <div key={invoice.id} className={`invoice-hero invoice-hero-${theme}`}>
                <Link to={`/${invoice.id}`}>
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
                    {width >= 768 && <img src={arrowRightIc} alt='arrow right' />}
                </Link>
            </div>
        )
    })


    const emptyEl = (
        <div className="empty-container">
            <img src={emptyImage} alt='Illustration for empty data' />
            <h1>There is nothing here</h1>
            <p className={`${theme}`}>Create an invoice by clicking the <br />
                <span>New</span> button and get started
            </p>
        </div>
    )

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

    const filterModalEl = (
        <div className={`filter-modal ${showFilterModal && 'show'} ${theme}`}>
            <Link to='?status=draft'>Draft</Link>
            <div className={`hr-line ${theme}`} />
            <Link to='?status=pending'>Pending</Link>
            <div className={`hr-line ${theme}`} />
            <Link to='?status=paid'>Paid</Link>
            <div className={`hr-line ${theme}`} />
            <Link to='.'>All</Link>
        </div>
    )

    return (
        <main className='main-container padding-lr'>
            <section className='first-row'>
                <div className="left-col">
                    <h1>Invoices</h1>
                    <p className={`secondary-${theme}`}>{words.totalInvoice}</p>
                </div>
                <div className="right-col">
                    <div className="dropdown-filter" onClick={() => setShowFilterModal(prev => !prev)}>
                        <div className="filter-btn">
                        <p>{words.filter}</p>
                        <img src={arrowDowIc} alt='arrow down icon' className={showFilterModal ? 'arrow-down' : 'arrow-up'} />
                        </div>
                        {filterModalEl}
                    </div>
                    <button>
                        <img src={plusIcon} alt='Add icon' />
                        <span>{words.newInvoice}</span>
                    </button>
                </div>
            </section>

            {
                invoicesEl.length ?
                    <section className="invoices-container">
                        {invoicesEl}
                    </section>
                    : emptyEl
            }

        </main>
    )
}

export default Invoices