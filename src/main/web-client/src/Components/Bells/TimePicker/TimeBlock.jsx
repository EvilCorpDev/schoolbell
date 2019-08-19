import React from 'react'
import {withLeadingZero} from "../../../utils";

export default function TimeBlock(props) {
    const {incFun, decFun, timeValue, timeDesc} = props;
    return (
        <div className="col-5 d-flex justify-content-center mr-2">
            <button className="btn arr-btn h-75 mt-2 mr-1" onClick={incFun}>
                <i className="fas fa-arrow-up"/>
            </button>
            <div className="text-center pt-1 pb-1">
                <div>{withLeadingZero(timeValue)}</div>
                <small>{timeDesc}</small>
            </div>
            <button className="btn arr-btn h-75 mt-2 ml-1" onClick={decFun}>
                <i className="fas fa-arrow-down"/>
            </button>
        </div>
    )
}
