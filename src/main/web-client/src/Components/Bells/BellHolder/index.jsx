import React from 'react'
import PropTypes from 'prop-types'
import TimePicker from '../TimePicker'
import AudioSelector from '../AudioSelector'
import './style.css'

export default class BellHolder extends React.Component {
    static propTypes = {
        bellDetails: PropTypes.shape({
            id: PropTypes.string.isRequired,
            time: PropTypes.string
        })
    };

    constructor(props) {
        super(props);

        this.removeScheduleItem = this.props.removeScheduleItem;
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
    }

    render() {
        const {bellDetails, showDelBtn, itemNumber, handleSelectAudioFile} = this.props;
        const displayDelBtnClass = showDelBtn ? 'd-block' : 'd-none';
        return (
            <div className="container mt-3">
                <div className="bell-number">
                    <h3>
                        <small>{itemNumber}</small>
                    </h3>
                </div>
                <button type="button" className={displayDelBtnClass + " del-btn"} onClick={this.handleRemoveItem}>
                    <h3><i className="far fa-times-circle"/></h3>
                </button>
                <TimePicker timePickerId={bellDetails.id} time={bellDetails.time}
                            handleTimePickerChanged={this.props.handleTimePickerChanged}/>
                <AudioSelector startSec={bellDetails.startSec} duration={bellDetails.duration} bellId={bellDetails.id}
                               handleSelectAudioFile={handleSelectAudioFile}/>
                <hr className="mt-2"/>
            </div>
        )
    }

    handleRemoveItem = ev => {
        ev.preventDefault();
        this.removeScheduleItem(this.props.bellDetails.id)
    }
}
