import React from 'react'
import PropTypes from 'prop-types'
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
        const {openProfileId, handleChangeOpenedProfile} = this.props;
        const headers = this.props.profiles.map(profile => {
            const classList = profile.id === openProfileId ? "nav-link active" : "nav-link passive-link";
            return (
                <li className="nav-item" key={profile.id}>
                    <button className={classList} id={profile.id} onClick={handleChangeOpenedProfile}>
                        {profile.name}
                    </button>
                </li>
            )
        });

        return (
            <ul className="nav nav-tabs">
                {headers}
                <li className="nav-item">
                    <button className="nav-link add-profile"><i className="fas fa-plus"/> Add profile</button>
                </li>
            </ul>
        )
    }
}
