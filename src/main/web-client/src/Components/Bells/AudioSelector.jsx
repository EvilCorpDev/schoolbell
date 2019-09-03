import React from 'react'
import ReactTooltip from 'react-tooltip'

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
                            <ReactTooltip/>
                            <input className="form-control text-center" type="number" id={"startSec" + bellId}
                                   placeholder="Початок" value={startSec} onChange={handleStartSecondChange}
                                   data-tip="Початок з секунди"/>
                        </div>
                        <div className="col-6 pl-1  pr-0">
                            <ReactTooltip/>
                            <input className="form-control text-center" type="number" id={"duration" + bellId}
                                   placeholder="Тривалість" value={duration} onChange={handleDurationChange}
                                   data-tip="Тривалість мелодії"/>
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
                        Виберіть аудіо
                    </label>
                    <input type="file" className="form-control-file d-none" accept=".mp3,.m4a,.wav,.ogg,.aac,.wma"
                           id={"audioSelector" + bellId} onChange={handleSelectAudioFile}/>
                </div>
            </div>
        )
    }
}
