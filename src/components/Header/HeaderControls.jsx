import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { getCartData } from '../../common';
import Context from '../../contexts/Context';
import HeaderSearch from './HeaderSearch';

export default function HeaderControls() {
  const history = useHistory();
  const {setQuery, setUrlParams} = useContext(Context);
  const [searchIsVisible, setSearchIsVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const processSearchRequest = () => {
    if (searchText) {
      setQuery(searchText.trim());
      setUrlParams({offset: 0, category: 0, query: searchText.trim()});
      history.push("/catalog");
      setSearchText("");
    }
    setSearchIsVisible(!searchIsVisible);
  }

  const handleClick = () => {
    processSearchRequest(searchText)
  } 

  let quantityInCart;
  (getCartData() !== null)
  ?
  quantityInCart = getCartData()
    .map(elem => elem.quantity)
    .reduce((sum, elem) => sum + elem, 0)
  :
  quantityInCart = false;

  return (
    <div>
      <div className="header-controls-pics">

        <div onClick={handleClick} data-id="search-expander" className="header-controls-pic header-controls-search"></div>

        <NavLink to="/cart" className="nav-link">
          <div className="header-controls-pic header-controls-cart">
            {(quantityInCart) ? <div className="header-controls-cart-full">{quantityInCart}</div> : null}
            <div className="header-controls-cart-menu"></div>
          </div>
        </NavLink>

      </div>

      {
      searchIsVisible 
      && 
      <HeaderSearch
        searchText={searchText}
        // Тут, вроде, надо какие-то другие имена пропсов придумать:
        setSearchText={setSearchText}
        processSearchRequest={processSearchRequest}
      />
      }

    </div>
  )
}
