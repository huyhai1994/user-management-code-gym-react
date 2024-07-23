import React from 'react';
import {toast} from 'react-toastify';

const ConfirmDialog = ({id, onConfirm, onCancel}) => (<div>
    <p>Are you sure?</p>
    <button className='btn btn-success' onClick={() => {
        onConfirm(id);

    }}>Yes
    </button>
    <button className='btn ' onClick={() => {
        onCancel();
    }}>No
    </button>
</div>);

export default ConfirmDialog;