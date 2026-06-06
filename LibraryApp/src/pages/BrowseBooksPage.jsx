import {useState,useMemo} from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllBooks } from '../store/booksSlice'
import BookCard from '../components/BookCard'
import { categories } from '../data/books'

function BrowseBooksPage() {
  // Get category from URL e.g. /books/fiction
  const { category } = useParams()

  // Search input state
  const [searchQuery, setSearchQuery] = useState('')

  // Get all books from Redux store
  const allBooks = useSelector(selectAllBooks)

  // Match URL param to actual category name
  const activeCategory = category
    ? categories.find(
        (c) => c.toLowerCase().replace(/\s+/, '-') === category.toLowerCase()
      ) || category
    : 'All'

  // Filter books by category and search query
  const filteredBooks = useMemo(() => {
    let books = allBooks

    // Step 1 — filter by category
    if (activeCategory && activeCategory !== 'All') {
      books = books.filter(
        (b) => b.category.toLowerCase() === activeCategory.toLowerCase()
      )
    }

    // Step 2 — filter by search query (title or author)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      books = books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      )
    }

    return books
  }, [allBooks, activeCategory, searchQuery])

  return (
    <div className="page browse-page">

      {/* ── Page Header ── */}
      <div className="page-header">
        <h1 className="page-header__title">
          {activeCategory === 'All' ? 'All Books' : `${activeCategory} Books`}
        </h1>
        <p className="page-header__subtitle">
          {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="browse-layout">

        {/* ── Sidebar: Category Filter ── */}
        <aside className="browse-sidebar">
          <h3 className="sidebar__title">Categories</h3>
          <ul className="sidebar__list">

            {/* All books option */}
            <li>
              <Link
                to="/books"
                className={`sidebar__item ${!category ? 'sidebar__item--active' : ''}`}
              >
                All Books
              </Link>
            </li>

            {/* Individual categories */}
            {categories.map((cat) => (
              <li key={cat}>
                <Link
                  to={`/books/${cat.toLowerCase().replace(/\s+/, '-')}`}
                  className={`sidebar__item ${
                    activeCategory.toLowerCase() === cat.toLowerCase()
                      ? 'sidebar__item--active'
                      : ''
                  }`}
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* ── Main Content ── */}
        <div className="browse-main">

          {/* ── Search Bar ── */}
          <div className="search-bar">
            <span className="search-bar__icon">🔍</span>
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar__input"
            />
            {/* Clear button — only shows when something is typed */}
            {searchQuery && (
              <button
                className="search-bar__clear"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          {/* ── Books Grid or Empty State ── */}
          {filteredBooks.length > 0 ? (
            <div className="books-grid">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state__icon">📭</p>
              <h3>No books found</h3>
              <p>Try adjusting your search or picking a different category.</p>
              <button
                className="btn btn--outline"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default BrowseBooksPage;