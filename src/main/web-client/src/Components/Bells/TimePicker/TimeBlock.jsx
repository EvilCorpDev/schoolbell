import React from 'react'
import {withLeadingZero} from "../../../utils";

export default function TimeBlock(props) {
    const {incFun, decFun, timeValue, timeDesc, handleShowSelectTime} = props;
    return (
        <div className="col-5 d-flex justify-content-center mr-2 popup">
            <button className="btn arr-btn h-75 mt-2 mr-1 popup" onClick={incFun}>
                <i className="fas fa-arrow-up popup"/>
            </button>
            <button className="btn text-center pt-1 pb-1 mr-0 ml-0 pr-0 pl-0 select-btn popup" onClick={handleShowSelectTime}>
                <div className="popup">{withLeadingZero(timeValue)}</div>
                <small className="popup">{timeDesc}</small>
            </button>
            <button className="btn arr-btn h-75 mt-2 ml-1 popup" onClick={decFun}>
                <i className="fas fa-arrow-down popup"/>
            </button>
        </div>
    )
}
