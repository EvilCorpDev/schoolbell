import React from 'react'
import VerticalLine from './VerticalLine'
import WeekDayPicker from '../../WeekDayPicker'
import DayPicker from 'react-day-picker'
import MomentLocaleUtils from 'react-day-picker/moment'
import 'react-day-picker/lib/style.css'
import moment from 'moment'
import 'moment/locale/uk'
import {EXCEPTION_ITEM_PREFIX, WEEK_DAY_ID_PREFIX} from '../../../utils'
import './style.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons'

export default class ExceptionItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
            locale: 'uk',
            exceptionId: props.id
        };

        this.handleWeekDayClick = this.handleWeekDayClick.bind(this);
    }

    render() {
        const selectedDay = this.parseDate(this.props);
        const {id, profileNames, dayOfWeek, displayDelBtnClass, handleRemoveExceptionItem} = this.props;
        const disabledDayPickerClass = dayOfWeek !== undefined ? 'disabled' : '';
        const disabledWeekDayPickerClass = selectedDay !== undefined ? 'disabled' : '';
        const profileOptions = profileNames.map((name, index) => {
            return (
                <option value={name} key={name + index}>
                    {name}
                </option>
            )
        });
        return (
            <div className="shadow mb-3 mt-3 position-relative bg-light">
                <button className={displayDelBtnClass + " btn del-exception-btn"}
                        onClick={handleRemoveExceptionItem} id={EXCEPTION_ITEM_PREFIX + id}>
                    <h3><FontAwesomeIcon icon={faTimesCircle}/></h3>
                </button>
                <div id={id} className="row pt-3 pb-3">
                    <div className={"col-5 d-flex justify-content-center " + disabledDayPickerClass}>
                        <DayPicker onDayClick={this.handleDayClick}
                                   selectedDays={selectedDay}
                                   locale={this.state.locale}
                                   localeUtils={MomentLocaleUtils}/>
                    </div>
                    <VerticalLine/>
                    <WeekDayPicker widthClass="col-5" disabledClass={disabledWeekDayPickerClass}
                                   dayOfWeek={dayOfWeek} handleWeekDayClick={this.handleWeekDayClick}/>
                </div>
                <div className="row d-flex justify-content-center mb-5">
                    <div className="col-4">
                        <label htmlFor={"profileSelect" + id}>Виберіть профайл:</label>
                        <select className="form-control" id={"profileSelect" + id}
                                value={this.props.profile} onChange={this.handleSelectProfile}>
                            {profileOptions}
                        </select>
                    </div>
                </div>
                <hr className="mb-0 mt-1"/>
            </div>
        );
    }

    handleDayClick(day, {selected}) {
        this.props.handleCalendarClick(this.state.exceptionId, day, selected)
    }

    handleWeekDayClick = ev => {
        ev.preventDefault();
        const {dayOfWeek} = this.props;
        let newSelectedDay = Number(ev.currentTarget.id.substr(WEEK_DAY_ID_PREFIX.length));
        newSelectedDay = newSelectedDay === dayOfWeek ? undefined : newSelectedDay;

        this.props.handleWeekDayClick(this.state.exceptionId, newSelectedDay);
    };

    handleSelectProfile = ev => {
        ev.preventDefault();
        this.props.handleSelectProfile(this.state.exceptionId, ev.target.value);
    };

    parseDate(props) {
        if (props.specificDay !== undefined) {
            return moment(this.props.specificDay, 'DD-MM-YYYY').toDate();
        }
        return undefined;
    }
}
