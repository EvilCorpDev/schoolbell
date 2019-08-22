import React from 'react'

export default class EditProfileNamePopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileName: props.profileName,
            openProfileId: props.openProfileId
        };

        this.handleEditProfileName = this.props.handleEditProfileName;
        this.handleClosePopup = this.handleClosePopup.bind(this);
    }

    render() {
        const {popupHeader, editLabel, popupId, openProfileId, profileName} = this.props;
        const inputText = openProfileId !== this.state.openProfileId ? profileName : this.state.profileName;
        return (
            <div className="modal fade" id={popupId} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{popupHeader}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">{editLabel}:</label>
                                    <input type="text" className="form-control" id="recipient-name"
                                           value={inputText} onChange={this.handleEditName} autoComplete="off"/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                                    onClick={this.handleClosePopup}>Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleEditName = ev => {
        ev.preventDefault();
        this.setState({
            profileName: ev.target.value,
            openProfileId: this.props.openProfileId
        });
    };

    handleClosePopup = ev => {
        this.setState({
            openProfileId: this.props.openProfileId
        }, () => this.handleEditProfileName(this.state.profileName));
    };
}
