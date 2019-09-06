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
            selectedDay: this.getInitialDate(props),
            locale: 'uk',
            dayOfWeek: this.props.dayOfWeek,
            selectedProfile: this.props.profile
        };

        this.handleWeekDayClick = this.handleWeekDayClick.bind(this);
    }

    render() {
        const {id, profileNames, displayDelBtnClass, handleExceptionItem} = this.props;
        const disabledDayPickerClass = this.state.dayOfWeek !== undefined ? 'disabled' : '';
        const disabledWeekDayPickerClass = this.state.selectedDay !== undefined ? 'disabled' : '';
        const profileOptions = profileNames.map((name, index) => {
            return (
                <option value={name} key={name + index}>
                    {name}
                </option>
            )
        });
        return (
            <div className="shadow mb-3 mt-3 position-relative">
                <button className={displayDelBtnClass + " btn del-exception-btn"}
                        onClick={handleExceptionItem} id={EXCEPTION_ITEM_PREFIX + id}>
                    <h3><FontAwesomeIcon icon={faTimesCircle}/></h3>
                </button>
                <div id={id} className="row pt-3 pb-3">
                    <div className={"col-5 d-flex justify-content-center " + disabledDayPickerClass}>
                        <DayPicker onDayClick={this.handleDayClick}
                                   selectedDays={this.state.selectedDay}
                                   locale={this.state.locale}
                                   localeUtils={MomentLocaleUtils}/>
                    </div>
                    <VerticalLine/>
                    <WeekDayPicker widthClass="col-5" disabledClass={disabledWeekDayPickerClass}
                                   dayOfWeek={this.state.dayOfWeek} handleWeekDayClick={this.handleWeekDayClick}/>
                </div>
                <div className="row d-flex justify-content-center mb-5">
                    <div className="col-4">
                        <label htmlFor={"profileSelect" + id}>Виберіть профайл:</label>
                        <select className="form-control" id={"profileSelect" + id}
                                value={this.state.selectedProfile} onChange={this.handleSelectProfile}>
                            {profileOptions}
                        </select>
                    </div>
                </div>
                <hr className="mb-0 mt-1"/>
            </div>
        );
    }

    handleDayClick(day, {selected}) {
        if (selected) {
            // Unselect the day if already selected
            this.setState({selectedDay: undefined});
            return;
        }
        this.setState({selectedDay: day});
    }

    handleWeekDayClick = ev => {
        ev.preventDefault();
        const {dayOfWeek} = this.state;
        let newSelectedDay = Number(ev.currentTarget.id.substr(WEEK_DAY_ID_PREFIX.length));
        newSelectedDay = newSelectedDay === dayOfWeek ? undefined : newSelectedDay;
        this.setState({
            dayOfWeek: newSelectedDay
        })
    };

    handleSelectProfile = ev => {
        ev.preventDefault();
        this.setState({
            selectedProfile: ev.target.value
        })
    };

    getInitialDate(props) {
        if (props.specificDay !== undefined) {
            return moment(this.props.specificDay, 'DD-MM-YYYY').toDate();
        }
        return undefined;
    }
}
