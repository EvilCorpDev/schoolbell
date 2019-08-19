import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

export default class TabHeader extends React.Component {
    static propTypes = {
        profiles: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            active: PropTypes.bool
        }))
    };

    render() {
        const headers = this.props.profiles.map(profile => {
            const classList = profile.active ? "nav-link active" : "nav-link";
            return (
                <li className="nav-item" key={profile.name}>
                    <button className={classList}>{profile.name}</button>
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
