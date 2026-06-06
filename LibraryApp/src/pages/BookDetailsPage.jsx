import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectBookById } from '../store/booksSlice'

function BookDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Find the book in Redux store by id
  const book = useSelector(selectBookById(id))

  // Render star rating
  const renderStars = (rating) => {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5
    return (
      <span className="detail-stars">
        {'★'.repeat(full)}
        {half ? '½' : ''}
        {'☆'.repeat(5 - full - (half ? 1 : 0))}
      </span>
    )
  }

  // If book not found show this
  if (!book) {
    return (
      <div className="page">
        <div className="empty-state">
          <p className="empty-state__icon">📕</p>
          <h2>Book Not Found</h2>
          <p>This book doesn't exist in our library.</p>
          <Link to="/books" className="btn btn--primary">
            Back to Browse
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page details-page">

      {/* ── Back Button ── */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Browse
      </button>

      <div className="details-layout">

        {/* ── Book Cover ── */}
        <div className="details-cover">
          <img
            src={book.cover || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80'}
            alt={`Cover of ${book.title}`}
          />
          <span className="details-cover__badge">{book.category}</span>
        </div>

        {/* ── Book Info ── */}
        <div className="details-info">
          <h1 className="details-info__title">{book.title}</h1>
          <p className="details-info__author">by <strong>{book.author}</strong></p>

          {/* Rating */}
          <div className="details-info__rating">
            {renderStars(book.rating)}
            <span className="details-info__rating-num">
              {book.rating.toFixed(1)} / 5.0
            </span>
          </div>

          {/* Meta info */}
          <div className="details-meta">
            {book.year  && <span className="meta-pill">📅 {book.year}</span>}
            {book.pages && <span className="meta-pill">📄 {book.pages} pages</span>}
            <span className="meta-pill">🏷️ {book.category}</span>
          </div>

          {/* Full description */}
          <div className="details-info__desc">
            <h3>About this Book</h3>
            <p>{book.description}</p>
          </div>

          {/* Action buttons */}
          <div className="details-info__actions">
            <Link to="/books" className="btn btn--outline">
              ← Back to Browse
            </Link>
            <Link
              to={`/books/${book.category.toLowerCase().replace(/\s+/, '-')}`}
              className="btn btn--ghost"
            >
              More {book.category} Books
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BookDetailsPage