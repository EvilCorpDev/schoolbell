import React from 'react'
import uuidv4 from "uuid/v4"
import ExceptionItem from './Exceptions/ExceptionItem/'
import {EXCEPTION_ITEM_PREFIX} from '../utils'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSave} from "@fortawesome/free-solid-svg-icons";

export default class ExceptionsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            exceptions: [],
            profileNames: [],
            deletedExceptions: []
        };

        this.handleRemoveExceptionItem = this.handleRemoveExceptionItem.bind(this);
    }

    componentDidMount() {
        this.setState({
            exceptions: [
                {id: uuidv4(), specificDay: '21-09-2019', profile: 'Всі профілі'},
                {id: uuidv4(), profile: 'Всі профілі', dayOfWeek: 3}
            ]
        }, this.getAndSetProfileNames)
    }

    render() {
        const {exceptions} = this.state;
        const displayDelBtnClass = exceptions.length > 1 ? '' : 'd-none';
        const exceptionItems = exceptions.map(exception => {
            return (
                <ExceptionItem {...exception} key={exception.id}
                               profileNames={this.state.profileNames}
                               displayDelBtnClass={displayDelBtnClass}
                               handleRemoveExceptionItem={this.handleRemoveExceptionItem}/>
            );
        });
        return (
            <div className="exceptionsPage">
                <div className="exception-items">
                    {exceptionItems}
                </div>
                <div className="row mt-4 mb-4 d-flex flex-row-reverse">
                    <div className="mr-1">
                        <button className='btn btn-secondary mr-3 rounded-circle'
                                onClick={this.handleAddNewExceptionItem}>
                            <FontAwesomeIcon icon={faPlus} size="2x"/>
                        </button>
                        <button className='btn btn-info rounded-circle'
                                onClick={this.handleSaveAllExceptions}>
                            <FontAwesomeIcon icon={faSave} size="2x"/>
                        </button>
                    </div>
                </div>
            </div>
        )
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
        //make here server call for save and delete
    };

    getAndSetProfileNames() {
        fetch("/bell/schedule/profile/name")
            .then(res => res.json())
            .then((profileNames) => {
                    let newProfileNames = profileNames.slice();
                    newProfileNames.push('Всі профілі');
                    this.setState({
                        profileNames: newProfileNames
                    });
                }
            );
    }

    getNewEmptyException() {
        return {
            id: uuidv4(),
            profile: 'Всі профілі'
        }
    }
}
