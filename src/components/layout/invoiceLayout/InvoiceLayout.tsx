import { Link, Outlet } from "react-router-dom"
import arrowLeftIc from '../../../assets/icon-arrow-left.svg'
import './invoiceLayout.scss'

const InvoiceLayout = () => {
    return (
        <div className="invoice-layout">
            <div className="goback-container padding-lr">
                <Link to='..'>
                    <img src={arrowLeftIc} alt="arrow left" />
                    Go Back
                </Link>
            </div>
            <Outlet />
        </div>
    )
}

export default InvoiceLayout