import React from "react";
import './style.css'
import {withLeadingZero} from '../../../utils'

export default class Index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showPopup: false,
            hours: 0,
            mins: 0,
            timeNotSet: true
        };

        this.handleClockBtn = this.handleClockBtn.bind(this);
        this.incHours = this.incHours.bind(this);
        this.decHours = this.decHours.bind(this);
        this.incMins = this.incMins.bind(this);
        this.decMins = this.decMins.bind(this);
    }

    componentDidMount() {
        this.handleTimePickerChanged = this.props.handleTimePickerChanged;
    }

    render() {
        const {timePickerId, handleTimePickerChanged} = this.props;
        const {showPopup, timeNotSet} = this.state;
        const timeValue = withLeadingZero(this.state.hours) + ":" + withLeadingZero(this.state.mins);
        const popupDisplayClass = showPopup ? 'd-block' : 'd-none';
        return (
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <div className="row pl-3 pr-3">
                            <input className="col-10 form-control text-center" type="text" id={timePickerId}
                                   value={timeNotSet ? '' : timeValue} onChange={handleTimePickerChanged}
                                   placeholder="Select time"/>
                            <button className="btn btn-outline-secondary col-2" onClick={this.handleClockBtn}>
                                <i className="far fa-clock"/>
                            </button>
                        </div>
                        <div className={popupDisplayClass + " time-popup rounded shadow col-6 p-3"}>
                            <div className="row d-flex justify-content-center">
                                <div
                                    className="col-5 d-flex justify-content-center mr-2">
                                    <button className="btn arr-btn h-75 mt-2 mr-1" id="incHours"
                                            onClick={this.incHours}>
                                        <i className="fas fa-arrow-up" id="hours"/>
                                    </button>
                                    <div className="text-center pt-1 pb-1">
                                        <div className="timer-hours">{withLeadingZero(this.state.hours)}</div>
                                        <small>hours</small>
                                    </div>
                                    <button className="btn arr-btn h-75 mt-2 ml-1" id="decHours"
                                            onClick={this.decHours}>
                                        <i className="fas fa-arrow-down" id="hours"/>
                                    </button>
                                </div>
                                <div
                                    className="col-5 d-flex justify-content-center ml-2">
                                    <button className="btn arr-btn h-75 mt-2 mr-1" id="incMins" onClick={this.incMins}>
                                        <i className="fas fa-arrow-up" id="minutes"/>
                                    </button>
                                    <div className="text-center pt-1 pb-1">
                                        <div className="timer-mins">{withLeadingZero(this.state.mins)}</div>
                                        <small>mins</small>
                                    </div>
                                    <button className="btn arr-btn h-75 mt-2 ml-1" id="devMins" onClick={this.decMins}>
                                        <i className="fas fa-arrow-down" id="hours"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    incHours = ev => {
        ev.preventDefault();
        const newState = {
            hours: this.getIncreasedHours(),
            mins: this.state.mins
        };
        this.setState(newState);
        this.handleTimePickerChanged(newState, this.props.timePickerId);
    };

    getIncreasedHours() {
        return this.state.hours + 1 > 23 ? 0 : this.state.hours + 1
    }

    decHours = ev => {
        const newState = {
            hours: this.getDecreasedHours(),
            mins: this.state.mins
        };
        ev.preventDefault();
        this.setState(newState);
        this.handleTimePickerChanged(newState, this.props.timePickerId);
    };

    getDecreasedHours() {
        return this.state.hours - 1 < 0 ? 23 : this.state.hours - 1;
    }

    incMins = ev => {
        ev.preventDefault();
        const newState = {
            hours: this.state.hours,
            mins: this.state.mins + 1
        };
        if (newState.mins > 59) {
            newState.mins = 0;
            newState.hours = this.getIncreasedHours()
        }
        this.setState(newState);
        this.handleTimePickerChanged(newState, this.props.timePickerId);
    };

    decMins = ev => {
        ev.preventDefault();
        const newState = {
            hours: this.state.hours,
            mins: this.state.mins - 1
        };
        if (newState.mins < 0) {
            newState.mins = 59;
            newState.hours = this.getDecreasedHours()
        }
        this.setState(newState);
        this.handleTimePickerChanged(newState, this.props.timePickerId);
    };

    handleClockBtn = ev => {
        ev.preventDefault();
        this.setState({
            showPopup: !this.state.showPopup,
            timeNotSet: false
        });
    };
}
