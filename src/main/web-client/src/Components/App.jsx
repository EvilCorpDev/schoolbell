import React from 'react'
import SchedulePage from './SchedulePage'
import ExceptionsPage from './ExceptionsPage'
import Navbar from './Navbar'
import ReactJumbotron from './ReactJumbotron'
import {getPageName, JUMBOTRON_INFO, PAGES} from '../utils'
import './style.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activePage: getPageName(window.location.pathname)
        };

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    render() {
        const scheduleClass = this.state.activePage === PAGES.schedulePage ? 'active' : '';
        const exceptionsClass = this.state.activePage === PAGES.exceptionsPage ? 'active' : '';
        const jumboHeader = JUMBOTRON_INFO[this.state.activePage].header;
        const jumboDesc = JUMBOTRON_INFO[this.state.activePage].description;
        return (
            <Router>
                <div className="main-container">
                    <div id="react-jumbotron">
                        <ReactJumbotron header={jumboHeader} description={jumboDesc}/>
                    </div>
                    <div id="react-navbar">
                        <Navbar scheduleClass={scheduleClass} exceptionsClass={exceptionsClass}
                                handlePageClick={this.handlePageClick}/>
                    </div>
                    <div className="container">
                        <div id="main-container" >
                            <div >
                                <Route exact path="/" component={SchedulePage} />
                                <Route path="/exceptions/" component={ExceptionsPage} />
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }

    handlePageClick = ev => {
        this.setState({
            activePage: ev.target.id
        })
    }
}

// withRouter(props => <App {...props} />)
