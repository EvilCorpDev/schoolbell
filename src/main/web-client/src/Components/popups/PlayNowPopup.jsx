import React from 'react'
import AudioSelector from '../Bells/AudioSelector'
import {ALERTS_PARAMS, BASE_64_PREFIX, getBase64} from '../../utils'
import axios from 'axios'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

export default class PlayNowPopup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            startSec: '',
            duration: '',
            audioFile: undefined
        };

        this.handleSelectAudioFile = this.handleSelectAudioFile.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleStartSecondChange = this.handleStartSecondChange.bind(this);
    }

    render() {
        const {popupId} = this.props;
        const {startSec, duration} = this.state;
        return (
            <div className="modal fade" id={popupId} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Виберіть мелодію для дзвінка</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="mt-3 mb-0">
                                <AudioSelector bellId="bellIdNow" startSec={startSec} duration={duration}
                                               handleSelectAudioFile={this.handleSelectAudioFile}
                                               handleDurationChange={this.handleDurationChange}
                                               handleStartSecondChange={this.handleStartSecondChange}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                                    onClick={this.handleChosenBellPopup}> Обраний дзвінок
                            </button>
                            <button type="button" className="btn btn-info" data-dismiss="modal"
                                    onClick={this.handleDefaultBellPopup}> Стандартний дзвінок
                            </button>
                        </div>
                    </div>
                </div>
                <Alert stack={{limit: 3}}/>
            </div>
        );
    }

    handleSelectAudioFile = ev => {
        let audioFile = ev.target.files[0];
        getBase64(audioFile, result => {
            const mimePrefixIndex = result.indexOf(BASE_64_PREFIX);
            audioFile = result.substr(mimePrefixIndex + BASE_64_PREFIX.length);
            this.setState({
                audioFile: audioFile
            });
        });
    };

    handleDurationChange = ev => {
        ev.preventDefault();
        this.setState({
            duration: ev.target.value
        })
    };

    handleStartSecondChange = ev => {
        ev.preventDefault();
        this.setState({
            startSec: ev.target.value
        })
    };

    handleChosenBellPopup = ev => {
        axios.post('/api/play', JSON.stringify(this.state), {
            headers: {'Content-Type': 'application/json',}
        }).catch(error => {
            const message = error.response.data.message;
            Alert.error("Сталася помилка:" + message, ALERTS_PARAMS);
        });
    };

    handleDefaultBellPopup = ev => {
        axios.post('/api/play/default').catch(error => {
            const message = error.response.data.message;
            Alert.error("Сталася помилка:" + message, ALERTS_PARAMS);
        });
    }
}
