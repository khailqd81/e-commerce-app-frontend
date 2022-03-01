import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCart from "./components/ProductCart";
function App() {
  return (
      <div className="font-roboto">
        <Outlet/>
      </div>
  )
}
export default App;
