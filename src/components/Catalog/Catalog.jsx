import React, {useState, useEffect, useRef} from 'react';
import CatalogCategories from './CatalogCategories/CatalogCategories';
import CatalogElements from './CatalogElements/CatalogElements';
import CatalogSearch from './CatalogSearch';

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
  const [items, setItems] = useState(null);
	const [itemsError, setItemsError] = useState(null);
  const [shoes, setShoes] = useState([]);
  const [urlParams, setUrlParams] = useState({
    category: 0,
    query: '',
    offset: 0,
  })

  const loadMoreButton = useRef(null);
  
  let itemsUrl = `http://localhost:7070/api/items?categoryId=${urlParams.category}&q=${urlParams.query}&offset=${urlParams.offset}`

  // Тащить данные с сервера по сформированному URL
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

      <CatalogCategories onChangeCategory={handleChangeCategory} />

      {(!shoes) ? <Preloader /> : <CatalogElements items={shoes} />}

      {/* В компонент, в утил, стили в объект в утиле */}

      {itemsError && <div style={{color: "red", backgroundColor: "yellow", textAlign: "center", padding: 30, margin: 30, fontSize: 26, fontWeight: "bold"}}>Ошибка загрузки данных (товары каталога): {itemsError.message}</div>}

      <div className="text-center">
    	  <button onClick={handleOffset} ref={loadMoreButton} className="btn btn-outline-primary">Загрузить ещё</button>
      </div>

    </section>
  )
}
