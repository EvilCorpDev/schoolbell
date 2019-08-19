import React from "react"
import BellHolder from "../Bells/BellHolder/";
import PropTypes from "prop-types"

export default class TabLeftColumn extends React.Component {
    static propTypes = {
        scheduleItems: PropTypes.arrayOf(PropTypes.object),
        handleTimePickerChanged: PropTypes.func
    };

    render() {
        const bells = this.props.scheduleItems.map(item => {
            return <BellHolder bellDetails={item} key={item.id} removeScheduleItem = {this.props.removeScheduleItem}
                               handleTimePickerChanged={this.props.handleTimePickerChanged}/>
        });
        return (
            <div className="tab container col-6 ml-5">
                <form>
                    {bells}
                </form>
            </div>
        )
    }
}
