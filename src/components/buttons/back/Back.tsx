import { Link } from "react-router-dom"
import arrowLeftIc from '../../../assets/icon-arrow-left.svg'
import './back.scss'

interface BackProp {
    path?: string,
    state?: any
}
const Back = ({path = '..', state}: BackProp) => {
    return (
        <div className="goback-container">
            <Link to={path} state={state}>
                <img src={arrowLeftIc} alt="arrow left" />
                Go Back
            </Link>
        </div>
    )
}

export default Back