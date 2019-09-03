import React from 'react'
import PlayNowPopup from '../popups/PlayNowPopup'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import './style.css'

export default class ReactJumbotron extends React.Component {

    render() {
        return (
            <div className="jumbotron jumbotron-fluid mb-0">
                <div className="container">
                    <h1>Розклад дзвінків</h1>
                    <p>Тут можна налаштувати розклад дзвінків, вибрати аудіо файл і встановити його тривалість</p>
                </div>
                <div className="row">
                    <div className="col-12">
                        <PlayNowPopup popupId="playNowPopup"/>
                        <button className="btn btn-outline-secondary ring-btn" data-toggle="modal"
                                data-target="#playNowPopup">
                            <FontAwesomeIcon icon={faBell} /> Подзвонити зараз
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
