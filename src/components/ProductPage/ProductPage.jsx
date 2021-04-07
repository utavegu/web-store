import React from 'react';
import { FetchError, Preloader } from '../../common';
import ProductPageItem from './ProductPageItem';
import PropTypes from 'prop-types';
import useJsonFetch from '../../hooks/useJsonFetch';

function ProductPage({match, history}) {  
  const itemUrl = `http://localhost:7070/api/items/${match.params.id}`;
  const {data: item, hasError: error} = useJsonFetch(itemUrl);

  return (
    <>
      {(!item) ? Preloader() : <ProductPageItem item={item} history={history}/>}
      {error && FetchError(`Ошибка загрузки данных: ${error.message}`)}
    </>
  )
}

ProductPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ProductPage;
