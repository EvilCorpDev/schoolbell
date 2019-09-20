import React from 'react'
import uuidv4 from 'uuid'
import UserEdit from './UserEdit/'
import {PASSWORD, ROLE, USERNAME} from '../utils'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class UsersPage extends React.Component {

    DEFAULT_ROLE = 'moderator';

    constructor(props) {
        super(props);

        this.state = {
            users: []
        };

        this.handleUserFieldChanged = this.handleUserFieldChanged.bind(this);
        this.handleUsernameChanged = this.handleUsernameChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
        this.handleRoleChanged = this.handleRoleChanged.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    componentDidMount() {
        this.setState({
            users: [this.getEmptyUser()]
        })
    }

    render() {
        const {users} = this.state;
        const userRoles = ['admin', 'moderator'];
        const userEdits = users.map(user => {
            return <UserEdit key={user.id} user={user} userRoles={userRoles}
                             handleUsernameChanged={this.handleUsernameChanged}
                             handlePasswordChanged={this.handlePasswordChanged}
                             handleRoleChanged={this.handleRoleChanged}
                             handleDeleteUser={this.handleDeleteUser}/>
        });
        return (
            <div className="users-page bg-light p-3 w-100 rounded">
                <div className="shadow">
                    {userEdits}
                    <div className="row d-flex justify-content-end">
                        <button type="button" className="btn btn-secondary m-3 mr-5" onClick={this.handleAddUser}>
                            <FontAwesomeIcon icon={faPlus}/> Додати користувача
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    handleUsernameChanged = ev => {
        ev.preventDefault();
        const userId = ev.target.id.substr(USERNAME.length);
        this.handleUserFieldChanged(userId, USERNAME, ev.target.value);
    };

    handlePasswordChanged = ev => {
        ev.preventDefault();
        const userId = ev.target.id.substr(PASSWORD.length);
        this.handleUserFieldChanged(userId, PASSWORD, ev.target.value);
    };

    handleRoleChanged = ev => {
        ev.preventDefault();
        const userId = ev.target.id.substr(ROLE.length);
        this.handleUserFieldChanged(userId, ROLE, ev.target.value);
    };

    handleUserFieldChanged(userId, fieldName, fieldValue) {
        const newUsers = this.state.users.slice();
        const changedUser = newUsers.find(user => user.id === userId);
        changedUser[fieldName] = fieldValue;

        this.setState({
            users: newUsers
        })
    };

    handleDeleteUser = ev => {
        ev.preventDefault();
        const newUsers = this.state.users.filter(user => user.id !== ev.currentTarget.id);

        this.setState({
            users: newUsers
        })
    };

    handleAddUser = ev => {
        ev.preventDefault();
        let newUsers = this.state.users.slice();
        newUsers.push(this.getEmptyUser());

        this.setState({
            users: newUsers
        });
    };

    getEmptyUser() {
        return {
            id: uuidv4(),
            username: '',
            password: '',
            role: this.DEFAULT_ROLE,
            existing: false
        };
    }
}
