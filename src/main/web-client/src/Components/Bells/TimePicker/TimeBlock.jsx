import React from 'react'
import {withLeadingZero} from "../../../utils";

export default function TimeBlock(props) {
    const {incFun, decFun, timeValue, timeDesc, handleShowSelectTime} = props;
    return (
        <div className="col-5 d-flex justify-content-center mr-2">
            <button className="btn arr-btn h-75 mt-2 mr-1" onClick={incFun}>
                <i className="fas fa-arrow-up"/>
            </button>
            <button className="btn text-center pt-1 pb-1 mr-0 ml-0 pr-0 pl-0 select-btn" onClick={handleShowSelectTime}>
                <div>{withLeadingZero(timeValue)}</div>
                <small>{timeDesc}</small>
            </button>
            <button className="btn arr-btn h-75 mt-2 ml-1" onClick={decFun}>
                <i className="fas fa-arrow-down"/>
            </button>
        </div>
    )
}
