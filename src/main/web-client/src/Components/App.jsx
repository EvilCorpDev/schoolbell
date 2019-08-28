import React from 'react'
import moment from 'moment'
import uuidv4 from 'uuid/v4'
import TabHeader from './Tabs/TabHeader'
import TabLeftColumn from './Tabs/TabLeftColumn'
import TabRightColumn from './Tabs/TabRightColumn'

export default class App extends React.Component {

    static BASE_64_PREFIX = 'base64,';

    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            openProfile: {
                id: '',
                scheduleItems: [],
                active: true
            },
            timerIsOn: true
        };

        this.addNewScheduleItem = this.addNewScheduleItem.bind(this);
        this.handleProfileActiveChange = this.handleProfileActiveChange.bind(this);
        this.handleTimePickerChanged = this.handleTimePickerChanged.bind(this);
        this.setRestartTimer = this.setRestartTimer.bind(this);
        this.getRestartTimer = this.getRestartTimer.bind(this);
        this.getTimerDistance = this.getTimerDistance.bind(this);
        this.removeScheduleItem = this.removeScheduleItem.bind(this);
        this.handleEditProfileName = this.handleEditProfileName.bind(this);
        this.handleChangeOpenedProfile = this.handleChangeOpenedProfile.bind(this);
        this.handleAddProfile = this.handleAddProfile.bind(this);
        this.handleDeleteProfile = this.handleDeleteProfile.bind(this);
        this.handleSaveAllProfiles = this.handleSaveAllProfiles.bind(this);
        this.handleSelectAudioFile = this.handleSelectAudioFile.bind(this);
        this.handleStartSecondChange = this.handleStartSecondChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.updateOpenProfileScheduledItemById = this.updateOpenProfileScheduledItemById.bind(this);
    }

    componentDidMount() {
        this.getServerProfiles();
    }

    render() {
        const {profiles, openProfile} = this.state;
        this.setRestartTimer(openProfile.scheduleItems.size !== 0);

        return (
            <div className="shadow main-container">
                <TabHeader profiles={profiles} openProfileId={this.state.openProfile.id}
                           handleChangeOpenedProfile={this.handleChangeOpenedProfile}
                           handleAddProfile={this.handleAddProfile}/>
                <div className="border p-3">
                    <div className="row">
                        <TabLeftColumn scheduleItems={openProfile.scheduleItems}
                                       removeScheduleItem={this.removeScheduleItem}
                                       handleTimePickerChanged={this.handleTimePickerChanged}
                                       handleSelectAudioFile={this.handleSelectAudioFile}
                                       handleStartSecondChange={this.handleStartSecondChange}
                                       handleDurationChange={this.handleDurationChange}/>
                        <TabRightColumn handleProfileActiveChange={this.handleProfileActiveChange}
                                        setRestartTimer={this.setRestartTimer} getRestartTimer={this.getRestartTimer}
                                        getTimerDistance={this.getTimerDistance} profile={openProfile}
                                        handleEditProfileName={this.handleEditProfileName}
                                        handleDeleteProfile={this.handleDeleteProfile}/>
                    </div>

                    <div className="row mt-4">
                        <div className="col-10 ml-auto mr-5 mb-2">
                            <button className='btn btn-info float-right' onClick={this.handleSaveAllProfiles}>
                                <i className="fas fa-save"/> Save
                            </button>
                            <button className='btn btn-secondary float-right mr-4' onClick={this.addNewScheduleItem}>
                                <i className="fas fa-plus"/> Add bell
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getServerProfiles(openProfileId) {
        fetch("/bell/schedule/profile")
            .then(res => res.json())
            .then((profiles) => {
                    const newProfiles = profiles.length > 0 ? profiles : [this.getNewEmptyProfile()];
                    const openProfilePredicate = openProfileId ?
                        profile => profile.id === openProfileId : profile => profile.active;
                    let openProfile = profiles.find(openProfilePredicate);
                    openProfile = openProfile ? openProfile : newProfiles[0];
                    this.setState({
                        profiles: newProfiles,
                        openProfile: openProfile,
                        timerIsOn: profiles.length > 0
                    })
                }
            );
    }

    addNewScheduleItem = ev => {
        ev.preventDefault();
        const profile = {...this.state.openProfile};
        const items = profile.scheduleItems.slice();
        items.push({time: '', startSec: '', duration: '', id: uuidv4(), existing: false});
        profile.scheduleItems = items;
        this.setState({
            openProfile: profile
        })
    };

    removeScheduleItem(itemId) {
        const profile = {...this.state.openProfile};
        profile.scheduleItems = profile.scheduleItems.slice()
            .filter(item => item.id !== itemId);
        this.setState({
            openProfile: profile
        })
    };

    handleProfileActiveChange(checked) {
        const newProfile = {...this.state.openProfile};
        newProfile.active = checked;
        const newProfiles = this.state.profiles.slice();
        if (checked) {
            newProfiles.forEach(profile => {
                if (profile.active && profile.id !== newProfile.id) {
                    profile.active = false;
                }
            });
        }

        this.setState({
            openProfile: newProfile,
            profiles: newProfiles
        })
    }

    handleTimePickerChanged(timeStr, timePickerId) {
        const profile = {...this.state.openProfile};
        const newScheduledItems = profile.scheduleItems.slice();
        const newItem = newScheduledItems.find(item => item.id === timePickerId);
        newItem.time = timeStr;
        profile.scheduleItems = newScheduledItems;
        this.setState({
            openProfile: profile
        })
    };

    handleEditProfileName(newProfileName) {
        const profile = {...this.state.openProfile};
        const newProfiles = this.state.profiles.slice();
        const currentProfile = newProfiles.find(item => item.id === profile.id);
        currentProfile.name = newProfileName;
        profile.name = newProfileName;

        this.setState({
            profiles: newProfiles,
            openProfile: profile
        })
    }

    handleChangeOpenedProfile = ev => {
        ev.preventDefault();
        const {openProfile, profiles} = this.state;
        const newProfiles = this.getUpToDateProfiles(openProfile, profiles);
        const newOpenProfile = newProfiles.find(profile => profile.id === ev.target.id);

        this.setState({
            openProfile: newOpenProfile,
            profiles: newProfiles
        })
    };

    handleAddProfile = ev => {
        ev.preventDefault();
        const {openProfile, profiles} = this.state;
        let newProfiles = this.getUpToDateProfiles(openProfile, profiles);
        const newEmptyProfile = this.getNewEmptyProfile();
        newProfiles.push(newEmptyProfile);

        this.setState({
            openProfile: newEmptyProfile,
            profiles: newProfiles
        })
    };

    handleDeleteProfile = () => {
        const {openProfile, profiles} = this.state;
        let newProfiles = profiles.slice().filter(profile => profile.id !== openProfile.id);
        let newOpenProfile = profiles.length > 0 ? newProfiles[0] : this.getNewEmptyProfile();
        if (newProfiles.length === 0) {
            newProfiles.push(newOpenProfile);
        }

        this.setState({
            openProfile: newOpenProfile,
            profiles: newProfiles
        })
    };

    handleSaveAllProfiles = ev => {
        ev.preventDefault();
        const {openProfile, profiles} = this.state;
        const newProfiles = this.getUpToDateProfiles(openProfile, profiles);

        fetch('/bell/schedule/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProfiles)
        })
            .then(() => {
                this.getServerProfiles(openProfile.id)
            })
            .catch(error => console.error(error))
    };

    handleStartSecondChange = ev => {
        this.updateOpenProfileScheduledItemById('startSec', ev);
    };

    handleDurationChange = ev => {
        this.updateOpenProfileScheduledItemById('duration', ev);
    };

    updateOpenProfileScheduledItemById(fieldToUpdate, ev) {
        const newOpenProfile = {...this.state.openProfile};
        const itemId = ev.target.id.substr(fieldToUpdate.length);
        let newScheduleItems = newOpenProfile.scheduleItems.slice();
        const changedItem = newScheduleItems.find(item => item.id === itemId);
        changedItem[fieldToUpdate] = ev.target.value;
        newOpenProfile.scheduleItems = newScheduleItems;

        this.setState({
            openProfile: newOpenProfile
        })
    }

    handleSelectAudioFile = ev => {
        const newOpenProfile = {...this.state.openProfile};
        const newScheduleItems = newOpenProfile.scheduleItems.slice();

        const itemId = ev.target.id.substr(13); //starting from 13 because of id look like audioSelector01
        const editedItemIdx = newScheduleItems.findIndex(profile => profile.id === itemId);

        const audioFile = ev.target.files[0];
        newScheduleItems[editedItemIdx].fileExtension = this.getFileExtension(audioFile);
        this.getBase64(audioFile, result => {
            const mimePrefixIndex = result.indexOf(App.BASE_64_PREFIX);
            newScheduleItems[editedItemIdx].audioFile = result.substr(mimePrefixIndex + App.BASE_64_PREFIX.length);
            newOpenProfile.scheduleItems = newScheduleItems;
            this.setState(newOpenProfile);
        });
    };

    getFileExtension(audioFile) {
        const extensionDelimiterIdx = audioFile.name.lastIndexOf('.');
        return audioFile.name.substr(extensionDelimiterIdx + 1);
    }

    getBase64(file, callback) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callback(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error reading file: ', error);
        };
    }

    getTimerDistance() {
        const now = new Date();
        const scheduleItems = this.state.openProfile.scheduleItems.filter(item => item.time !== '');
        const timesLeft = scheduleItems.map(item => {
            let left = moment(item.time, "HH:mm") - 0; //dirty hack to convert moment object to number
            if (left - now < 0) {
                left += 24 * 60 * 60 * 1000;
            }
            return isNaN(left) ? 0 : left;
        });
        return timesLeft.length === 0 ? 0 : Math.min.apply(Math, timesLeft);
    }

    setRestartTimer(restartTimer) {
        this.restartTimer = restartTimer;
    }

    getRestartTimer() {
        return this.restartTimer;
    }

    getNewEmptyProfile() {
        return {
            id: uuidv4(),
            name: 'New',
            active: false,
            existing: false,
            scheduleItems: [{id: uuidv4(), time: '', startSec: '', duration: '', existing: false}]
        };
    }

    getUpToDateProfiles(openProfile, profiles) {
        let newProfiles = profiles.slice();
        const openProfileIndex = newProfiles.findIndex(profile => profile.id === openProfile.id);
        newProfiles[openProfileIndex] = openProfile;
        return newProfiles;
    }

}
