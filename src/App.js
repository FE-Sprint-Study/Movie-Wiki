import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Search from './Pages/Search';
import Category from './Pages/Category';
import MovieDetail from './Pages/MovieDetail';
import NotFound from './Pages/NotFound';

function App() {
  const id = useSelector(state => state.ID.id);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category" element={<Category />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {id && <MovieDetail />}
    </div>
  );
}

export default App;
