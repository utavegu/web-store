import Banner from './components/Banner/Banner.jsx';
import Catalog from './components/Catalog/Catalog.jsx';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import MainPage from './components/MainPage/MainPage.jsx';
import AboutPage from './components/AboutPage/AboutPage.jsx'
import ContactsPage from './components/ContactsPage/ContactsPage.jsx'
import Wrapper from './components/Wrapper/Wrapper.jsx';
import Page404 from './components/Page404/Page404.jsx';
import Cart from './components/Cart/Cart.jsx';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Provider from './provider/Provider';
import ProductPage from './components/ProductPage/ProductPage.jsx';

function WebStore() {
  return (
    <Provider>
      <Router>
        <Header />
        <Wrapper>
          <Banner />
          <Switch>
            <Route path="/catalog" component={Catalog} exact />
            <Route path="/catalog/:id([0-9]+)?" component={ProductPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contacts" component={ContactsPage} />
            <Route path="/cart" component={Cart} />
            <Route path="/" exact component={MainPage} />
            <Route path="*" component={Page404} />
          </Switch>
        </Wrapper>
        <Footer />
      </Router>
    </Provider>
  );
}

export default WebStore;
