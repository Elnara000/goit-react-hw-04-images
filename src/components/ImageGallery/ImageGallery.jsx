import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import fetchImages from '../../fetchImages';
import css from './ImageGallery.module.css';
import Loader from 'components/Loader/Loader';
import Button from '../Button/Button';
const ImageGallery = ({ searchName }) => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchName === '') {
      return;
    }
    setStatus('pending');
    fetchImages(searchName)
      .then(value => {
        if (value.hits < 1) {
          return Promise.reject(new Error('No results'));
        }
        return value;
      })
      .then(value => {
        setTotalHits(value.totalHits);
        setValue(value.hits);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [searchName]);

  useEffect(() => {
    if (searchName === '') {
      return;
    }
    setStatus('pending');
    fetchImages(searchName, page)
      .then(value => {
        if (value.hits < 1) {
          return Promise.reject(new Error('No results'));
        }
        return value;
      })
      .then(data => {
        setTotalHits(data.totalHits);
        setValue(prevValue => [...prevValue, ...data.hits]);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  if (status === 'idle') {
    return <div>Enter a word</div>;
  }
  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <h1>{error.message}</h1>;
  }
  if (status === 'resolved') {
    return (
      <>
        <ul className={css.imageGallery}>
          {value.map((imgInfo, i) => (
            <ImageGalleryItem
              key={i}
              webImg={imgInfo.webformatURL}
              lgImg={imgInfo.largeImageURL}
            />
          ))}
        </ul>
        {value.length <= totalHits && <Button onClick={loadMore} />}
      </>
    );
  }
};

export default ImageGallery;

ImageGallery.propTypes = {
  searchName: PropTypes.string,
  page: PropTypes.number,
};
