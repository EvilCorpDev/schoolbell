import React from "react"
import BellHolder from "../Bells/BellHolder/";
import PropTypes from "prop-types"

export default class TabLeftColumn extends React.Component {
    static propTypes = {
        scheduleItems: PropTypes.arrayOf(PropTypes.object),
        handleTimePickerChanged: PropTypes.func,
        handleSelectAudioFile: PropTypes.func
    };

    render() {
        const {removeScheduleItem, handleTimePickerChanged, handleSelectAudioFile} = this.props;
        const showDelBtn = this.props.scheduleItems.length > 1;
        const bells = this.props.scheduleItems.map((item, idx) => {
            return <BellHolder bellDetails={item} key={item.id} removeScheduleItem = {removeScheduleItem}
                               handleTimePickerChanged={handleTimePickerChanged}
                               showDelBtn={showDelBtn} itemNumber={idx + 1}
                               handleSelectAudioFile={handleSelectAudioFile}/>
        });
        return (
            <div className="tab container col-6 ml-5">
                <div>
                    {bells}
                </div>
            </div>
        )
    }
}
