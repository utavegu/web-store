import React, {useState, useEffect, useContext} from 'react';
import { FetchError, Preloader } from '../../common';
import Context from '../../contexts/Context';
import CatalogCategories from './CatalogCategories/CatalogCategories';
import CatalogElements from './CatalogElements/CatalogElements';
import CatalogSearch from './CatalogSearch';
import PropTypes from 'prop-types';

function Catalog(props) {
  // Вот это всё, вероятно, лучше в 1 стейт
  const [items, setItems] = useState(null);
	const [itemsError, setItemsError] = useState(null);
  const [itemsLoading, setItemsLoading] = useState(false);
  
  const [shoes, setShoes] = useState([]);
  const {urlParams, setUrlParams} = useContext(Context);
  
  let itemsUrl = `http://localhost:7070/api/items?categoryId=${urlParams.category}&q=${urlParams.query}&offset=${urlParams.offset}` // ОТСЮДА И ДО КОНЦА ЮЗЭФФЕКТА ВЫНЕСТИ В ОТДЕЛЬНЫЙ ХУК. ПОПРОБУЙ (в последнюю очередь)
  // Но пожалуй со всеми этими делами лучше потренироватсья на менее сложном компоненте - в топсэйлз, например

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
      if (items) setShoes(prevShoes => [...prevShoes, ...items]);
      // Ну вот, кстати говоря, благодаря такой штуке можно использовать юзДжейсонФетч, ибо в стейте отпадёт необходимость
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
  const handleChangeCategory = (categoryId) => {
    setUrlParams(prevParams => ({...prevParams, category: categoryId, offset: 0}));
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
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {isCatalog && <CatalogSearch onQuery={handleQuery} />}
      <CatalogCategories onChangeCategory={handleChangeCategory} selectedCategory={urlParams.category} />
      {itemsError && FetchError(`Ошибка загрузки данных (товары каталога): ${itemsError.message}`)}
      {(!items) ? Preloader() :  <CatalogElements items={shoes} />}
      <div className="text-center">
        <button 
          onClick={handleOffset}
          className="btn btn-outline-primary"
          disabled={itemsLoading}
          style={(items < 6) ? {visibility: 'hidden'} : {visibility: 'visible'}}
        >
          {(itemsLoading) ? "Идёт загрузка..." : "Загрузить ещё"}
        </button>
      </div>
    </section>
  )
}

Catalog.propTypes = {
  match: PropTypes.object,
};

export default Catalog;
