import React from "react";
import PropTypes from 'prop-types'
import './style.css'
import TimeBlock from './TimeBlock'
import SelectTime from './SelectTime'
import moment from 'moment'

export default class TimePicker extends React.Component {

    static timeFormat = 'HH:mm';
    static allowedSymbols = /[\d:]/;

    static propTypes = {
        timePickerId: PropTypes.string.isRequired,
        handleTimePickerChanged: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showPopup: false,
            timeStr: this.props.time,
            inputError: false,
            selectPopup: {
                timeBlocks: [],
                timeUnits: ''
            }
        };

        this.handleTimePickerChanged = this.props.handleTimePickerChanged;

        this.incHours = this.incHours.bind(this);
        this.decHours = this.decHours.bind(this);
        this.incMins = this.incMins.bind(this);
        this.decMins = this.decMins.bind(this);
        this.handleClockBtn = this.handleClockBtn.bind(this);
        this.handleCloseTimePopup = this.handleCloseTimePopup.bind(this);
        this.handleInputChanged = this.handleInputChanged.bind(this);
        this.handleInputOnBlur = this.handleInputOnBlur.bind(this);
        this.handleTimeChanged = this.handleTimeChanged.bind(this);
        this.handleShowSelectHours = this.handleShowSelectHours.bind(this);
        this.handleShowSelectMins = this.handleShowSelectMins.bind(this);
        this.handleSelectHours = this.handleSelectHours.bind(this);
        this.handleSelectMins = this.handleSelectMins.bind(this);
    }

    render() {
        const {timePickerId} = this.props;
        const {showPopup, timeStr} = this.state;
        const popupDisplayClass = showPopup ? 'd-block' : 'd-none';
        const inputErrorClass = this.state.inputError ? 'is-invalid ' : '';
        let time = moment(timeStr, TimePicker.timeFormat);
        time = time.isValid() ? time : moment('00:00', TimePicker.timeFormat);

        return (
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <div className="row pl-3 pr-3">
                            <input className={inputErrorClass + "col-10 form-control text-center"} type="text"
                                   id={timePickerId} value={timeStr} onChange={this.handleInputChanged}
                                   autoComplete="off" onKeyPress={this.handleKeyPress} onBlur={this.handleInputOnBlur}
                                   placeholder="Select time"/>
                            <button type="button" className="btn btn-outline-secondary col-2"
                                    onClick={this.handleClockBtn}>
                                <i className="far fa-clock"/>
                            </button>
                        </div>
                        <div>
                            <div className={popupDisplayClass + " time-popup rounded shadow col-6 p-3 popup"}>
                                {this.getTimeBlockPopup(time)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getTimeBlockPopup(time) {
        if (this.state.selectPopup.timeBlocks.length === 0) {
            return (
                <div className="row d-flex justify-content-center popup">
                    <TimeBlock incFun={this.incHours} decFun={this.decHours} timeDesc="hours"
                               timeValue={time.get('hours')} handleShowSelectTime={this.handleShowSelectHours}/>
                    <TimeBlock incFun={this.incMins} decFun={this.decMins} timeDesc="mins"
                               timeValue={time.get('minutes')} handleShowSelectTime={this.handleShowSelectMins}/>
                </div>
            );
        }

        const handleSelectTime = this.state.selectPopup.timeUnits === 'hours' ?
            this.handleSelectHours : this.handleSelectMins;
        return (
            <SelectTime selectPopup={this.state.selectPopup} handleSelectTime={handleSelectTime}/>
        );
    }

    handleInputChanged = ev => {
        const timeStr = ev.target.value;
        this.setState({
            inputError: !moment(timeStr, TimePicker.timeFormat).isValid(),
            timeStr: timeStr
        });
    };

    handleKeyPress = ev => {
        if (TimePicker.checkAllowedInputLength(this.state.timeStr) || !TimePicker.allowedSymbols.test(ev.key)) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    };

    handleInputOnBlur = ev => {
        if (this.state.timeStr !== '') {
            const timeStr = TimePicker.getMomentTime(this.state.timeStr).format(TimePicker.timeFormat);
            this.handleTimeChanged(timeStr);
            this.setState({
                inputError: false
            });
        }
    };

    incHours = ev => {
        ev.preventDefault();
        const time = TimePicker.getMomentTime(this.state.timeStr);
        const timeStr = time.add(1, "hours").format(TimePicker.timeFormat);
        this.handleTimeChanged(timeStr)
    };

    decHours = ev => {
        ev.preventDefault();
        const time = TimePicker.getMomentTime(this.state.timeStr);
        const timeStr = time.subtract(1, "hours").format(TimePicker.timeFormat);
        this.handleTimeChanged(timeStr)
    };

    incMins = ev => {
        ev.preventDefault();
        const time = TimePicker.getMomentTime(this.state.timeStr);
        const timeStr = time.add(1, "minutes").format(TimePicker.timeFormat);
        this.handleTimeChanged(timeStr)
    };

    decMins = ev => {
        ev.preventDefault();
        let time = TimePicker.getMomentTime(this.state.timeStr);
        const timeStr = time.subtract(1, "minutes").format(TimePicker.timeFormat);
        this.handleTimeChanged(timeStr);
    };

    handleClockBtn = ev => {
        ev.preventDefault();
        this.addBodyEventListener();
        const timeStr = TimePicker.getMomentTime(this.state.timeStr).format(TimePicker.timeFormat);
        this.handleTimeChanged(timeStr);
        this.setState({
            showPopup: !this.state.showPopup,
        });
    };

    handleShowSelectHours = ev => {
        ev.preventDefault();
        const hours = [...Array(24).keys()];

        this.setState({
            selectPopup: {
                timeBlocks: hours,
                timeUnits: 'hours'
            }
        })
    };

    handleShowSelectMins = ev => {
        ev.preventDefault();
        const mins = [...Array(12).keys()].map(i => i * 5);

        this.setState({
            selectPopup: {
                timeBlocks: mins,
                timeUnits: 'mins'
            }
        })
    };

    handleSelectHours = ev => {
        ev.preventDefault();
        const hours = ev.target.id.substr(5); //index === 5 because of id looks like 'hours01'
        const newTime = hours + this.state.timeStr.substr(2);
        this.handleTimeChanged(newTime);
        this.setState({
            selectPopup: {
                timeBlocks: []
            }
        });
    };

    handleSelectMins = ev => {
        ev.preventDefault();
        const mins = ev.target.id.substr(4); //index === 4 because of id looks like 'mins01'
        const newTime = this.state.timeStr.substr(0, 3) + mins;
        this.handleTimeChanged(newTime);
        this.setState({
            selectPopup: {
                timeBlocks: []
            }
        });
    };

    handleTimeChanged(timeStr) {
        this.setState({timeStr});
        this.handleTimePickerChanged(timeStr, this.props.timePickerId);
    }

    addBodyEventListener() {
        document.body.addEventListener('click', this.handleBodyClick);
    }

    handleCloseTimePopup = ev => {
        ev.preventDefault();
        document.body.removeEventListener('click', this.handleBodyClick);
        this.setState({
            showPopup: false,
            selectPopup: {
                timeBlocks: []
            }
        });
    };

    handleBodyClick = ev => {
        if (!ev.target.classList.contains('popup')) {
            this.handleCloseTimePopup(ev);
        }
    };

    static checkAllowedInputLength(timeStr) {
        return timeStr.length + 1 > 5;
    }

    static getMomentTime(input) {
        const time = moment(input, TimePicker.timeFormat);
        return time.isValid() ? time : moment("00:00", TimePicker.timeFormat);
    }
}
