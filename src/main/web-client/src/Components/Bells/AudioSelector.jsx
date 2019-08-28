import React from 'react'

export default class AudioSelector extends React.Component {

    render() {
        const {
            bellId, startSec, duration, handleSelectAudioFile,
            handleDurationChange, handleStartSecondChange
        } = this.props;
        return (
            <div className="row">
                <div className="col-7">
                    <div className="row">
                        <div className="col-6 pr-1">
                            <input className="form-control text-center" type="number" id={"startSec" + bellId}
                                   placeholder="From sec" value={startSec} onChange={handleStartSecondChange}/>
                        </div>
                        <div className="col-6 pl-1  pr-0">
                            <input className="form-control text-center" type="number" id={"duration" + bellId}
                                   placeholder="Duration" value={duration} onChange={handleDurationChange}/>
                        </div>
                    </div>
                </div>
                {AudioSelector.createSelectAudioBtn(handleSelectAudioFile, bellId)}
            </div>
        )
    }

    static createSelectAudioBtn(handleSelectAudioFile, bellId) {
        return (
            <div className="col-5">
                <div className="form-group">
                    <label htmlFor={"audioSelector" + bellId}
                           className="btn btn-outline-secondary w-100">
                        Select audio file
                    </label>
                    <input type="file" className="form-control-file d-none" accept=".mp3,.m4a,.wav,.ogg,.aac,.wma"
                           id={"audioSelector" + bellId} onChange={handleSelectAudioFile}/>
                </div>
            </div>
        )
    }
}
