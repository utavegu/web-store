import React, {useState, useEffect} from 'react'
import CatalogCategories from './CatalogCategories/CatalogCategories'
import CatalogElements from './CatalogElements/CatalogElements'
import CatalogLoadMore from './CatalogLoadMore/CatalogLoadMore'

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

/*
1) СНАЧАЛА ЗАЙМУСЬ ПОЛЕМ ПОИСКА - ЗАДАЧА ИЗ НЕГО ВЫКОВЫРИВАТЬ (ЧЕРЕЗ ТРОТЛИНГ И ДЕБАУНС!) ПОСЛЕДНЕЕ ВВЕДЕННОЕ ЗНАЧЕНИЕ
2) КОГДА ЗНАЧЕНИЕ БУДЕТ ДОСТАВЛЕНО В ЭТОТ КОМПОНЕНТ - ОНО СТАНОВИТСЯ ОДНИМ ИЗ АГРУМЕНТОВ ДЛЯ generateUrl(category, query, offset)
3) НУ И САМОЕ ЕБАНОЕ - ОФФСЕТ. НО Я ТАК ПОНИМАЮ, ОН ПРОСТО ПУШИТ НОВОПРИЛЕТЕВШИЕ ДАННЫЕ И ВСЁ, А ЗНАЧЕНИЕ ВСЕГДА 6. НОВЫЕ ДАННЫЕ ПРИЛЕТЕЛИ ДЛИННОЙ МАССИВА 0 - КНОПКУ БЛОЧУ
offset=56 - то значение, при котором загружается 6 последних пар в категории "все"
offset=0 - эквивалентно отсутствию параметра - то есть загружаются первые 6 пар
offset=62 - больше никакая обувь не приходит, на 61 была одна последняя пара
Так... с оффсетами значит задача основная - это к результатам предыдущей подгрузки прибавить результаты новой, а когда будет приходить пустой массив - блочить кнопку.
Стартовый айдишник итема - 20, последний - 81... Итого 61 пара, выходит
А с поиском вообще всё просто оказалось - сервер сам понимает любую галиматью
Значит, начинаю формировать унимерсальную ссылку
Категории: 12 - мужская обувь, 13 - женская, 14 - унисекс, 15 - детская
Так... как мне это видится сейчас - каждый отдельный модуль возвращает свой параметр и это кладётся в универсальную функцию криейтЛинк, которая возвращает готовую ссылку для запроса, просто подставляя в нужное место значение параметра, которое по дефолту 0 (если ничего не пришло от модулей), а qm categoryId и offset есть в ссылке всегда, отдельно их добавлять не нужно. Важен ли порядок параметров?..
Так... порядок не важен, а вот с q 0 не срабатывает, но он нормально реагирует просто на отсутствие значения
*/

export default function Catalog(props) {
  const INITIAL_LINK = "http://localhost:7070/api/items";
  const TEST_LINK = "http://localhost:7070/api/items?categoryId=0&offset=0&q=";
  
  const [items, setItems] = useState(null);
	const [itemsError, setItemsError] = useState(null);
  const [itemsUrl, setItemsUrl] = useState(TEST_LINK);

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
    // Так, тебя нужно поправить так, чтобы ты возвращал не готовую ссылку и сразу её в сетЮрл, а только число категории. В елсе от 11 до 15 и в ифе просто 0.
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

  console.log(items);

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
