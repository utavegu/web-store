import React, {useState, useEffect} from 'react';

/* 
  Так, вот надо, чтобы при заходе на эту страницу логотип не отваливался...
*/
/* 
  Так, вот тут вообще обёртка из каталог итема должна бы быть всегда, а прелоадер показывать внутри неё... В принципе в качестве костыля данному прелоадеру можно задать фиксированную высоту, равную высоте секции. Через инлайн стили. И чтобы ещё прямо в центре секции крутился
*/

/*
ЗАКАЗ ТОВАРА
6) Размеры - выводятся все доступные размеры (у которых флаг available равен true). По умолчанию ни один размер не выбран. После выбора он становится выделенным, как на скриншоте. 

!!! Важно: кнопка "В корзину" активируется только тогда, когда есть размеры в наличии и выбран конкретный размер. Размер можно выбрать только один !!!

Выбор размеров реализовать чекбоксами
7) Количество - от 1 до 10. (ну это тупо инкремент и декремент, с блоком кнопки, если 0 или 10)
8) Если ни одного размера не доступно, блок Количество и кнопка "В корзину" не отображаются.
9) После нажатия на кнопку "В корзину" пользователь перемещается в страницу корзины /cart.html.
(вот тут наверное запихивание в локалстрорэдж уже и пойдёт)
*/

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

export default function ProductPage({match}) {
  

  const itemUrl = `http://localhost:7070/api/items/${match.params.id}`;

  const [item, setItem] = useState(null);
  const [itemError, setItemError] = useState(null);

  useEffect(
		() => {
			const fetchData = async () => {
				try {
					const response = await fetch(itemUrl);
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					const data = await response.json();
					setItem(data);
					setItemError(null);
				} 
				catch (e) {
					setItemError(e);
					console.dir(e.message);
				} 
			};
			fetchData();
		},
		[itemUrl]
	);

  const handleClick = () => {
    console.log("Разблокировка кнопки 'В корзину'");
  }

  // ВРЕМЕННО
  // 1) Через useRef достаём кнопку "В корзину"
  // 2) И в хэндл-клике проверяем, что если она дисаблед (вспомни на вебрефе как там правильно), то тогда её енаблед (дисаблед фолс)

  // if (item) item.sizes.forEach(size => {
  //   size.avalible = false;
  // });

  return (
    (!item)
    ?
    <Preloader />
    :
		<section className="catalog-item">
      
			<h2 className="text-center">{item.title}</h2>
			<div className="row">
					<div className="col-5">
						<img src={item.images[0]}
									className="img-fluid" alt="" />
					</div>
					<div className="col-7">
						<table className="table table-bordered">
							<tbody>
								<tr>
									<td>Артикул</td>
									<td>{item.sku}</td>
								</tr>
								<tr>
									<td>Производитель</td>
									<td>{item.manufacturer}</td>
								</tr>
								<tr>
									<td>Цвет</td>
									<td>{item.color}</td>
								</tr>
								<tr>
									<td>Материалы</td>
									<td>{item.material}</td>
								</tr>
								<tr>
									<td>Сезон</td>
									<td>{item.season}</td>
								</tr>
								<tr>
									<td>Повод</td>
									<td>{item.reason}</td>
								</tr>
							</tbody>
						</table>
							<div className="text-center">
								<p>Размеры в наличии: 

                  {item.sizes
                    .filter(size => size.avalible)
                    .map(item =>
                      <span key={item.size}>
                        <input className="catalog-item-radio visually-hidden" id={item.size} type="radio" name="sizes"/>
                        <label onClick={handleClick} className="catalog-item-size" htmlFor={item.size}>{item.size}</label>
                      </span> 
                      // Я маэстро семантики...
                    )
                  }

								</p>
								<p>Количество:
									<span className="btn-group btn-group-sm pl-2">
										<button className="btn btn-secondary">-</button>
										<span className="btn btn-outline-primary">1</span>
										<button className="btn btn-secondary">+</button>
									</span>
								</p>
							</div>
							<button className="btn btn-danger btn-block btn-lg" disabled>В корзину</button>
					</div>
			</div>
		</section>
  )
}
