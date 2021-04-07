import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { getCartData } from '../../common';
import Context from '../../contexts/Context';

export default function HeaderControls() {
  const history = useHistory();
  const {setQuery, setUrlParams} = useContext(Context);

  // ЛОГИКА ПОИСКА
  const [searchText, setSearchText] = useState("");
  const [searchIsVisible, setSearchIsVisible] = useState(false)

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
    setSearchIsVisible(!searchIsVisible);
    // searchField.current.focus(); // атрибут autofocus
    if (searchText) moveQueryToCatalog();
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (searchText) moveQueryToCatalog();
    setSearchIsVisible(false);
  }

  // ЛОГИКА КОРЗИНЫ
  let quantityInCart;
  (getCartData() !== null)
  ?
  quantityInCart = getCartData()
    .map(elem => elem.quantity)
    .reduce((sum, elem) => sum + elem, 0)
  :
  quantityInCart = false;

  // В принципе можно пошаманить с помощью флекс-ордера и разбить на 2 компонента, но пускай будет так
  
  return (
    <div>
      <div className="header-controls-pics">
        <div onClick={handleSearchIcon} data-id="search-expander" className="header-controls-pic header-controls-search"></div>
        <NavLink to="/cart" className="nav-link">
          <div className="header-controls-pic header-controls-cart">
            {(quantityInCart) ? <div className="header-controls-cart-full">{quantityInCart}</div> : null}
            <div className="header-controls-cart-menu"></div>
          </div>
        </NavLink>
      </div>
      <form
        onSubmit={handleSubmit}
        data-id="search-form"
        className={`header-controls-search-form form-inline ${!searchIsVisible && 'invisible'}`}
      >
        <input
          onChange={handleChange}
          value={searchText}
          className="form-control"
          placeholder="Поиск"
          autoFocus
        />
      </form>

    </div>
  )
}
