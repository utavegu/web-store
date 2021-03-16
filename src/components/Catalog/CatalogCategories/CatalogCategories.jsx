import React from 'react';
import {Link} from 'react-router-dom';

export default function CatalogCategories({categories, onChangeCategory: handleChangeCategory}) {

  const handleClick = ({target}) => {
    handleChangeCategory(target.textContent);
  }
  
  return (
		<ul className="catalog-categories nav justify-content-center">
      {/* Чот как-то не очень... надо в массив сверху спереди просто ещё один объект запушить */}
      <li className="nav-item">
				<Link onClick={handleClick} className="nav-link active" href="#">Все</Link>
			</li>

      {/* В идеале НАВЛИНК, но с ними чото не получилось - видимо они должны быть внутри навигации или ещё что-то */}

      {categories.map(category => 
      <li className="nav-item" key={category.id}>
				<Link onClick={handleClick} className="nav-link" href="#">{category.title}</Link>
			</li>
    )}
    </ul>
  )
}
