import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';

const SearchBar = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedGallies, setSearchedGallies] = useState([]);

  useEffect(() => {
    if (props.data){return }
    setSearchedGallies([...props.data.gallery]);
}, []);

  const handleChange = (e) => {
    e.preventDefault();
    if(searchInput.length === 0) {
      setSearchedGallies([])
      setSearchedGallies([...props.data.gallery]);
      props.sendDataToParent(props.data.gallery)
    }
    if (searchInput.length > 0) {
      let filterGalleris = props.data.gallery.filter((data) => {
        return data.title.match(searchInput) || data.description.match(searchInput) || data.user.name.match(searchInput);
      });

      setSearchedGallies(filterGalleris)
      props.sendDataToParent(filterGalleris)
    }
  };

  return <div>
    <input
      type="search"
      placeholder="Search here"
      value={searchInput}
      onChange={({ target }) => {
        setSearchInput(target.value);
      }
      
      }
    />
    <Button onClick={handleChange}> Search</Button>
  </div>


};

export default SearchBar;