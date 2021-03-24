import React, {useState, useEffect} from 'react';
import { FetchError, Preloader } from '../../../common';

export default function CatalogCategories({onChangeCategory: handleChangeCategory, selectedCategory}) {

  const CATALOG_CATEGORIES_LINK = "http://localhost:7070/api/categories";

  const [categories, setCategories] = useState(null);
  const [categoriesError, setCategoriesError] = useState(null);
  const [allCategories, setAllCategories] = useState([{id: 0, title: "Все"}])
  
  useEffect(
		() => {
			const fetchData = async () => {
				try {
					const response = await fetch(CATALOG_CATEGORIES_LINK);
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					const data = await response.json();
					setCategories(data);
					setCategoriesError(null);
				} 
				catch (e) {
					setCategoriesError(e);
					console.dir(e.message);
				} 
			};
			fetchData();
		},
		[]
	);

  useEffect(
    () => {
      if (categories) setAllCategories((prev) => [...prev, ...categories]);
    },
    [categories]
  );

  const handleClick = ({target}) => {
    handleChangeCategory(target.textContent, categories);
  }
  
  return (
    <>
    {
      (!allCategories) ? Preloader() : 
      <ul className="catalog-categories nav justify-content-center">
        {allCategories.map(category => 
        <li className="nav-item" key={category.id}>
          <button
          onClick={handleClick}
          className={`nav-link${(selectedCategory===category.id) ? " active" : ""}`}
          type="button"
          >
            {category.title}
          </button>
        </li>
      )}
      </ul>
    }
    {categoriesError && FetchError(`Ошибка загрузки данных (категории каталога): ${categoriesError.message}`)}
    </>
  )
}
