import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPopularBooks } from '../store/booksSlice';
import BookCard from '../components/BookCard';
import { categories } from '../data/books';

// Icons for each category
const categoryIcons = {
  Fiction:      '📖',
  'Non-Fiction': '📰',
  'Sci-Fi':     '🚀',
  Fantasy:      '🧙',
  Mystery:      '🔍',
  Romance:      '💌',
  Biography:    '👤',
  History:      '🏛️',
}

function HomePage() {
  // Get only popular books from Redux store
  const popularBooks = useSelector(selectPopularBooks)

  return (
    <div className="page home-page">

      {/* ── Hero Section ── */}
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Welcome to Bibliotheca</p>
          <h1 className="hero__title">
            Discover Your Next<br />
            <em>Great Read</em>
          </h1>
          <p className="hero__subtitle">
            Explore thousands of books across every genre. Find classics,
            hidden gems, and the latest bestsellers — all in one place.
          </p>
          <div className="hero__actions">
            <Link to="/books" className="btn btn--primary btn--lg">
              Browse Library
            </Link>
            <Link to="/add-book" className="btn btn--outline btn--lg">
              Add a Book
            </Link>
          </div>
        </div>

        {/* Decorative book stack */}
        <div className="hero__visual">
          <div className="book-stack">
            <div className="book-stack__item book-stack__item--1"></div>
            <div className="book-stack__item book-stack__item--2"></div>
            <div className="book-stack__item book-stack__item--3"></div>
          </div>
        </div>
      </section>

      {/* ── Categories Section ── */}
      <section className="section categories-section">
        <h2 className="section__title">Browse by Category</h2>
        <p className="section__subtitle">Pick a genre and dive in</p>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/books/${cat.toLowerCase().replace(/\s+/, '-')}`}
              className="category-chip"
            >
              <span className="category-chip__icon">{categoryIcons[cat] || '📚'}</span>
              <span className="category-chip__label">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Popular Books Section ── */}
      <section className="section popular-section">
        <div className="section__header">
          <div>
            <h2 className="section__title">Popular Books</h2>
            <p className="section__subtitle">Hand-picked favourites readers love</p>
          </div>
          <Link to="/books" className="btn btn--ghost">View All →</Link>
        </div>
        <div className="books-grid">
          {popularBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

    </div>
  )
}

export default HomePage;