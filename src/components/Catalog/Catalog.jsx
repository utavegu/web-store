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
  // В принципе тут контекст не нужен - можно прямо сюда призывать 2 джейсон фетча... или нужен... давай пока оставь этот момент, пока до работы с корзиной не дошёл...
  // const [, ,categories] = useContext(Context);

  const ALL_ITEMS_LINK = "http://localhost:7070/api/items";
  const CATALOG_CATEGORIES_LINK = "http://localhost:7070/api/categories";
  const linkToCategory = `http://localhost:7070/api/items?categoryId=X`;

  const [items, setItems] = useState(null);
	const [itemsError, setItemsError] = useState(null);

  const [categories, setCategories] = useState(null);
  const [categoriesError, setCategoriesError] = useState(null);

  const [category, setCategory] = useState("Все");

  const [itemsUrl, setItemsUrl] = useState(ALL_ITEMS_LINK);

  // Думаю, данные и стейт для категорий нужны только в категориях, а для элементов каталога - только в элементах каталога...
  // Хотя... опираясь на эти данные я их отрисовываю... Но вообще это можно делать и внутри

  const handleChangeCategory = (categoryName) => {
    let link;
    if (categoryName === "Все") {
      link  = "http://localhost:7070/api/items"
    } else {
      let result = categories.find(category => category.title.toLowerCase() === categoryName.toLowerCase())
      link = `http://localhost:7070/api/items?categoryId=${result.id}`;
    }
    setItemsUrl(link);
  }


  
  let categoriesUrl = CATALOG_CATEGORIES_LINK;

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

  useEffect(
		() => {
			const fetchData = async () => {
				try {
					const response = await fetch(categoriesUrl);
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
		[categoriesUrl]
	);

  let isCatalog;
  try {
    isCatalog = props.match.path;
  } catch (error) {
    // Лучшее, до чего я додумался =) (чтобы поиск отображался только на экране каталога)
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      {isCatalog && <CatalogSearch />}

      {(!categories) ? <Preloader /> :
      <CatalogCategories 
        onChangeCategory={handleChangeCategory} 
        categories={categories} 
      />}

      {categoriesError && <div style={{color: "red", backgroundColor: "yellow", textAlign: "center", padding: 30, margin: 30, fontSize: 26, fontWeight: "bold"}}>Ошибка загрузки данных (категории каталога): {categoriesError.message}</div>}
      {/* 
      ВОТ ЭТУ БАТАРЕЮ НЕПЛОХО БЫ В УТИЛ УПИХАТЬ. КАК И ССЫЛКИ, ЕСЛИ С ЕНВ НЕ РАЗБЕРЕШЬСЯ 
      */}

      {/* Так, ещё одна проблема... эта работало до использования стэйта... нужно найти более универсальное решение... Походу опять привет промисам... Так, а что если данные изменять прямо в контексте?
      */}

      {(!items) ? <Preloader /> : <CatalogElements items={items} />}

      {itemsError && <div style={{color: "red", backgroundColor: "yellow", textAlign: "center", padding: 30, margin: 30, fontSize: 26, fontWeight: "bold"}}>Ошибка загрузки данных (товары каталога): {itemsError.message}</div>}
    


      <CatalogLoadMore />
      
    </section>
  )
}
