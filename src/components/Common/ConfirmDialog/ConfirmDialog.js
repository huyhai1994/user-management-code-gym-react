import React from 'react';

/**
 * ConfirmDialog component renders a confirmation dialog with "Yes" and "No" buttons.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.id - The unique identifier for the item to be confirmed.
 * @param {function} props.onConfirm - The callback function to be called when the "Yes" button is clicked.
 * @param {function} props.onCancel - The callback function to be called when the "No" button is clicked.
 * @returns {JSX.Element} The rendered confirmation dialog component.
 */
const ConfirmDialog = ({id, name, onConfirm, onCancel}) => (
    <div className='container d-flex flex-column justify-content-center align-items-center'>
        <div className="row">
            <p>Are you sure to delete {name}?</p>
        </div>
        <div className="row w-100 d-flex justify-content-center">
            <div className="col-6 d-flex justify-content-around">
                <button className='btn btn-success w-100' onClick={() => {
                    onConfirm(id);
                }}>Yes
                </button>
            </div>
            <div className="col-6">
                <button className='btn btn-secondary w-100' onClick={() => {
                    onCancel();
                }}>No
                </button>
            </div>
        </div>
    </div>);

export default ConfirmDialog;