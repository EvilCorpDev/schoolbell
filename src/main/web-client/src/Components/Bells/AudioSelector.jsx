import React from 'react'

export default class AudioSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startSec: this.props.startSec,
            duration: this.props.duration
        };

        this.handleFromSecChange = this.handleFromSecChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
    }

    render() {
        return (
            <div className="row">
                <div className="col-7">
                    <div className="row">
                        <div className="col-6 pr-1">
                            <input className="form-control text-center" type="number"
                                   placeholder="From sec" value={this.state.startSec}
                                   onChange={this.handleFromSecChange}/>
                        </div>
                        <div className="col-6 pl-1  pr-0">
                            <input className="form-control text-center" type="number"
                                   placeholder="Duration" value={this.state.duration}
                                   onChange={this.handleDurationChange}/>
                        </div>
                    </div>
                </div>
                {AudioSelector.createSelectAudioBtn()}
            </div>
        )
    }

    handleFromSecChange = ev => {
        this.setState({
            startSec: ev.target.value
        })
    };

    handleDurationChange = ev => {
        this.setState({
            duration: ev.target.value
        })
    };

    static createSelectAudioBtn() {
        return (
            <div className="col-5">
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile6"
                           className="btn btn-outline-secondary w-100">
                        Select audio file
                    </label>
                    <input type="file" className="form-control-file d-none"
                           id="exampleFormControlFile6"/>
                </div>
            </div>
        )
    }
}
