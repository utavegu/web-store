import React, {useState, useEffect, useRef} from 'react';
import { getCartData, Preloader, setCartData } from '../../common';

export default function ProductPage({match, history}) {  
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
  let selectedSize = useRef(null);

  const handleIncrement = () => {
    setQuantity(prevQuantity=> prevQuantity + 1);
    if (quantity >= 10) setQuantity(10);
  }

  const handleDecrement = () => {
    setQuantity(prevQuantity => prevQuantity - 1);
    if (quantity <= 0) setQuantity(0);
  }

  const handleChoice = ({target}) => {
    selectedSize.current = target.textContent;
    if (addToCartButton.current.style.visibility === "hidden") addToCartButton.current.style.visibility = "visible";
    if (quantityModule.current.style.visibility === "hidden") quantityModule.current.style.visibility = "visible";
  }

  const handleAdd = () => {
    const productList = getCartData() || [];
    const productItem = {
      id: item.id,
      name: item.title,
      price: item.price,
      size: selectedSize.current,
      quantity,
    }
    productList.push(productItem);
    setCartData(productList);
    history.push("/cart");
  }

  return (
    (!item)
    ?
    Preloader()
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
								<div>Размеры в наличии: 
                  {item.sizes
                    .filter(size => size.avalible)
                    .map(item =>
                      <p key={item.size} style={{display: "inline-block"}}>
                        <input className="catalog-item-radio visually-hidden" id={item.size} type="radio" name="sizes"/>
                        <label onClick={handleChoice} className="catalog-item-size" htmlFor={item.size}>{item.size}</label>
                      </p> 
                    )
                  }
								</div>
								<p ref={quantityModule} style={{visibility: "hidden"}}>Количество:
									<span className="btn-group btn-group-sm pl-2">
										<button onClick={handleDecrement} className="btn btn-secondary">-</button>
										<span className="btn btn-outline-primary">{quantity}</span>
										<button onClick={handleIncrement}  className="btn btn-secondary">+</button>
									</span>
								</p>
							</div>
							<button onClick={handleAdd} ref={addToCartButton} style={{visibility: "hidden"}} className="btn btn-danger btn-block btn-lg">В корзину</button>
					</div>
			</div>
		</section>
  )
}
