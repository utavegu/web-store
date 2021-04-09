import React, {useState, useEffect} from 'react';
import { FetchError, Preloader } from '../../../common';
import PropTypes from 'prop-types';
import useJsonFetch from '../../../hooks/useJsonFetch';

function CatalogCategories({onChangeCategory: handleChangeCategory, selectedCategory}) {

  const CATALOG_CATEGORIES_LINK = "http://localhost:7070/api/categories";
  const [allCategories, setAllCategories] = useState([{id: 0, title: "Все"}]);
  const {data: categories, hasError: error} = useJsonFetch(CATALOG_CATEGORIES_LINK);
  
  useEffect(
    () => {
      if (categories) setAllCategories((prev) => [...prev, ...categories]);
    },
    [categories]
  );
  
  return (
    <>
      {error && FetchError(`Ошибка загрузки данных (категории каталога): ${error.message}`)}
      {
        (!categories) ? Preloader() : 
        <ul className="catalog-categories nav justify-content-center">
          {allCategories.map(category => 
            <li className="nav-item" key={category.id}>
              <button
                onClick={() => handleChangeCategory(category.id)}
                className={`nav-link ${(selectedCategory===category.id) && "active"}`}
                disabled={selectedCategory===category.id}
                type="button"
              >
                {category.title}
              </button>
            </li>
        )}
        </ul>
      }
    </>
  )
}

CatalogCategories.propTypes = {
  onChangeCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.number.isRequired,
};

export default CatalogCategories;
