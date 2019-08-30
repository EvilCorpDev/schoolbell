import React from 'react'
import Switch from 'react-switch'
import Timer from "../Timer";
import EditProfileNamePopup from '../popups/EditProfileNamePopup'
import DeletePopup from '../popups/DeletePopup'

export default class TabRightColumn extends React.Component {

    render() {
        const {
            handleProfileActiveChange, profile, setRestartTimer,
            getRestartTimer, getTimerDistance, handleEditProfileName, handleDeleteProfile
        } = this.props;
        const editPopup = this.props.profile.name === undefined ? '' : (
            <EditProfileNamePopup popupHeader={"Редагувати ім'я профілю"} editLabel="Ім'я" popupId="editProfileNamePopup"
                                  profileName={profile.name} handleEditProfileName={handleEditProfileName}
                                  openProfileId={profile.id}/>
        );
        const delProfilePopup = this.props.profile.name === undefined ? '' : (
            <DeletePopup delEntityName={"профіль " + this.props.profile.name} popupId="delProfilePopup"
                         handleDeleteAction={handleDeleteProfile}
                         delEntityId={profile.id}/>
        );

        return (
            <div className="container w-25 mt-2 ml-0 p-0 mr-5">
                <h2>
                    {profile.name}
                    <button type="button" className="edit-btn ml-3" data-toggle="modal"
                            data-target="#editProfileNamePopup">
                        <small><i className="far fa-edit fa-1x"/></small>
                    </button>
                    <button className="btn float-auto del-profile" data-toggle="modal"
                            data-target="#delProfilePopup">
                        <small><i className="fas fa-times fa-2x"/></small>
                    </button>
                </h2>
                {editPopup}
                {delProfilePopup}
                <div className="container row">
                    <div className="mr-2 mt-1">Профіль активний</div>
                    <Switch onChange={handleProfileActiveChange} checked={profile.active}
                            onHandleColor="#2693e6" onColor="#86d3ff" offColor="#888" offHandleColor="#fff"
                            handleDiameter={30} height={20} width={48} uncheckedIcon={false}
                            checkedIcon={false}/>
                </div>
                <p>Наступний дзвінок через:</p>
                <Timer setRestartTimer={setRestartTimer} getRestartTimer={getRestartTimer}
                       getTimerDistance={getTimerDistance}/>
            </div>
        );
    }
}
