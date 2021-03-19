import React, {useState, useEffect, useRef} from 'react';

/* 
- Так, вот надо, чтобы при заходе на эту страницу логотип не отваливался...

- Тут вообще обёртка из каталог итема должна бы быть всегда, а прелоадер показывать внутри неё... В принципе в качестве костыля данному прелоадеру можно задать фиксированную высоту, равную высоте секции. Через инлайн стили. И чтобы ещё прямо в центре секции крутился

- После нажатия на кнопку "В корзину" пользователь перемещается в страницу корзины /cart.html.
(вот тут наверное запихивание в локалстрорэдж уже и пойдёт)

- По уму надо бы содержимое секшена в отдельный компонент вынести, а то проблемы с отображением прелоадера и ошибки
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
  const [quantity, setQuantity] = useState(1);

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

  const addToCartButton = useRef(null);
  const quantityModule = useRef(null);

  const handleIncrement = () => {
    setQuantity(prevQuantity=> prevQuantity + 1);
    if (quantity >= 10) setQuantity(10);
  }

  const handleDecrement = () => {
    setQuantity(prevQuantity => prevQuantity - 1);
    if (quantity <= 0) setQuantity(0);
  }

  const handleClick = () => {
    if (addToCartButton.current.hasAttribute("disabled")) addToCartButton.current.removeAttribute("disabled");
    if (quantityModule.current.style.visibility === "hidden") quantityModule.current.style.visibility = "visible";
  }

  // ВРЕМЕННО
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
                      <p key={item.size} style={{display: "inline"}}>
                        <input className="catalog-item-radio visually-hidden" id={item.size} type="radio" name="sizes"/>
                        <label onClick={handleClick} className="catalog-item-size" htmlFor={item.size}>{item.size}</label>
                      </p> 
                    )
                  }
								</p>
								<p ref={quantityModule} style={{visibility: "hidden"}}>Количество:
									<span className="btn-group btn-group-sm pl-2">
										<button onClick={handleDecrement} className="btn btn-secondary">-</button>
										<span className="btn btn-outline-primary">{quantity}</span>
										<button onClick={handleIncrement}  className="btn btn-secondary">+</button>
									</span>
								</p>
							</div>
							<button ref={addToCartButton} className="btn btn-danger btn-block btn-lg" disabled>В корзину</button>
					</div>
			</div>
		</section>
  )
}
