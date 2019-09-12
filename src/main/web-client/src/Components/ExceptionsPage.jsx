import React from 'react'
import uuidv4 from "uuid/v4"
import ExceptionItem from './Exceptions/ExceptionItem/'
import {ALL_PROFILES, EXCEPTION_ITEM_PREFIX} from '../utils'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faSave} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import Alert from 'react-s-alert'
import axios from 'axios'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

export default class ExceptionsPage extends React.Component {

    ALERTS_PARAMS = {
        position: 'top',
        effect: 'stackslide',
        timeout: 2000
    };

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

        axios.post('/bell/exception-days', JSON.stringify(exceptions), {
            headers: {'Content-Type': 'application/json'}
        }).then(() => {
            this.getAndSetExceptionDays(
                () => Alert.success('Збережено', this.ALERTS_PARAMS)
            );
        }).catch(error => {
            const message = error.response.data.shortMessage;
            Alert.error('Помилка збереження виключень:' + message, this.ALERTS_PARAMS)
        });
    };

    getAndSetExceptionDays(callback) {
        axios.get('/bell/exception-days').then(response => {
            const exceptionDays = response.data;
            let newExceptionDays = exceptionDays.slice();
            newExceptionDays = newExceptionDays.length > 0 ? newExceptionDays : [this.getNewEmptyException()];
            this.setState({
                exceptions: newExceptionDays
            }, callback);
        }).catch(error => {
            console.log(error.response);
            Alert.error('Помилка отримання данних від серверу', this.ALERTS_PARAMS);
        });
    }

    getAndSetProfileNames(callback) {
        axios.get('/bell/schedule/profile/name').then(response => {
            const profileNames = response.data;
            let newProfileNames = profileNames.slice();
            newProfileNames.push(ALL_PROFILES);
            this.setState({
                profileNames: newProfileNames
            }, callback);
        }).catch(error => {
            console.log(error);
            Alert.error('Помилка отримання назв профілів', this.ALERTS_PARAMS);
        });
    }

    deleteExceptionDaysOnServer(deletedExceptionDaysIds) {
        axios.delete('/bell/exception-days', {
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(deletedExceptionDaysIds)
        }).then(() => {
            this.setState({
                deletedExceptions: []
            })
        }).catch(error => {
            const message = error.response.data.shortMessage;
            Alert.error('Помилка видалення виключень:' + message, this.ALERTS_PARAMS)
        });
    }

    getNewEmptyException() {
        return {
            id: uuidv4(),
            profile: undefined,
            existing: false
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
