import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons'
import './style.css'

export default function UserEdit(props) {
    const {
        user, userRoles,
        handleUsernameChanged, handlePasswordChanged, handleRoleChanged, handleDeleteUser
    } = props;
    const userOptions = userRoles.map((name, index) => {
        return (
            <option value={name} key={name + index}>
                {name}
            </option>
        )
    });

    return (
        <div className="user-edit">
            <div className="row pt-4 pl-4">
                <div className="col-3">
                    <input id={"username" + user.id} type="text" className="form-control" value={user.username}
                           onChange={handleUsernameChanged}/>
                </div>
                <div className="col-3">
                    <input id={"password" + user.id} type="password" className="form-control" value={user.password}
                           onChange={handlePasswordChanged}/>
                </div>
                <div className="col-3">
                    <select className="form-control" id={"role" + user.id}
                            value={user.role} onChange={handleRoleChanged}>
                        {userOptions}
                    </select>
                </div>
                <div className="col-3 d-flex justify-content-end">
                    <button id={user.id} type="button" className="btn del-user-btn" onClick={handleDeleteUser}>
                        <h3><FontAwesomeIcon icon={faTimesCircle}/></h3>
                    </button>
                </div>
            </div>
            <hr/>
        </div>
    );
}
