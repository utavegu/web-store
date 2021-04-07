import React, {useState, useEffect, useContext} from 'react';
import { FetchError, Preloader } from '../../common';
import Context from '../../contexts/Context';
import CatalogCategories from './CatalogCategories/CatalogCategories';
import CatalogElements from './CatalogElements/CatalogElements';
import CatalogSearch from './CatalogSearch';
import PropTypes from 'prop-types';
import useJsonFetch from '../../hooks/useJsonFetch';

function Catalog(props) {
  const [shoes, setShoes] = useState([]);
  const {urlParams, setUrlParams} = useContext(Context);
  
  let itemsUrl = `http://localhost:7070/api/items?categoryId=${urlParams.category}&q=${urlParams.query}&offset=${urlParams.offset}`

  const {data: items, isLoading: loading, hasError: error} = useJsonFetch(itemsUrl);
  
  useEffect(
    () => {
      if (items) setShoes(prevShoes => [...prevShoes, ...items]);
    },
    [items]
  );

  useEffect(
    () => {
      setShoes([]);
      setUrlParams(prevParams => ({...prevParams, offset: 0}));
    },
    [urlParams.category, urlParams.query]
  );

  const handleChangeCategory = (categoryId) => {
    setUrlParams(prevParams => ({...prevParams, category: categoryId, offset: 0}));
  }

  const handleQuery = (queryString) => {
    setUrlParams(prevParams => ({...prevParams, query: queryString}));
  }

  const handleOffset = () => {
    const newOffset = urlParams.offset + 6;
    setUrlParams(prevParams => ({...prevParams, offset: newOffset}));
  }

  let isCatalog;
  try {
    isCatalog = props.match.path;
  } catch (error) {
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {isCatalog && <CatalogSearch onQuery={handleQuery} />}
      <CatalogCategories onChangeCategory={handleChangeCategory} selectedCategory={urlParams.category} />
      {error && FetchError(`Ошибка загрузки данных (товары каталога): ${error.message}`)}
      {(!items) ? Preloader() :  <CatalogElements items={shoes} />}
      <div className="text-center">
        <button 
          onClick={handleOffset}
          className="btn btn-outline-primary"
          disabled={loading}
          style={(items < 6) ? {visibility: 'hidden'} : {visibility: 'visible'}}
        >
          {(loading) ? "Идёт загрузка..." : "Загрузить ещё"}
        </button>
      </div>
    </section>
  )
}

Catalog.propTypes = {
  match: PropTypes.object,
};

export default Catalog;
