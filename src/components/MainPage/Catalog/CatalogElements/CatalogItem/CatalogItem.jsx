import React from 'react';

export default function CatalogItem({item}) {

  let imageLink = item.images[0];
  // Если 0 - первое не грузится
  // Если 1 - третье и шестое
  // И помни, что отрисовка идёт 2 раза почему-то! (кстати, почему?) то есть результат 1 равен результату 7 и т.д
  // Итого, когда разберешься, по умолчанию имэйджЛинк - это нулевой элемент массива. Но если он возвращает реджектед - тогда первый

  // Вот в принципе эта штука работает и потрать уже время, чтобы осознать промисы...
  function getImage(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(url);
      img.src = url;
    });
  }

  // console.log(getImage(imageLink));

	/*
	1) Задача 1 - понимать, что ссылка 404 и тогда грузить другой элемент массива имэйджс (истина где-то рядом... промисы)
	2) Все картинки одного размера - манипуляции с хейгхт, видтх в цсс и установкой их в атрибутах
	*/

	return (
		<div className="col-4">
			<div className="card catalog-item-card">
				<img src={imageLink}
						className="card-img-top img-fluid" alt={item.title} />
				<div className="card-body">
					<p className="card-text">{item.title}</p>
					<p className="card-text">{item.price}</p>
					<a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
				</div>
			</div>
		</div>
	)
}
