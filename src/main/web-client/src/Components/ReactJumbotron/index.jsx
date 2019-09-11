import React from 'react'
import PlayNowPopup from '../popups/PlayNowPopup'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import './style.css'

export default function ReactJumbotron({header, description}) {
    return (
        <div className="jumbotron jumbotron-fluid mb-0">
            <div className="container">
                <h1>{header}</h1>
                <p>{description}</p>
            </div>
            <div className="row">
                <div className="col-12">
                    <PlayNowPopup popupId="playNowPopup"/>
                    <button className="btn btn-outline-secondary ring-btn" data-toggle="modal"
                            data-target="#playNowPopup">
                        <FontAwesomeIcon icon={faBell}/> Подзвонити зараз
                    </button>
                </div>
            </div>
        </div>
    )
}
