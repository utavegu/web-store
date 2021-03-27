import React, {useState, useEffect, useRef, useContext} from 'react';
import { FetchError, Preloader } from '../../common';
import Context from '../../contexts/Context';
import CatalogCategories from './CatalogCategories/CatalogCategories';
import CatalogElements from './CatalogElements/CatalogElements';
import CatalogSearch from './CatalogSearch';

export default function Catalog(props) {
  const [items, setItems] = useState(null);
	const [itemsError, setItemsError] = useState(null);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [shoes, setShoes] = useState([]);
  const {urlParams, setUrlParams} = useContext(Context);
  const loadMoreButton = useRef(null);
  
  let itemsUrl = `http://localhost:7070/api/items?categoryId=${urlParams.category}&q=${urlParams.query}&offset=${urlParams.offset}`


  // Тащить данные с сервера по сформированному URL
	useEffect(
		() => {
			const fetchData = async () => {
        setItemsLoading(true);
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
        finally {
					setItemsLoading(false);
				}
			};
			fetchData();
		},
		[itemsUrl]
	);

  // Набиваем массив для обуви тем, что пришло с сервера. Дополняя то, что уже было
  useEffect(
    () => {
      if (items) {
        setShoes((prevShoes) => [...prevShoes, ...items]);
        if (items.length < 6) {
          loadMoreButton.current.style.visibility = "hidden";
        } else {
          loadMoreButton.current.style.visibility = "visible";
        }
        loadMoreButton.current.removeAttribute("disabled");
      }
    },
    [items]
  );

  // При смене категории или поискового запроса сбросить офсет и обнулить массив с обувью
  useEffect(
    () => {
      setShoes([]);
      setUrlParams(prevParams => ({...prevParams, offset: 0}));
    },
    [urlParams.category, urlParams.query]
  );


  // Обработчик смены категории
  const handleChangeCategory = (categoryName, allCategories) => {
    let categoryId;
    if (categoryName === "Все") {
      categoryId = 0;
    } else {
      let result = allCategories.find(category => category.title.toLowerCase() === categoryName.toLowerCase());
      categoryId = result.id;
    }
    setUrlParams(prevParams => ({...prevParams, category: categoryId}));
    setUrlParams(prevParams => ({...prevParams, offset: 0}));
  }

  // Обработчик поискового запроса
  const handleQuery = (queryString) => {
    setUrlParams(prevParams => ({...prevParams, query: queryString}));
  }

  // Обработчик "Загрузить ещё"
  const handleOffset = () => {
    if (!itemsLoading) loadMoreButton.current.setAttribute("disabled", "disabled");
    const newOffset = urlParams.offset + 6;
    setUrlParams(prevParams => ({...prevParams, offset: newOffset}));
  }


  // Отрисовка поисковой строки для экрана каталога
  let isCatalog;
  try {
    isCatalog = props.match.path;
  } catch (error) {
    // Лучшее, до чего я додумался =) (чтобы поиск отображался только на экране каталога)
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {isCatalog && <CatalogSearch onQuery={handleQuery} />}
      <CatalogCategories onChangeCategory={handleChangeCategory} selectedCategory={urlParams.category} />
      {itemsError && FetchError(`Ошибка загрузки данных (товары каталога): ${itemsError.message}`)}
      {(!items) ? Preloader() :  <CatalogElements items={shoes} />}
      <div className="text-center">
        <button onClick={handleOffset} ref={loadMoreButton} className="btn btn-outline-primary">
          {(!items) ? Preloader() : "Загрузить ещё"}
        </button>
      </div>
    </section>
  )
}
