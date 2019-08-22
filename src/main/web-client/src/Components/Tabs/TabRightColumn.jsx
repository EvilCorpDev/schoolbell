import React from 'react'
import Switch from 'react-switch'
import Timer from "../Timer";
import EditProfileNamePopup from './EditProfileNamePopup'

export default class TabRightColumn extends React.Component {

    render() {
        const {
            handleProfileActiveChange, profile, setRestartTimer,
            getRestartTimer, getTimerDistance, handleEditProfileName
        } = this.props;
        const editPopup = this.props.profile.name === undefined ? '' : (
            <EditProfileNamePopup popupHeader={"Edit profile name"} editLabel="Name" popupId="editProfileNamePopup"
                                  profileName={profile.name} handleEditProfileName={handleEditProfileName}
                                  openProfileId={profile.id}/>
        );

        return (
            <div className="container w-25 mt-2 ml-0 p-0 mr-5">
                <h2>
                    {profile.name}
                    <button type="button" className="edit-btn ml-3" data-toggle="modal"
                            data-target="#editProfileNamePopup">
                        <small><i className="far fa-edit fa-1x"/></small>
                    </button>
                </h2>
                {editPopup}
                <div className="container row">
                    <div className="mr-2 mt-1">Profile is active</div>
                    <Switch onChange={handleProfileActiveChange} checked={profile.isActive}
                            onHandleColor="#2693e6" onColor="#86d3ff" offColor="#888" offHandleColor="#fff"
                            handleDiameter={30} height={20} width={48} uncheckedIcon={false}
                            checkedIcon={false}/>
                </div>
                <p>Next bell will rings in:</p>
                <Timer setRestartTimer={setRestartTimer} getRestartTimer={getRestartTimer}
                       getTimerDistance={getTimerDistance}/>
            </div>
        );
    }
}
