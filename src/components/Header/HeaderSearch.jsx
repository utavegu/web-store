import React from 'react';

export default function HeaderSearch({searchText, setSearchText, processSearchRequest}) {
  const handleChange = ({ target }) => {
    // ДЕБАУНС
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
