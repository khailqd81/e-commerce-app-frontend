import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import reportWebVitals from './reportWebVitals';
import TypeProvider from './store/TypeProvider';
import ListProduct from './components/ListProduct';
import ProductDetail from './components/ProductDetail';
import ProductCart from './components/ProductCart';
ReactDOM.render(
  <React.StrictMode>
    <TypeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route path="login" element={<UserLogin signin/>}/>
            <Route path="signup" element={<UserLogin signup/>}/>
            <Route path="dien-thoai" element={<Home />} >
              <Route path=":phoneid" element={<ProductDetail />} />
              <Route index element={<ListProduct />} />
            </Route>
            <Route path="laptop" element={<Home />} >
              <Route path=":laptopid" element={<ProductDetail />} />
              <Route index element={<ListProduct />} />
            </Route>
            <Route path="tablet" element={<Home />} >
              <Route path=":tabletid" element={<ProductDetail />} />
              <Route index element={<ListProduct />} />
            </Route>
            <Route path="dong-ho-thong-minh" element={<Home />} >
              <Route path=":smartwatchid" element={<ProductDetail />} />
              <Route index element={<ListProduct />} />
            </Route>
            <Route path="cart" element={<ProductCart/>} />
            {/* <Route index element={<ListProduct />} /> */}
            <Route path="*" element={<Home />} >
              <Route path=":itemid" element={<ProductDetail />} />
              <Route index element={<ListProduct />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </TypeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
