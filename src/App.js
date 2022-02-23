import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductDetail from "./components/ProductDetail";
function App() {
  return (
      <div className="font-roboto">
        <Header />
        <ProductDetail/>
        <Footer />
      </div>
  )
}
export default App;
