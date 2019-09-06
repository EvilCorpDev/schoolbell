import React from 'react'
import {PAGES} from '../utils'
import {Link} from 'react-router-dom'

export default function Navbar(props) {
    const {handlePageClick, scheduleClass, exceptionsClass} = props;
    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-secondary mb-3">
            <div className="navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className={"nav-item " + scheduleClass}>
                        <Link id={PAGES.schedulePage} className="nav-link" to="/" onClick={handlePageClick}>
                            Розклад <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className={"nav-item " + exceptionsClass}>
                        <Link id={PAGES.exceptionsPage} className="nav-link" to="exceptions" onClick={handlePageClick}>
                            Виняткові дні
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
