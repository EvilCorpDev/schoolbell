import React from 'react'
import uuidv4 from 'uuid'
import UserEdit from './UserEdit/'
import {ALERTS_PARAMS, PASSWORD, ROLE, USERNAME} from '../utils'
import {faPlus, faSave} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css'
import Alert from 'react-s-alert'
import LoginPopup from './popups/LoginPopup'

export default class UsersPage extends React.Component {

    DEFAULT_ROLE = 'MODERATOR';

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            roles: [],
            deletedUsers: []
        };

        this.handleUserFieldChanged = this.handleUserFieldChanged.bind(this);
        this.handleUsernameChanged = this.handleUsernameChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
        this.handleRoleChanged = this.handleRoleChanged.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.handleUnauthorizedAction = this.handleUnauthorizedAction.bind(this);
    }

    componentDidMount() {
        this.getAndSetRoles(() => this.getAndSetUsers());
    }

    render() {
        const {users, roles} = this.state;
        const userEdits = users.map(user => {
            return <UserEdit key={user.id} user={user} userRoles={roles}
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
                        <button type="button" className="btn btn-secondary mb-3 mt-3" onClick={this.handleAddUser}>
                            <FontAwesomeIcon icon={faPlus}/> Додати користувача
                        </button>
                        <button type="button" className="btn btn-info m-3 mr-5" onClick={this.handleSaveUsers}>
                            <FontAwesomeIcon icon={faSave}/> Зберегти
                        </button>
                    </div>
                </div>
                <LoginPopup popupId="loginPopup" handleCallback={this.handleUnauthorizedAction}/>
                <button className="btn d-none" data-toggle="modal" data-target="#loginPopup"
                        ref={btn => this.loginBtn = btn}/>
                <Alert stack={{limit: 3}}/>
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
        let newDeletedUsers = this.state.deletedUsers.slice();
        newDeletedUsers.push(ev.currentTarget.id);

        this.setState({
            users: newUsers,
            deletedUsers: newDeletedUsers
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

    handleSaveUsers = ev => {
        ev.preventDefault();
        const {deletedUsers, users} = this.state;
        if (deletedUsers.length > 0) {
            this.deleteUsers(deletedUsers);
        }
        this.saveUsers(users, () => this.getAndSetUsers());
    };

    handleUnauthorizedAction() {
        const {unauthorizedAction} = this.state;
        if (unauthorizedAction) {
            unauthorizedAction();
        }
        this.setState({
            unauthorizedAction: undefined
        })
    }

    getAndSetUsers(callback) {
        axios.get('/api/user', {
            headers: {'Authorization': "Bearer " + sessionStorage.getItem('jwtToken')}
        }).then(response => {
            debugger
            let users = response.data;
            users = users.length > 0 ? users : [this.getEmptyUser()];
            this.setState({
                users: users
            }, callback)
        }).catch(error => {
            this.showLoginPopup(error, 'Помилка отримання данних від серверу', () => this.getAndSetUsers(callback));
            console.log(error.response);
        });
    }

    getAndSetRoles(callback) {
        axios.get('/api/user/role', {
            headers: {'Authorization': "Bearer " + sessionStorage.getItem('jwtToken')}
        }).then(response => {
            this.setState({
                roles: response.data
            }, callback)
        }).catch(error => {
            this.showLoginPopup(error, 'Помилка отримання данних від серверу', () => this.getAndSetRoles(callback));
            console.log(error.response);
        });
    }

    deleteUsers(deletedUsers, callback) {
        axios.delete('/api/user', {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': "Bearer " + sessionStorage.getItem('jwtToken')
            },
            data: JSON.stringify(deletedUsers)
        }).then(() => {
            this.setState({
                deletedProfileIds: []
            }, callback)
        }).catch(error => {
            const message = error.response.data.shortMessage;
            this.showLoginPopup(error, 'Помилка видалення користувачів: ' + message,
                () => this.deleteProfiles(deletedUsers, callback));
        });
    }

    saveUsers(users, callback) {
        axios.post('/api/user', JSON.stringify(users), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': "Bearer " + sessionStorage.getItem('jwtToken')
            }
        }).then(() => {
            this.getAndSetUsers(() => Alert.success('Збережено', ALERTS_PARAMS));
        }).catch(error => {
            const message = error.response.data.shortMessage;
            this.showLoginPopup(error, 'Помилка збереження: ' + message, () => this.saveUsers(users, callback));
        });
    }

    showLoginPopup(error, errorMsg, unauthorizedAction) {
        if (error.response.status === 401) {
            Alert.error('Авторизуйтеся для доступу до ресурсу', ALERTS_PARAMS);
            this.loginBtn.click();
            this.setState({unauthorizedAction: unauthorizedAction});
        } else {
            Alert.error(errorMsg, ALERTS_PARAMS);
        }
    }

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
