import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout'
import Homepage from './pages/HomePage'
import BrowseBookspage from './pages/BrowseBooksPage'
import BookDetailsPage from './pages/BookDetailsPage'
import AddBookPage from './pages/AddBookPage'
import NotFoundPage from './pages/NotFoundPage'

function App(){
  return(
    <Routes>
      {/* All main pages use Layout wrapper (includes Header) */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BrowseBooksPage />} />
        <Route path="/books/:category" element={<BrowseBooksPage />} />
        <Route path="/book/:id" element={<BookDetailsPage />} />
        <Route path="/add-book" element={<AddBookPage />} />
      </Route>

      {/* 404 page is outside Layout so it has no Header */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
