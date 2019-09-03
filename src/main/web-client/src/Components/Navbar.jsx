import React from 'react'

export default function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-secondary mb-3">
            <div className="navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Розклад <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Виняткові дні</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
