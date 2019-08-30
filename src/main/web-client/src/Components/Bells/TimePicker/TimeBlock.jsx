import React from 'react'
import {withLeadingZero} from "../../../utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";

export default function TimeBlock(props) {
    const {incFun, decFun, timeValue, timeDesc, handleShowSelectTime} = props;
    return (
        <div className="col-5 d-flex justify-content-center mr-2 popup">
            <button className="btn arr-btn h-75 mt-2 mr-1 popup" onClick={incFun}>
                <FontAwesomeIcon icon={faArrowUp} className="popup"/>
            </button>
            <button className="btn text-center pt-1 pb-1 mr-0 ml-0 pr-0 pl-0 select-btn popup" onClick={handleShowSelectTime}>
                <div className="popup">{withLeadingZero(timeValue)}</div>
                <small className="popup">{timeDesc}</small>
            </button>
            <button className="btn arr-btn h-75 mt-2 ml-1 popup" onClick={decFun}>
                <FontAwesomeIcon icon={faArrowDown} className="popup"/>
            </button>
        </div>
    )
}
