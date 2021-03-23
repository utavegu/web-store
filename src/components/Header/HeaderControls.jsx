import React, { useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import Context from '../../contexts/Context';

export default function HeaderControls() {
  const history = useHistory();
  const {setQuery, setUrlParams} = useContext(Context);

  // ЛОГИКА ПОИСКА
  const [searchText, setSearchText] = useState("");
  const searchForm = useRef(null);
  const searchField = useRef(null);

  const moveQueryToCatalog = () => {
    setQuery(searchText.trim());
    setUrlParams({offset: 0, category: 0, query: searchText});
    setSearchText("");
    history.push("/catalog");
  } 

  const handleChange = ({ target }) => {
    setSearchText(target.value);
  }

  const handleSearchIcon = () => {
    searchForm.current.classList.toggle("invisible");
    searchField.current.focus();
    if (searchText) {
      moveQueryToCatalog();
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (searchText) {
      moveQueryToCatalog();
    }
    searchForm.current.classList.add("invisible")
  }

  // ЛОГИКА КОРЗИНЫ


  return (
    <div>
      <div className="header-controls-pics">
        <div onClick={handleSearchIcon} data-id="search-expander" className="header-controls-pic header-controls-search"></div>
        <NavLink to="/cart" className="nav-link">
          <div className="header-controls-pic header-controls-cart">
            <div className="header-controls-cart-full">1</div>
            <div className="header-controls-cart-menu"></div>
          </div>
        </NavLink>
      </div>
      <form onSubmit={handleSubmit} ref={searchForm} data-id="search-form" className="header-controls-search-form form-inline invisible">
        <input onChange={handleChange} value={searchText} ref={searchField} className="form-control" placeholder="Поиск" />
      </form>
    </div>
  )
}
