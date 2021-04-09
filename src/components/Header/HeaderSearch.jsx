import React from 'react';
import PropTypes from 'prop-types';

function HeaderSearch({searchText, setSearchText, processSearchRequest}) {
  const handleChange = ({ target }) => {
    setSearchText(target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    processSearchRequest();
  }

  return (
    <form
      onSubmit={handleSubmit}
      data-id="search-form"
      className="header-controls-search-form form-inline"
    >
      <input
        onChange={handleChange}
        value={searchText}
        className="form-control"
        placeholder="Поиск"
        autoFocus
      />
    </form>
  )
}

HeaderSearch.propTypes = {
  searchText: PropTypes.string.isRequired,
  setSearchText: PropTypes.func.isRequired,
  processSearchRequest: PropTypes.func.isRequired,
};

export default HeaderSearch;