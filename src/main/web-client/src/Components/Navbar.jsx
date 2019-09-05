import React from 'react'
import {PAGES} from '../utils'

export default function Navbar(props) {
    const {handlePageClick, scheduleClass, exceptionsClass} = props;
    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-secondary mb-3">
            <div className="navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className={"nav-item " + scheduleClass}>
                        <button id={PAGES.schedulePage} className="btn nav-link" onClick={handlePageClick}>
                            Розклад <span className="sr-only">(current)</span>
                        </button>
                    </li>
                    <li className={"nav-item " + exceptionsClass}>
                        <button id={PAGES.exceptionsPage} className="btn nav-link" onClick={handlePageClick}>
                            Виняткові дні
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
