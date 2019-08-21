import React from 'react'

export default class EditPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profileName: props.profileName
        };

        this.handleEditProfileName = this.props.handleEditProfileName;
        this.handleClosePopup = this.handleClosePopup.bind(this);
    }

    /*static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.profileName === undefined) {
            return {
                profileName: nextProps.profileName
            }
        }
        return prevState;

    }*/

    render() {
        console.log(this.props.profileName);
        const {popupHeader, editLabel, popupId} = this.props;
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
                                           value={this.state.profileName} onChange={this.handleEditName} autoComplete="off"/>
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
            profileName: ev.target.value
        });
    };

    handleClosePopup = ev => {
        this.handleEditProfileName(this.state.profileName);
    };
}
