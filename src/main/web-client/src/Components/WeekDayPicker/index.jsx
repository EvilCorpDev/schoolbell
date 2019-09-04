import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import './style.css'

export default class WeekDayPicker extends React.Component {

    static MAX_ITEMS = 4;

    constructor(props) {
        super(props);

        this.state = {
            startPosition: 0,
            endPosition: WeekDayPicker.MAX_ITEMS
        }
    }

    defaultShortWeekDayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

    render() {
        const {widthClass, shortWeekDayNames} = this.props;
        const weekDays = this.getWeekDayNumbers(shortWeekDayNames);
        const newWeekDays = weekDays.map((weekDay, idx) => {
            return (
                <div className="col-2" key={idx}>
                    <button className="btn week-btn rounded-circle">
                        <h5 className="mt-1">{weekDay}</h5>
                    </button>
                </div>
            );
        });
        return (
            <div className={widthClass + " d-flex justify-content-center pl-0"}>
                <div className="row align-self-center w-100">
                    <div className="col-11 row pl-0 pr-0">
                        <div className="col-2 align-self-center">
                            <FontAwesomeIcon icon={faChevronLeft} className="float-right"/>
                        </div>
                        {newWeekDays}
                        <div className="col-2 align-self-center">
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </div>
                    </div>
                </div>
                <div className="col-1"/>
            </div>
        );
    }

    getWeekDayNumbers(shortWeekDayNames) {
        const {startPosition, endPosition} = this.state;
        const weekDays = shortWeekDayNames ? shortWeekDayNames : this.defaultShortWeekDayNames;
        let newWeekDays = weekDays.slice(startPosition, endPosition);
        if (newWeekDays.length < WeekDayPicker.MAX_ITEMS) {
            for (let i = 0; i < WeekDayPicker.MAX_ITEMS - newWeekDays.length; i++) {
                newWeekDays.push(weekDays[i]);
            }
        }
        return newWeekDays;
    }
}
