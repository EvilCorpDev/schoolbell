import React from 'react'
import VerticalLine from './VerticalLine'
import WeekDayPicker from '../../WeekDayPicker'
import DayPicker from 'react-day-picker'
import MomentLocaleUtils from 'react-day-picker/moment'
import 'react-day-picker/lib/style.css'
import './style.css'
import moment from 'moment'
import 'moment/locale/uk'

export default class ExceptionItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
            selectedDay: moment(this.props.specificDay, 'DD-MM-YYYY').toDate(),
            locale: 'uk'
        };
    }

    render() {
        const {id, profile, repeatable} = this.props;
        return (
            <div >
                <div id={id} className="row pt-3 pb-3">
                    <div className="col-5 d-flex justify-content-center">
                        <DayPicker onDayClick={this.handleDayClick}
                                   selectedDays={this.state.selectedDay}
                                   locale={this.state.locale}
                                   localeUtils={MomentLocaleUtils}/>
                    </div>
                    <VerticalLine />
                    <WeekDayPicker widthClass="col-5" selectedIndex={0}/>
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
}
