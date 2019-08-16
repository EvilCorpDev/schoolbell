import React from "react"
import BellHolder from "../Bells/BellHolder";
import PropTypes from "prop-types"

export default class Tab extends React.Component {
    static propTypes = {
        scheduleItems: PropTypes.arrayOf(PropTypes.object),
        handleTimePickerChanged: PropTypes.func
    };

    render() {
        const bells = this.props.scheduleItems.map((item, idx) => {
            return <BellHolder bellDetails={item} key={idx}
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
