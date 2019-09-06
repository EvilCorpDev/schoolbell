import React from 'react'
import uuidv4 from "uuid/v4"
import ExceptionItem from './Exceptions/ExceptionItem/'
import {EXCEPTION_ITEM_PREFIX} from '../utils'

export default class ExceptionsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            exceptions: [],
            profileNames: [],
            deletedExceptions: []
        };

        this.handleExceptionItem = this.handleExceptionItem.bind(this);
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
                               handleExceptionItem={this.handleExceptionItem}/>
            );
        });
        return (
            <div className="exceptionsPage">
                {exceptionItems}
            </div>
        )
    }

    handleExceptionItem = ev => {
        const exceptionItemId = ev.currentTarget.id.substr(EXCEPTION_ITEM_PREFIX.length);
        const newExceptions = this.state.exceptions.slice().filter(exception => exception.id !== exceptionItemId);
        let newDeletedExceptions = this.state.deletedExceptions.slice();
        newDeletedExceptions.push(exceptionItemId);

        this.setState({
            exceptions: newExceptions,
            deletedExceptions: newDeletedExceptions
        })
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
}
