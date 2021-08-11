import React from 'react';
import Modal from 'react-modal';

const EventFormModal = (props) => {
    
    return (
        <Modal
            isOpen={props.messages.length >= 1 ? true : false}
            onRequestClose={props.handleClearMessages}
            contentLabel="Error!"
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="overlay"
            ariaHideApp={false}
        >
            <h3 className="modal__title">Error!</h3>
            <p className="modal__body">The following errors occured on Event submission:</p>
            <ul className="modal__list">
                {props.messages && props.messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <button className="button button--modal" onClick={props.handleClearMessages}>Okay</button>
        </Modal>
    )
};

export { EventFormModal as default };