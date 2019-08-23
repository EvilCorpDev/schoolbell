import React from 'react'

export default function DeletePopup(props) {
    const {popupId, delEntityName, delEntityId, handleDeleteAction} = props;
    return (
        <div className="modal fade" id={popupId} tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                            Are you sure you want to delete {delEntityName}
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal"
                                onClick={() => handleDeleteAction(delEntityId)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
