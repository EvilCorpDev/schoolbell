import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {WEEK_DAY_ID_PREFIX} from '../../utils'
import './style.css'

export default class WeekDayPicker extends React.Component {

    MAX_ITEMS = 5;

    constructor(props) {
        super(props);

        this.state = {
            startPosition: this.calculateInitialStartPosition(props.dayOfWeek),
            endPosition: this.calculateInitialEndPosition(props.dayOfWeek)
        }
    }

    defaultShortWeekDayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

    render() {
        const {
            widthClass, shortWeekDayNames, disabledClass,
            handleWeekDayClick, dayOfWeek
        } = this.props;
        const weekDays = this.getWeekDaysToDisplay(shortWeekDayNames);
        const newWeekDays = weekDays.map((weekDay, idx) => {
            const backgroundClass = weekDay.originalIndex === dayOfWeek ? 'btn-primary' : 'btn-outline-secondary';
            return (
                <div className="col-2" key={idx}>
                    <button id={WEEK_DAY_ID_PREFIX + weekDay.originalIndex}
                            className={"btn rounded-circle " + backgroundClass}
                            onClick={handleWeekDayClick}>
                        <h5 className="mt-1">{weekDay.value}</h5>
                    </button>
                </div>
            );
        });
        return (
            <div className={widthClass + " d-flex justify-content-center pl-0 " + disabledClass}>
                <div className="row align-self-center w-100">
                    <div className="col-11 row pl-0 pr-0">
                        <div className="col-1 align-self-center">
                            <button className="btn" onClick={this.handleLeftShift}>
                                <FontAwesomeIcon icon={faChevronLeft} className="float-right"/>
                            </button>
                        </div>
                        {newWeekDays}
                        <div className="col-1 align-self-center">
                            <button className="btn" onClick={this.handleRightShift}>
                                <FontAwesomeIcon icon={faChevronRight}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleRightShift = ev => {
        ev.preventDefault();
        const {startPosition, endPosition} = this.state;
        let newEndPosition = endPosition === startPosition + 1 ?
            this.MAX_ITEMS : Math.min(endPosition + 1, this.defaultShortWeekDayNames.length);
        let newStartPosition = endPosition === startPosition + 1 ? 0 : startPosition + 1;

        this.setState({
            startPosition: newStartPosition,
            endPosition: newEndPosition
        })
    };

    handleLeftShift = ev => {
        ev.preventDefault();
        const {startPosition, endPosition} = this.state;
        let newStartPosition = startPosition - 1;
        let newEndPosition = endPosition;
        if (newStartPosition < 0) {
            newStartPosition = this.defaultShortWeekDayNames.length - 1;
            newEndPosition = this.defaultShortWeekDayNames.length
        } else if (endPosition - startPosition >= this.MAX_ITEMS) {
            newEndPosition = endPosition - 1;
        }

        this.setState({
            startPosition: newStartPosition,
            endPosition: newEndPosition
        })
    };

    getWeekDaysToDisplay(shortWeekDayNames) {
        const {startPosition, endPosition} = this.state;
        const weekDays = shortWeekDayNames ? shortWeekDayNames : this.defaultShortWeekDayNames;
        let newWeekDays = weekDays.slice(startPosition, endPosition);
        newWeekDays = newWeekDays.map((weekDay, index) => {
            return {
                value: weekDay,
                originalIndex: index + startPosition
            }
        });
        if (newWeekDays.length < this.MAX_ITEMS) {
            const itemsLeftToPick = this.MAX_ITEMS - newWeekDays.length;
            for (let i = 0; i < itemsLeftToPick; i++) {
                newWeekDays.push({value: weekDays[i], originalIndex: i});
            }
        }
        return newWeekDays;
    }

    calculateInitialStartPosition(dayOfWeek) {
        let startPosition = 0;
        if (dayOfWeek !== undefined) {
            startPosition = dayOfWeek - 2;
            if (startPosition < 0) {
                startPosition = this.defaultShortWeekDayNames.length + startPosition; // making '+' here because startIndex < 0
            }
        }
        return startPosition;
    }

    calculateInitialEndPosition(dayOfWeek) {
        let endIndex = this.MAX_ITEMS;
        if (dayOfWeek !== undefined) {
            const startIndex = dayOfWeek - 2;
            endIndex = dayOfWeek + 2;
            if (startIndex < 0) {
                endIndex = this.defaultShortWeekDayNames.length
            }
        }
        return endIndex
    }
}
