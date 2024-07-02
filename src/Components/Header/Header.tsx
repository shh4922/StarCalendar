import "./header.scss"
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header>
            <Link to={'/'}>오늘 별 촬영 가능?</Link>
        </header>
    )
}

export default Header
