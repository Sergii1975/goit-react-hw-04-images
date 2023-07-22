import { useState} from "react";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { SearchBarHead, SearchForm, SearchFormBtn, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled'

 const Searchbar = ({onSubmitImage}) => {
     const [searchQuery, setSearchQuery] = useState('');
   
    const handleNameChange = event =>
    setSearchQuery(event.currentTarget.value.toLowerCase());
    
    const handleSubmit = event => {
        event.preventDefault();
    if (searchQuery.trim() === '') {
    return  toast.info('Please enter the search data.');
        };
     onSubmitImage(searchQuery);
        setSearchQuery('');
    };

         return (
             <SearchBarHead>
                 <SearchForm  onSubmit={handleSubmit} >
                <SearchFormBtn type="submit">
                    <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                </SearchFormBtn>
                
                <SearchFormInput 
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={searchQuery}
                    onChange={handleNameChange}/>
            </SearchForm>
        </SearchBarHead>
    );
       
};

Searchbar.propTypes = {
    onSubmitImage: PropTypes.func.isRequired,
};

export default Searchbar;