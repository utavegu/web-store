import React, {useState, useRef, useContext} from 'react';
import { getCartData, setCartData, checkImage } from '../../common';
import Context from '../../contexts/Context';
import PropTypes from 'prop-types';

function ProductPageItem({item, history}) {

  const {setProductList} = useContext(Context);
  const [quantity, setQuantity] = useState(1);

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
    let isSameShoes = false;
    productList.forEach(element => {
      if (
        (element.id === productItem.id)
        &&
        (element.name === productItem.name)
        &&
        (element.price === productItem.price)
        &&
        (element.size === productItem.size)
      ) {
        isSameShoes = true;
        element.quantity += productItem.quantity;
        setCartData(productList);
        setProductList(productList);
      }
    });
    if (!isSameShoes) {
      productList.push(productItem);
      setCartData(productList);
      setProductList(productList);
    }
    history.push("/cart");
  }

  return (
    <section className="catalog-item">
			<h2 className="text-center">{item.title}</h2>
			<div className="row">
					<div className="col-5">
						<img 
              src={item.images[0]}
              className="img-fluid"
              alt={item.title}
              onError={(evt) => checkImage(evt)}
            />
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

ProductPageItem.propTypes = {
  history: PropTypes.object.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    sku: PropTypes.string,
    manufacturer: PropTypes.string,
    color: PropTypes.string,
    material: PropTypes.string,
    season: PropTypes.string,
    reason: PropTypes.string,
  }),
};

export default ProductPageItem;
