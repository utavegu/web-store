import React, {useContext, useState, useEffect} from 'react'
import CatalogCategories from './CatalogCategories/CatalogCategories'
import CatalogElements from './CatalogElements/CatalogElements'
import CatalogLoadMore from './CatalogLoadMore/CatalogLoadMore'
import Context from '../../contexts/Context';
import useJsonFetch from '../../hooks/useJsonFetch';

function CatalogSearch() {
  return (
    <form className="catalog-search-form form-inline">
      <input className="form-control" placeholder="Поиск" />
    </form>
  )
}

// Тебя тоже в утилджээс
function Preloader() {
  return (
    <div className="preloader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default function Catalog(props) {
  const ALL_ITEMS_LINK = "http://localhost:7070/api/items";
  
  const [items, setItems] = useState(null);
	const [itemsError, setItemsError] = useState(null);
  const [itemsUrl, setItemsUrl] = useState(ALL_ITEMS_LINK);

	useEffect(
		() => {
			const fetchData = async () => {
				try {
					const response = await fetch(itemsUrl);
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					const data = await response.json();
					setItems(data);
					setItemsError(null);
				} 
				catch (e) {
					setItemsError(e);
					console.dir(e.message);
				} 
			};
			fetchData();
		},
		[itemsUrl]
	);

  const handleChangeCategory = (categoryName, allCategories) => {
    let link;
    if (categoryName === "Все") {
      link  = "http://localhost:7070/api/items";
    } else {
      let result = allCategories.find(category => category.title.toLowerCase() === categoryName.toLowerCase());
      link = `http://localhost:7070/api/items?categoryId=${result.id}`;
    }
    setItemsUrl(link);
  }

  let isCatalog;
  try {
    isCatalog = props.match.path;
  } catch (error) {
    // Лучшее, до чего я додумался =) (чтобы поиск отображался только на экране каталога)
  }

  /* 
  1) Прелоадер и Ошибку в отдельные компоненты
  */
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      {isCatalog && <CatalogSearch />}

      <CatalogCategories onChangeCategory={handleChangeCategory} />

      {(!items) ? <Preloader /> : <CatalogElements items={items} />}

      {itemsError && <div style={{color: "red", backgroundColor: "yellow", textAlign: "center", padding: 30, margin: 30, fontSize: 26, fontWeight: "bold"}}>Ошибка загрузки данных (товары каталога): {itemsError.message}</div>}
    
      <CatalogLoadMore />
      
    </section>
  )
}
