import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

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

export default function CatalogCategories({onChangeCategory: handleChangeCategory}) {

  const CATALOG_CATEGORIES_LINK = "http://localhost:7070/api/categories";

  const [categories, setCategories] = useState(null);
  const [categoriesError, setCategoriesError] = useState(null);

  const handleClick = ({target}) => {
    handleChangeCategory(target.textContent, categories);
  }

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
		[CATALOG_CATEGORIES_LINK]
	);

  /* 
  1) В идеале НАВЛИНК, но с ними чото не получилось - видимо они должны быть внутри навигации или ещё что-то 
  2) Чот как-то не очень отрисовка ВСЕ вручную... надо в массив сверху спереди просто ещё один объект запушить 
  3) Прелоадер и компонент ошибки - в отдельные компоненты (с чилдреном)
  4) Хреново конечно смотрится баррикада ниже и надо бы List-компонент ещё сделать, но пока так, пожалуй
  5) Или вообще на чекбоксы переделать... Тут вот точно у эдгара спроси
  */
  
  return (
    <>

    {
      (!categories)
      ?
      <Preloader />
      : 
      <ul className="catalog-categories nav justify-content-center">

        <li className="nav-item">
          <Link onClick={handleClick} className="nav-link active" href="#">Все</Link>
        </li>

        {categories.map(category => 
        <li className="nav-item" key={category.id}>
          <Link onClick={handleClick} className="nav-link" href="#">{category.title}</Link>
        </li>
      )}
      </ul>
    }

    {
      categoriesError 
      && 
      <div style={{
        color: "red", 
        backgroundColor: "yellow", 
        textAlign: "center", 
        padding: 30, 
        margin: 30, 
        fontSize: 26, 
        fontWeight: "bold"
        }}>Ошибка загрузки данных (категории каталога): {categoriesError.message}
      </div>
    }

    </>
  )
}
