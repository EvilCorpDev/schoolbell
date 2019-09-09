import React from 'react'
import uuidv4 from "uuid/v4"
import ExceptionItem from './Exceptions/ExceptionItem/'
import {EXCEPTION_ITEM_PREFIX} from '../utils'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faSave} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

export default class ExceptionsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            exceptions: [],
            profileNames: [],
            deletedExceptions: []
        };

        this.handleRemoveExceptionItem = this.handleRemoveExceptionItem.bind(this);
        this.handleCalendarClick = this.handleCalendarClick.bind(this);
        this.handleWeekDayClick = this.handleWeekDayClick.bind(this);
        this.handleSelectProfile = this.handleSelectProfile.bind(this);
    }

    componentDidMount() {
        this.getAndSetExceptionDays(this.getAndSetProfileNames);
    }

    render() {
        const {exceptions} = this.state;
        const displayDelBtnClass = exceptions.length > 1 ? '' : 'd-none';
        const exceptionItems = exceptions.map(exception => {
            return (
                <ExceptionItem {...exception} key={exception.id}
                               profileNames={this.state.profileNames}
                               displayDelBtnClass={displayDelBtnClass}
                               handleRemoveExceptionItem={this.handleRemoveExceptionItem}
                               handleCalendarClick={this.handleCalendarClick}
                               handleWeekDayClick={this.handleWeekDayClick}
                               handleSelectProfile={this.handleSelectProfile}/>
            );
        });
        return (
            <div className="exceptionsPage">
                <div className="exception-items">
                    {exceptionItems}
                </div>
                <div className="row mt-4 mb-4 d-flex flex-row-reverse">
                    <div className="mr-1">
                        <button className='btn btn-secondary mr-3'
                                onClick={this.handleAddNewExceptionItem}>
                            <FontAwesomeIcon icon={faPlus}/> Додати виняток
                        </button>
                        <button className='btn btn-info'
                                onClick={this.handleSaveAllExceptions}>
                            <FontAwesomeIcon icon={faSave}/> Зберегти
                        </button>
                    </div>
                </div>
                <Alert stack={{limit: 3}}/>
            </div>
        )
    }

    handleCalendarClick(exceptionId, day, selected) {
        const newExceptions = this.getNewEditedExceptions(this.state.exceptions, exceptionId, 'specificDay',
            moment(day).format("DD-MM-YYYY"), selected);

        this.setState({
            exceptions: newExceptions
        });
    }

    handleWeekDayClick(exceptionId, dayOfWeek) {
        const newExceptions = this.getNewEditedExceptions(this.state.exceptions, exceptionId, 'dayOfWeek', dayOfWeek);
        this.setState({
            exceptions: newExceptions
        })
    }

    handleSelectProfile(exceptionId, selectedProfile) {
        const newExceptions = this.getNewEditedExceptions(this.state.exceptions, exceptionId, 'profile', selectedProfile);
        this.setState({
            exceptions: newExceptions
        })
    }

    handleRemoveExceptionItem = ev => {
        const exceptionItemId = ev.currentTarget.id.substr(EXCEPTION_ITEM_PREFIX.length);
        const newExceptions = this.state.exceptions.slice().filter(exception => exception.id !== exceptionItemId);
        let newDeletedExceptions = this.state.deletedExceptions.slice();
        newDeletedExceptions.push(exceptionItemId);

        this.setState({
            exceptions: newExceptions,
            deletedExceptions: newDeletedExceptions
        })
    };

    handleAddNewExceptionItem = ev => {
        ev.preventDefault();
        let newExceptionsState = this.state.exceptions.slice();
        newExceptionsState.push(this.getNewEmptyException());

        this.setState({
            exceptions: newExceptionsState
        })
    };

    handleSaveAllExceptions = ev => {
        ev.preventDefault();
        const {exceptions, deletedExceptions} = this.state;
        if (deletedExceptions.length > 0) {
            this.deleteExceptionDaysOnServer(deletedExceptions);
        }

        fetch('/bell/exception-days', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exceptions)
        })
            .then(() => {
                this.getAndSetExceptionDays(
                    () => Alert.success('Збережено', {position: 'top', effect: 'stackslide', timeout: 1300})
                );
            })
            .catch(error => {
                console.error(error);
                Alert.error('Помилка збереження', {position: 'top', effect: 'stackslide', timeout: 1000})
            })
    };

    getAndSetExceptionDays(callback) {
        fetch("/bell/exception-days")
            .then(res => res.json())
            .then((exceptionDays) => {
                    let newExceptionDays = exceptionDays.slice();
                    newExceptionDays = newExceptionDays.length > 0 ? newExceptionDays : [this.getNewEmptyException()];
                    this.setState({
                        exceptions: newExceptionDays
                    }, callback);
                }
            );
    }

    getAndSetProfileNames(callback) {
        fetch("/bell/schedule/profile/name")
            .then(res => res.json())
            .then((profileNames) => {
                    let newProfileNames = profileNames.slice();
                    newProfileNames.push('Всі профілі');
                    this.setState({
                        profileNames: newProfileNames
                    }, callback);
                }
            );
    }

    deleteExceptionDaysOnServer(deletedExceptionDaysIds) {
        fetch('/bell/exception-days', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deletedExceptionDaysIds)
        })
            .then(() => {
                this.setState({
                    deletedExceptions: []
                })
            })
            .catch(error => console.error(error))
    }

    getNewEmptyException() {
        return {
            id: uuidv4(),
            profile: 'Всі профілі'
        }
    }

    getNewEditedExceptions(items, id, fieldName, fieldValue, undefinedPredicate) {
        const newExceptions = items.slice();
        const editedException = newExceptions.find(exception => exception.id === id);
        if (undefinedPredicate === true) {
            editedException[fieldName] = undefined;
        } else {
            editedException[fieldName] = fieldValue;
        }

        return newExceptions;
    }
}
