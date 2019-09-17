import React from 'react'
import {ALERTS_PARAMS} from '../../../utils'
import axios from 'axios'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css'
import './style.css'

export default class LoginPopup extends React.Component {

    state = {
        login: '',
        password: ''
    };

    render() {
        const {popupId} = this.props;
        return (
            <div className="modal fade" id={popupId} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h5 className="modal-title text-center mb-2 mt-2">Увійти на сайт</h5>
                            <div className="row justify-content-center">
                                <div className="col-6 mt-2 mb-2">
                                    <input type="text" className="form-control" value={this.state.login}
                                           autoComplete="off" placeholder="Введіть ім'я користувача"
                                           onChange={this.handleLoginChanged}/>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-6 mt-2 mb-4">
                                    <input type="password" className="form-control" value={this.state.password}
                                           autoComplete="off" placeholder="Введіть пароль"
                                           onChange={this.handlePasswordChanged}/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-primary" onClick={this.handleLogin}>
                                Вхід в систему
                            </button>
                            <button type="button" className="btn d-none" data-dismiss="modal"
                                    ref={btn => this.dismissBtn = btn} />
                        </div>
                    </div>
                </div>
                <Alert stack={{limit: 3}}/>
            </div>
        );
    }

    handleLogin = ev => {
        ev.preventDefault();
        axios.post('/login', JSON.stringify(this.state), {
            headers: {'Content-Type': 'application/json'}
        }).then(() => {
            this.dismissBtn.click();
        }).catch(error => {
            const message = error.response.data.message;
            Alert.error("Сталася помилка:" + message, ALERTS_PARAMS);
        });
    };

    handleLoginChanged = ev => {
        ev.preventDefault();
        this.setState({
            login: ev.target.value
        })
    };

    handlePasswordChanged = ev => {
        ev.preventDefault();
        this.setState({
            password: ev.target.value
        })
    };
}
