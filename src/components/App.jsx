import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './App.module.css';
const App = () => {
  // useEffect(() => {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // });

  const [searchName, setSearchName] = useState('');

  const handleSearchFormSubmit = searchName => {
    setSearchName(searchName);
  };
  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearchFormSubmit} />
      <ImageGallery searchName={searchName} />
    </div>
  );
};

export default App;
