import Banner from './components/Banner/Banner.jsx';
import Catalog from './components/Catalog/Catalog.jsx';
import Footer from './components/Footer/Footer.jsx';
import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';
import TopSales from './components/TopSales/TopSales.jsx';

function WebStore() {
  return (
    <>
      <Header />
      <Main>
        <Banner />
        <TopSales />
        <Catalog />
      </Main>
      <Footer />
    </>
  );
}

export default WebStore;
