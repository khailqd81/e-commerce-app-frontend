import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import TypeProvider from './store/TypeProvider';
ReactDOM.render(
  <React.StrictMode>
    <TypeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route path="dien-thoai" element={<Home />} />
            <Route path="laptop" element={<Home />} />
            <Route path="tablet" element={<Home />} />
            <Route path="dong-ho-thong-minh" element={<Home />} />
            <Route index element={<Home />} />
            <Route path="*" element={<Home />}/>
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
