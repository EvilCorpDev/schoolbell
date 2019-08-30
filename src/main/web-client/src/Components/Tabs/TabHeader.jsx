import React from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import './style.css'

export default class TabHeader extends React.Component {
    static propTypes = {
        openProfileId: PropTypes.string.isRequired,
        profiles: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            isActive: PropTypes.bool
        }))
    };

    render() {
        const {openProfileId, handleChangeOpenedProfile, handleAddProfile} = this.props;
        const headers = this.props.profiles.map(profile => {
            const btnClassList = profile.id === openProfileId ? "active-btn active" : "passive-link";
            const liClassList = profile.id === openProfileId ? "active-tab" : "passive-link";
            return (
                <li className={liClassList + " nav-item"} key={profile.id}>
                    <button className={btnClassList + " nav-link"} id={profile.id} onClick={handleChangeOpenedProfile}>
                        {profile.name}
                    </button>
                </li>
            )
        });

        return (
            <ul className="nav nav-tabs">
                {headers}
                <li className="nav-item">
                    <button className="nav-link add-profile" onClick={handleAddProfile}>
                        <FontAwesomeIcon icon={faPlus}/> Додати профайл
                    </button>
                </li>
            </ul>
        )
    }
}
