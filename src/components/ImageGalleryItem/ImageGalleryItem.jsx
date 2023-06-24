import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ webImg, lgImg }) => {
  const [showModal, setShowModal] = useState(false);
  //каждый раз при открытии происходит вызов функции
  const openModal = () => {
    setShowModal(!showModal);
  };
  const toggleModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <li className={css.ImageGalleryItem} onClick={openModal}>
        <img
          className={css.ImageGalleryItemImage}
          src={webImg}
          alt="searchedImg"
        />
      </li>
      {showModal && <Modal img={lgImg} onClose={toggleModal} />}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webImg: PropTypes.string,
  lgImg: PropTypes.string,
};
