import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalDiv } from './Modal.styled'
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ tags, largeImageURL, closeModal }) => {
  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target !== e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return createPortal (
            <Overlay onClick={handleBackdropClick}>
                <ModalDiv>
                    <img src={largeImageURL} alt={tags}/>
                </ModalDiv>
            </Overlay>,
            modalRoot
        );
};

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;