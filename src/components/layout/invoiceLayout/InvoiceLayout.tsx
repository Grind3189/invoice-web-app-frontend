import { Outlet } from "react-router-dom"
import './invoiceLayout.scss'
import { useLocation } from "react-router-dom"
import Back from "../../buttons/back/Back"

const InvoiceLayout = () => {
    const location = useLocation().state
    console.log(location)
    return (
        <div className="invoice-layout padding-lr">
            <Back state={location}/>
            <Outlet />
        </div>
    )
}

export default InvoiceLayout