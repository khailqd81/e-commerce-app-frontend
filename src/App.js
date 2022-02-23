import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListProduct from "./components/ListProduct";
function App() {
  return (
    <BrowserRouter>
      <div className="font-roboto">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dien-thoai" element={<ListProduct categoryName="Điện thoại" />} />
          <Route path="/laptop" element={<ListProduct />} />
          <Route path="/tablet" element={<ListProduct />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>

  )
}
export default App;
