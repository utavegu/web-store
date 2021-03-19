import React, { useState } from 'react';

export default function CatalogSearch({onQuery: handleQuery}) {

  const [query, setQuery] = useState("");

  const handleChange = ({target}) => {
    setQuery(target.value);
  }

  // Пока так, но в итоге лучше с троттлингом и дебаунсом, чтобы отправлял сам последнее значение
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