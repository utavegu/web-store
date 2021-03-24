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

const errorStyle = {
  color: "red",
  backgroundColor: "yellow",
  textAlign: "center",
  padding: 30,
  margin: 30,
  fontSize: 26,
  fontWeight: "bold",
}

function FetchError(props) {
  return (
    <div style={errorStyle}>
      {props}
    </div>
  )
}

const setCartData = (itemList) => localStorage.setItem('cart', JSON.stringify(itemList));

const getCartData = () => JSON.parse(localStorage.getItem('cart'));

export {Preloader, FetchError, setCartData, getCartData};