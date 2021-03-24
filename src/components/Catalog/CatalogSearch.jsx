import React, { useContext } from 'react';
import Context from '../../contexts/Context';

export default function CatalogSearch({onQuery: handleQuery}) {

  const {query, setQuery} = useContext(Context);

  const handleChange = ({target}) => {
    setQuery(target.value);
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    handleQuery(query.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="catalog-search-form form-inline">
      <input onChange={handleChange} className="form-control" name="search" value={query} placeholder="Поиск" />
    </form>
  )
}
