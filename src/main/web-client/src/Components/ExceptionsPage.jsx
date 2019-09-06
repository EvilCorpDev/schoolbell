import React from 'react'
import uuidv4 from "uuid/v4"
import ExceptionItem from './Exceptions/ExceptionItem/'

export default class ExceptionsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            exceptions: []
        }
    }

    componentDidMount() {
        this.setState({
            exceptions: [{id: uuidv4(), specificDay: '21-09-2019', profile: 'ALL', repeatable: 'false'}]
        })
    }

    render() {
        const exceptions = this.state.exceptions.map(exception => {
            return (
                <ExceptionItem {...exception} key={exception.id} />
            );
        });
        return (
            <div className="exceptionsPage">
                {exceptions}
                {exceptions}
            </div>
        )
    }
}
