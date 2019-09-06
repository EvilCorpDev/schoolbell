import React from 'react'
import TabHeader from "./Tabs/TabHeader";
import TabLeftColumn from "./Tabs/TabLeftColumn";
import TabRightColumn from "./Tabs/TabRightColumn";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSave} from "@fortawesome/free-solid-svg-icons";
import uuidv4 from "uuid/v4";
import moment from "moment";
import {BASE_64_PREFIX, getBase64} from '../utils'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

export default class SchedulePage extends React.Component {
    static MIN_WIDTH_EXTENDED_SAVE = 1500;

    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            openProfile: {
                id: '',
                scheduleItems: [],
                active: true
            },
            timerIsOn: true,
            deletedProfileIds: [],
            deletedScheduledItemsIds: [],
            saveHover: false,
            width: 0,
            height: 0
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    render() {
        const {profiles, openProfile, saveHover} = this.state;
        this.setRestartTimer(openProfile.scheduleItems.size !== 0);
        const saveClass = !saveHover ? "rounded-circle" : "";
        return (
            <div className="schedulePage bg-light p-3 w-100 rounded">
                <div className="shadow">
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
                                            setRestartTimer={this.setRestartTimer}
                                            getRestartTimer={this.getRestartTimer}
                                            getTimerDistance={this.getTimerDistance} profile={openProfile}
                                            handleEditProfileName={this.handleEditProfileName}
                                            handleDeleteProfile={this.handleDeleteProfile}/>
                        </div>

                        <div className="row mt-4">
                            <div className="col-10 ml-auto mr-5 mb-2">
                                <button className='btn btn-secondary float-right mr-4'
                                        onClick={this.addNewScheduleItem}>
                                    <FontAwesomeIcon icon={faPlus}/> Додати дзвінок
                                </button>
                            </div>
                        </div>
                        <button className={saveClass + ' btn btn-info float-right save-btn'}
                                onClick={this.handleSaveAllProfiles} onMouseEnter={this.handleSaveMouseEnter}
                                onMouseLeave={this.handleSaveMouseLeave}>
                            <FontAwesomeIcon icon={faSave} size="2x"/> {saveClass === "" ? "Зберегти" : ""}
                        </button>
                    </div>
                    <Alert stack={{limit: 3}}/>
                </div>
            </div>
        )
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    getServerProfiles(openProfileId, callback) {
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
                    }, callback);
                }
            );
    }

    deleteProfiles(deletedProfilesIds, cb) {
        fetch('/bell/schedule/profile', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deletedProfilesIds)
        })
            .then(() => {
                this.setState({
                    deletedProfilesIds: []
                }, cb)
            })
            .catch(error => console.error(error))
    }

    deleteScheduleItems(deletedScheduleItemsIds, cb) {
        fetch('/bell/schedule/profile/bells', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deletedScheduleItemsIds)
        })
            .then(() => {
                this.setState({
                    deletedScheduledItemsIds: []
                }, cb)
            })
            .catch(error => console.error(error))
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
        const {deletedScheduledItemsIds} = this.state;
        let newDeletedScheduledItemsIds = deletedScheduledItemsIds.slice();
        newDeletedScheduledItemsIds.push(itemId);
        const profile = {...this.state.openProfile};
        profile.scheduleItems = profile.scheduleItems.slice()
            .filter(item => item.id !== itemId);
        this.setState({
            openProfile: profile,
            deletedScheduledItemsIds: newDeletedScheduledItemsIds
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
        const {openProfile, profiles, deletedProfileIds} = this.state;
        let newDeletedProfileIds = deletedProfileIds.slice();
        newDeletedProfileIds.push(openProfile.id);
        let newProfiles = profiles.slice().filter(profile => profile.id !== openProfile.id);
        let newOpenProfile = newProfiles.length > 0 ? newProfiles[0] : this.getNewEmptyProfile();
        if (newProfiles.length === 0) {
            newProfiles.push(newOpenProfile);
        }

        this.setState({
            openProfile: newOpenProfile,
            profiles: newProfiles,
            deletedProfileIds: newDeletedProfileIds
        })
    };

    handleSaveAllProfiles = ev => {
        ev.preventDefault();
        const {openProfile, profiles, deletedProfileIds, deletedScheduledItemsIds} = this.state;
        const newProfiles = this.getUpToDateProfiles(openProfile, profiles);
        if (deletedProfileIds.length > 0) {
            this.deleteProfiles(deletedProfileIds);
        }
        if (deletedScheduledItemsIds.length > 0) {
            this.deleteScheduleItems(deletedScheduledItemsIds);
        }

        fetch('/bell/schedule/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProfiles)
        })
            .then(() => {
                this.getServerProfiles(openProfile.id,
                    () => Alert.success('Збережено', {position: 'top', effect: 'stackslide', timeout: 1300}));
            })
            .catch(error => {
                console.error(error);
                Alert.error('Помилка збереження', {position: 'top', effect: 'stackslide', timeout: 1000})
            })
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

    handleSaveMouseEnter = ev => {
        ev.preventDefault();
        if (this.state.width >= SchedulePage.MIN_WIDTH_EXTENDED_SAVE) {
            this.setState({
                saveHover: true
            })
        }
    };

    handleSaveMouseLeave = ev => {
        ev.preventDefault();
        if (this.state.width >= SchedulePage.MIN_WIDTH_EXTENDED_SAVE) {
            this.setState({
                saveHover: false
            })
        }
    };

    handleSelectAudioFile = ev => {
        const newOpenProfile = {...this.state.openProfile};
        const newScheduleItems = newOpenProfile.scheduleItems.slice();

        const itemId = ev.target.id.substr(13); //starting from 13 because of id look like audioSelector01
        const editedItemIdx = newScheduleItems.findIndex(profile => profile.id === itemId);

        const audioFile = ev.target.files[0];
        newScheduleItems[editedItemIdx].fileName = audioFile.name;
        getBase64(audioFile, result => {
            const mimePrefixIndex = result.indexOf(BASE_64_PREFIX);
            newScheduleItems[editedItemIdx].audioFile = result.substr(mimePrefixIndex + BASE_64_PREFIX.length);
            newOpenProfile.scheduleItems = newScheduleItems;
            this.setState(newOpenProfile);
        });
    };

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
            name: 'Новий',
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
