import { useState } from 'react'
import "./header.scss"
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header>
            <Link to={'/'}>별 보러 갈래?</Link>
        </header>
    )
}

export default Header
