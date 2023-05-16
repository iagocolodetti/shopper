import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './pages/main';

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Main/>} />
      </Routes>
    </BrowserRouter>
  );
}