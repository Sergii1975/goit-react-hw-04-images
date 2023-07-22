import { useState, useEffect } from "react";
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from './services/api';
import Loader from './Loader/Loader';
import { animateScroll } from 'react-scroll';
import {AppFrame } from './App.styled';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const perPage = 12;
  
  useEffect(() => {
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const getImages = async (query, page) => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    try {
      const { hits, totalHits } = await fetchImages(query, page);

      if (!hits.length) {
        setLoadMore(false);
        toast.info('Nothing was found for your request. Try something else');
        return;
      }
      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / perPage));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const hangleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const onloadMore = () => {
    setPage(prevPage =>  prevPage + 1 );
    scrollToBottomButton()
  };

  const scrollToBottomButton = () => {
    animateScroll.scrollToBottom({
      duration: 2000,
      delay: 10,
      smooth: 'linear',
    });
  };

    return (
      <AppFrame>
        <ToastContainer transition={Flip} />
        {error && <p>Oh, mistake, everything is gone!!!</p>}
        <Searchbar onSubmitImage={hangleFormSubmit } />
        {isLoading ? (
          <Loader/>
        ) : ( 
          <ImageGallery images={images}  />
        )}
        {loadMore && <Button onloadMore={onloadMore}/>}        
      </AppFrame> 
    )
};
