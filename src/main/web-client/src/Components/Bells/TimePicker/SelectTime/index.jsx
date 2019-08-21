import React from 'react'
import {withLeadingZero} from '../../../../utils'
import './style.css'

export default class SelectTime extends React.Component {

    render() {
        const {selectPopup, handleSelectTime} = this.props;
        const itemsToDisplay = selectPopup.timeBlocks.map((item, idx) => {
            return (
                <button className="btn col-3 text-center timeBlock popup" key={idx}
                        id={selectPopup.timeUnits + withLeadingZero(item)} onClick={handleSelectTime}>
                    {withLeadingZero(item)}
                </button>
            );
        });

        return (
            <div className="row popup" id={selectPopup.timeUnits}>
                {itemsToDisplay}
            </div>
        );
    }
}
