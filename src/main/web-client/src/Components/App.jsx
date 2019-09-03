import React from 'react'
import SchedulePage from './SchedulePage'
import './style.css'

export default class App extends React.Component {

    render() {
        return (
            <div className="shadow main-container">
                <SchedulePage />
            </div>
        )
    }
}
