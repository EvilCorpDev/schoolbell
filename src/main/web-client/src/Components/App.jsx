import React from 'react'
import SchedulePage from './SchedulePage'
import ExceptionsPage from './ExceptionsPage'
import Navbar from './Navbar'
import ReactJumbotron from './ReactJumbotron'
import {PAGES} from '../utils'
import './style.css'

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activePage: PAGES.exceptionsPage
        };

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    render() {
        const scheduleClass = this.state.activePage === PAGES.schedulePage ? 'active' : '';
        const exceptionsClass = this.state.activePage === PAGES.exceptionsPage ? 'active' : '';
        return (
            <div className="main-container">
                <div id="react-jumbotron">
                    <ReactJumbotron />
                </div>
                <div id="react-navbar">
                    <Navbar scheduleClass={scheduleClass} exceptionsClass={exceptionsClass}
                            handlePageClick={this.handlePageClick}/>
                </div>
                <div className="container p-3 bg-light w-100 rounded">
                    <div id="main-container" className="shadow">
                        <div className="shadow">
                            <SchedulePage displayClass={scheduleClass}/>
                            <ExceptionsPage displayClass={exceptionsClass}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handlePageClick = ev => {
        ev.preventDefault();
        this.setState({
            activePage: ev.target.id
        })
    }
}
