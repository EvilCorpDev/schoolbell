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
            profile: {
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
    }

    componentDidMount() {
        //const timerIsOn = profile.scheduleItems.size !== 0;
        this.setState({
            profiles: [{id: 'defaultid', name: 'Default', active: true}, {id: 'excid', name: 'Exc 1', active: false}],
            profile: {
                id: 'defaultid',
                name: 'Default',
                scheduleItems: [{id: 'someid', time: '', startSec: '1', duration: ''}],
                isActive: true
            },
            timerIsOn: true
        })
    }

    render() {
        const {profiles, profile} = this.state;
        this.setRestartTimer(profile.scheduleItems.size !== 0);

        return (
            <div className="shadow main-container">
                <TabHeader profiles={profiles}/>
                <div className="border p-3">
                    <div className="row">
                        <TabLeftColumn scheduleItems={profile.scheduleItems}
                                       removeScheduleItem={this.removeScheduleItem}
                                       handleTimePickerChanged={this.handleTimePickerChanged}/>
                        <TabRightColumn handleProfileActiveChange={this.handleProfileActiveChange}
                                        setRestartTimer={this.setRestartTimer} getRestartTimer={this.getRestartTimer}
                                        getTimerDistance={this.getTimerDistance} profile={profile}
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
        const profile = {...this.state.profile};
        const items = profile.scheduleItems.slice();
        items.push({time: '', startSec: '', duration: '', id: uuidv4()});
        profile.scheduleItems = items;
        this.setState({
            profile: profile
        })
    };

    removeScheduleItem(itemId) {
        const profile = {...this.state.profile};
        profile.scheduleItems = profile.scheduleItems.slice()
            .filter(item => item.id !== itemId);
        this.setState({profile})
    };

    handleProfileActiveChange(checked) {
        const profile = {...this.state.profile};
        profile.isActive = checked;

        this.setState({
            profile: profile
        })
    }

    handleTimePickerChanged(timeStr, timePickerId) {
        const profile = {...this.state.profile};
        const newScheduledItems = profile.scheduleItems.slice();
        const item = newScheduledItems.find(item => item.id === timePickerId);
        item.time = timeStr;
        profile.scheduleItems = newScheduledItems;
        this.setState({profile});
    };

    handleEditProfileName(newProfileName) {
        const profile = {...this.state.profile};
        const newProfiles = this.state.profiles.slice();
        const currentProfile = newProfiles.find(item => item.id === this.state.profile.id);
        currentProfile.name = newProfileName;
        profile.name = newProfileName;

        this.setState({
            profiles: newProfiles,
            profile: profile
        })
    }

    getTimerDistance() {
        const now = new Date();
        const scheduleItems = this.state.profile.scheduleItems.filter(item => item.time !== '');
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
