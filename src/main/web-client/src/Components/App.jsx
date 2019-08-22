import React from 'react'
import moment from 'moment'
import uuidv4 from 'uuid/v4'
import TabHeader from './Tabs/TabHeader'
import TabLeftColumn from './Tabs/TabLeftColumn'
import TabRightColumn from './Tabs/TabRightColumn'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            openProfile: {
                id: '',
                scheduleItems: [],
                isActive: true
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
    }

    componentDidMount() {
        this.setState({
            profiles: [
                {
                    id: 'defaultid',
                    name: 'Default',
                    isActive: true,
                    scheduleItems: [{id: 'someid', time: '08:30', startSec: '0', duration: '60'}]
                },
                {
                    id: 'excid',
                    name: 'Exc 1',
                    isActive: false,
                    scheduleItems: [{id: 'anotherid', time: '9:30', startSec: '10', duration: '30'}]
                }],
            openProfile: {
                id: 'defaultid',
                name: 'Default',
                scheduleItems: [{id: 'someid', time: '08:30', startSec: '0', duration: '60'}],
                isActive: true
            },
            timerIsOn: true
        })
    }

    render() {
        const {profiles, openProfile} = this.state;
        this.setRestartTimer(openProfile.scheduleItems.size !== 0);

        return (
            <div className="shadow main-container">
                <TabHeader profiles={profiles} openProfileId={this.state.openProfile.id}
                           handleChangeOpenedProfile={this.handleChangeOpenedProfile}/>
                <div className="border p-3">
                    <div className="row">
                        <TabLeftColumn scheduleItems={openProfile.scheduleItems}
                                       removeScheduleItem={this.removeScheduleItem}
                                       handleTimePickerChanged={this.handleTimePickerChanged}/>
                        <TabRightColumn handleProfileActiveChange={this.handleProfileActiveChange}
                                        setRestartTimer={this.setRestartTimer} getRestartTimer={this.getRestartTimer}
                                        getTimerDistance={this.getTimerDistance} profile={openProfile}
                                        handleEditProfileName={this.handleEditProfileName}/>
                    </div>

                    <div className="row mt-4">
                        <div className="col-10 ml-auto mr-5 mb-2">
                            <button className='btn btn-info float-right'>
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

    addNewScheduleItem = ev => {
        ev.preventDefault();
        const profile = {...this.state.openProfile};
        const items = profile.scheduleItems.slice();
        items.push({time: '', startSec: '', duration: '', id: uuidv4()});
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
        newProfile.isActive = checked;
        const newProfiles = this.state.profiles.slice();
        if (checked) {
            newProfiles.forEach(profile => {
                if (profile.isActive && profile.id !== newProfile.id) {
                    profile.isActive = false;
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
        const item = newScheduledItems.find(item => item.id === timePickerId);
        item.time = timeStr;
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
        let newProfiles = profiles.slice();
        const openProfileIndex = newProfiles.findIndex(profile => profile.id === openProfile.id);
        newProfiles[openProfileIndex] = openProfile;
        const newOpenProfile = newProfiles.find(profile => profile.id === ev.target.id);

        this.setState({
            openProfile: newOpenProfile,
            profiles: newProfiles
        })
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

}
