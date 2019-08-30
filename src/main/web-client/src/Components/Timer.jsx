import React from 'react'
import PropTypes from 'prop-types'
import {negativeToZero, withLeadingZero} from '../utils'

export default class Timer extends React.Component {
    static propTypes = {
        getTimerDistance: PropTypes.func,
        getRestartTimer: PropTypes.func,
        setRestartTimer: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            days: "00",
            hours: "00",
            mins: "00",
            secs: "00",
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.getRestartTimer()) {
            clearInterval(this.timerId);
            this.props.setRestartTimer(false);
            this.startTimer(this.props.getTimerDistance());
        }
    }

    render() {
        return (
            <div className="timer container-fluid text-primary">
                <div className="row">
                    <div
                        className="col-2 rounded d-flex flex-column justify-content-center align-items-center">
                        <div className="timer-days">{withLeadingZero(this.state.days)}</div>
                        <p className="row mb-0">
                            <small>дні</small>
                        </p>
                    </div>
                    <p>:</p>
                    <div
                        className="col-2 rounded d-flex flex-column justify-content-center align-items-center">
                        <div className="timer-hours">{withLeadingZero(this.state.hours)}</div>
                        <small>год</small>
                    </div>
                    <p>:</p>
                    <div
                        className="col-2 rounded d-flex flex-column justify-content-center align-items-center">
                        <div className="timer-mins">{withLeadingZero(this.state.mins)}</div>
                        <small>хвил</small>
                    </div>
                    <p>:</p>
                    <div
                        className="col-2 rounded d-flex flex-column justify-content-center align-items-center">
                        <div className="timer-secs">{withLeadingZero(this.state.secs)}</div>
                        <small>сек</small>
                    </div>
                </div>
            </div>
        )
    }

    startTimer(distance) {
        if (isNaN(distance) || distance === 0) {
            return;
        }
        this.timerId = this.scheduleTimer(distance);
    }

    scheduleTimer(distance) {
        const timerId = setInterval(() => {
            const distanceLeft = distance - new Date().getTime();

            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distanceLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distanceLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distanceLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distanceLeft % (1000 * 60)) / 1000);

            // Display the result in the element
            this.setTimerNumbers(days, hours, minutes, seconds);

            // If the count down is finished, write some text
            if (distanceLeft <= 1000) {
                clearInterval(timerId);
                this.props.setRestartTimer(true);
                this.setTimerNumbers(days, hours, minutes, seconds);
            }
        }, 1000);
        return timerId;
    }


    setTimerNumbers(days, hours, minutes, seconds) {
        this.setState({
            days: negativeToZero(days),
            hours: negativeToZero(hours),
            mins: negativeToZero(minutes),
            secs: negativeToZero(seconds)
        })
    }

}
