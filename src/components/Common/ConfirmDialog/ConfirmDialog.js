import React from 'react';
import {toast} from 'react-toastify';

const ConfirmDialog = ({id, onConfirm, onCancel}) => (<div>
    <p>Are you sure?</p>
    <button onClick={() => {
        onConfirm(id);

    }}>Yes
    </button>
    <button onClick={() => {
        onCancel();
    }}>No
    </button>
</div>);

export default ConfirmDialog;