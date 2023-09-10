import './invoices.scss'
import arrowDowIc from '../../assets/icon-arrow-down.svg'
import arrowRightIc from '../../assets/icon-arrow-right.svg'
import plusIcon from '../../assets/icon-plus.svg'
import Dot from '../dot/Dot'
import { Link, useLocation } from 'react-router-dom'
import { InvoiceType } from '../../types/invoiceType'
import { useEffect, useState, useContext } from 'react'
import { getStatusStyle } from '../../util'
import emptyImage from '../../assets/illustration-empty.svg'
import AddInvoice from '../addInvoice/AddInvoice'
import { Theme } from '../context/ThemeContext'
import useToggle from '../hooks/useToggle'

type InvoicesProp = {
    data: InvoiceType[]
}

interface StatusState {
    draft: boolean,
    pending: boolean,
    paid: boolean
}

const Invoices = ({ data }: InvoicesProp) => {
    const {theme} = useContext(Theme)
    const location: StatusState = useLocation().state
    const [width, setWidth] = useState<number>(window.innerWidth)
    const [showFilterModal, setShowFilterModal] = useToggle(false)
    const [status, setStatus] = useState<StatusState>(location ? location :{
        draft: false,
        pending: false,
        paid: false
    })

    const [showCreate, toggleShowCreate] = useToggle(false)

    const invoiceDocu = data.filter(inv => {
        if (status.draft || status.paid || status.pending) {
            if (status.draft && inv.status === 'draft') {
                return true
            }
            if (status.pending && inv.status === 'pending') {
                return true
            }
            if (status.paid && inv.status === 'paid') {
                return true
            } else { return false }

        } else return true
    })

    const numOfFilter = () => {
        let num: number = 0

        if (status.draft) {
            num++
        }
        if (status.pending) {
            num++
        }
        if (status.paid) {
            num++
        }
        return num
    }

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
                <Link to={`/${invoice.id}`} state={status}>
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
        totalInvoice: width < 768 ? `${invoiceDocu.length} invoices` :
            numOfFilter() === 1 ? `There are ${invoiceDocu.length} ${status.draft ? 'draft' : status.pending ? 'pending' : 'paid'} ${invoiceDocu.length > 1 ? 'invoices' : 'invoice'}` :
                `There are ${invoiceDocu.length} total ${invoiceDocu.length > 1 ? 'invoices' : 'invoice'} `,
        filter: width < 768 ? 'Filter' : 'Filter by status',
        newInvoice: width < 768 ? 'New' : 'New Invoice'
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(prev => {
            return {
                ...prev,
                [e.target.id]: e.target.checked
            }
        })
    }

    const filterModalEl = (
        <div className={`filter-modal ${showFilterModal && 'show'} ${theme}`}>
            <div className="filter-status-container draft-container">
                <label className={`checkbox-placeholder ${status.draft ? 'active' : ''}`} htmlFor='draft'>
                    {status.draft && <svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 10 9" fill="none">
                        <path d="M1.5 4.49976L3.62425 6.62402L8.96995 1.27832" stroke="white" stroke-width="2" />
                    </svg>}
                </label>
                <input
                    type='checkbox'
                    id='draft'
                    checked={status.draft}
                    onChange={handleFilterChange}
                />
                <label htmlFor='draft'>Draft</label>
            </div>
            <div className="filter-status-container pending-container">
                <label className={`checkbox-placeholder ${status.pending ? 'active' : ''}`} htmlFor='pending'>
                    {status.pending && <svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 10 9" fill="none">
                        <path d="M1.5 4.49976L3.62425 6.62402L8.96995 1.27832" stroke="white" stroke-width="2" />
                    </svg>}
                </label>
                <input
                    type='checkbox'
                    id='pending'
                    checked={status.pending}
                    onChange={handleFilterChange}
                />
                <label htmlFor='pending'>Pending</label>
            </div>
            <div className="filter-status-container paid-container">
                <label className={`checkbox-placeholder ${status.paid ? 'active' : ''}`} htmlFor='paid'>
                    {status.paid && <svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 10 9" fill="none">
                        <path d="M1.5 4.49976L3.62425 6.62402L8.96995 1.27832" stroke="white" stroke-width="2" />
                    </svg>}
                </label>
                <input
                    type='checkbox'
                    id='paid'
                    checked={status.paid}
                    onChange={handleFilterChange}
                />
                <label htmlFor='paid'>Paid</label>
            </div>
        </div>
    )

    
    
    return (
        <main className='main-container padding-lr'>
            {<AddInvoice show={showCreate} toggleShow={toggleShowCreate} />}
            <section className='first-row'>
                <div className="left-col">
                    <h1>Invoices</h1>
                    <p className={`secondary-${theme}`}>{words.totalInvoice}</p>
                </div>
                <div className="right-col">
                    <div className="dropdown-filter">
                        <div className="filter-btn" onClick={setShowFilterModal}>
                            <p>{words.filter}</p>
                            <img src={arrowDowIc} alt='arrow down icon' className={showFilterModal ? 'arrow-down' : 'arrow-up'} />
                        </div>
                        {filterModalEl}
                    </div>
                    <button onClick={toggleShowCreate}>
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