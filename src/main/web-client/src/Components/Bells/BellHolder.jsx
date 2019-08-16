import React from 'react'
import PropTypes from 'prop-types'
import TimePicker from './TimePicker/'
import AudioSelector from './AudioSelector'

export default class BellHolder extends React.Component {
    static propTypes = {
        bellDetails: PropTypes.shape({
            id: PropTypes.string.isRequired,
            time: PropTypes.string
        })
    };

    render() {
        const {bellDetails} = this.props;
        return (
            <div className="container mt-3">
                <TimePicker timePickerId={bellDetails.id} time={bellDetails.time}
                       handleTimePickerChanged={this.props.handleTimePickerChanged}/>
                <AudioSelector startSec={bellDetails.startSec} duration={bellDetails.duration}/>
                <hr className="mt-2"/>
            </div>
        )
    }
}
