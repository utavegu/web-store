import React, { useState, useContext } from 'react';
import Context from '../../contexts/Context';

export default function CatalogSearch({onQuery: handleQuery}) {

  const {query, setQuery} = useContext(Context);
  // Перенес строку поиска в глобальный контекст
  // const [query, setQuery] = useState("");

  const handleChange = ({target}) => {
    setQuery(target.value.trim());
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    handleQuery(query);
  }

  return (
    <form onSubmit={handleSubmit} className="catalog-search-form form-inline">
      <input onChange={handleChange} className="form-control" name="search" value={query} placeholder="Поиск" />
    </form>
  )
}
