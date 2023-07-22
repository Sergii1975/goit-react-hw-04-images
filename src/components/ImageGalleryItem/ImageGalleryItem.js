import React, { useState} from 'react';
import Modal from 'components/Modal/Modal';
import { ImageGalleryLi, ImageGalleryItemImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, alt, largeImageURL }) => {
    const [showModal, setShowModal] = useState(false)
    
    const toggleModal = () => {
        setShowModal( !showModal ) 
    };
        
        return (
            <ImageGalleryLi onClick={toggleModal}>
                <ImageGalleryItemImg src={src} alt={alt} loading="lazy" />
                {showModal && (
                    <Modal
                        largeImageURL={largeImageURL}
                        tags={alt}
                        closeModal={toggleModal}
                    />
                )}
            </ImageGalleryLi>
    )
};

ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;