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

export {Preloader, FetchError};