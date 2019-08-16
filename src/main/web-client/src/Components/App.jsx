import React from 'react'
import moment from 'moment'
import Switch from 'react-switch'
import TabHeader from './Tabs/TabHeader'
import Tab from './Tabs/Tab'
import Timer from './Timer'

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
    }

    componentDidMount() {
        //const timerIsOn = profile.scheduleItems.size !== 0;
        this.setState({
            profiles: [{name: "Default", active: true}],
            profile: {
                scheduleItems: [{id:'someid', time: '', startSec: '', duration: ''}],
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
                        <Tab scheduleItems={profile.scheduleItems}
                             handleTimePickerChanged={this.handleTimePickerChanged}/>
                        <div className="container w-25 mt-2 ml-0 p-0 mr-5">
                            <h2>Main profile</h2>
                            <div className="container row">
                                <div className="mr-2 mt-1">Profile is active</div>
                                <Switch onChange={this.handleProfileActiveChange} checked={profile.isActive}
                                        onHandleColor="#2693e6" onColor="#86d3ff" offColor="#888" offHandleColor="#fff"
                                        handleDiameter={30} height={20} width={48} uncheckedIcon={false}
                                        checkedIcon={false}/>
                            </div>
                            <p>Next bell will rings in:</p>
                            <Timer setRestartTimer={this.setRestartTimer} getRestartTimer={this.getRestartTimer}
                                   getTimerDistance={this.getTimerDistance}/>
                        </div>
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
        const {profile} = this.state;
        const items = profile.scheduleItems.slice();
        items.push({time: '', id: App.getNextId(items)});
        profile.scheduleItems = items;

        this.setState({
            profile: profile
        })
    };

    static getNextId(items) {
        return 'newScheduledItem' + (items.length + 1);
    }

    handleProfileActiveChange(checked) {
        const {profile} = this.state;
        profile.isActive = checked;

        this.setState({
            profile: profile
        })
    }

    handleTimePickerChanged(newState, timePickerId) {
        const newScheduledItems = this.state.profile.scheduleItems.slice();
        const item = newScheduledItems.find(item => item.id === timePickerId);
        item.time = newState.hours + ":" + newState.mins;
        this.setState({
            profile: {
                scheduleItems: newScheduledItems,
                isActive: this.state.profile.isActive
            }
        })
    };

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
