import React from 'react'
import {ALERTS_PARAMS} from '../../../utils'
import axios from 'axios'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css'
import './style.css'

export default class LoginPopup extends React.Component {

    state = {
        username: '',
        password: ''
    };

    render() {
        const {popupId} = this.props;
        return (
            <div className="modal fade" id={popupId} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <form onSubmit={this.handleLogin}>
                            <div className="modal-body form-group">
                                <h5 className="modal-title text-center mb-2 mt-2">Увійти на сайт</h5>
                                <div className="row justify-content-center">
                                    <div className="col-6 mt-2 mb-2">
                                        <input type="text" className="form-control" value={this.state.username}
                                               autoComplete="off" placeholder="Введіть ім'я користувача" tabIndex="1"
                                               onChange={this.handleLoginChanged}/>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-6 mt-2">
                                        <input type="password" className="form-control" value={this.state.password}
                                               autoComplete="off" placeholder="Введіть пароль" tabIndex="2"
                                               onChange={this.handlePasswordChanged}/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button className="btn btn-primary">Вхід в систему</button>
                                <button type="button" className="btn d-none" data-dismiss="modal"
                                        ref={btn => this.dismissBtn = btn}/>
                            </div>
                        </form>
                    </div>
                </div>
                <Alert stack={{limit: 3}}/>
            </div>
        );
    }

    handleLogin = ev => {
        ev.preventDefault();
        axios.post('/api/auth', JSON.stringify(this.state), {
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            this.dismissBtn.click();
            sessionStorage.setItem('jwtToken', response.data.token);
            const {handleCallback} = this.props;
            if (handleCallback) {
                handleCallback();
            }
        }).catch(error => {
            console.log(error.response);
            const message = error.response.data.message;
            Alert.error("Сталася помилка:" + message, ALERTS_PARAMS);
        });
    };

    handleLoginChanged = ev => {
        ev.preventDefault();
        this.setState({
            username: ev.target.value
        })
    };

    handlePasswordChanged = ev => {
        ev.preventDefault();
        this.setState({
            password: ev.target.value
        })
    };
}
