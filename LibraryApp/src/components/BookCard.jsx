import { Link } from 'react-router-dom';

function BookCard({ book }) {

  // Render star rating as filled/empty icons
  const renderStars = (rating) => {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5
    return (
      <span className="stars">
        {'★'.repeat(full)}
        {half ? '½' : ''}
        {'☆'.repeat(5 - full - (half ? 1 : 0))}
      </span>
    )
  }

  return (
    <div className="book-card">

      {/* Book cover image */}
      <div className="book-card__cover">
        <img
          src={book.cover || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80'}
          alt={`Cover of ${book.title}`}
          loading="lazy"
        />
        {/* Category badge */}
        <span className="book-card__badge">{book.category}</span>
      </div>

      <div className="book-card__body">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">by {book.author}</p>

        {/* Star rating */}
        <div className="book-card__rating">
          {renderStars(book.rating)}
          <span className="rating-num">{book.rating.toFixed(1)}</span>
        </div>

        {/* Short description preview */}
        <p className="book-card__desc">
          {book.description.length > 100
            ? book.description.slice(0, 100) + '...'
            : book.description}
        </p>

        {/* Links to Book Details page */}
        <Link to={`/book/${book.id}`} className="btn btn--primary btn--sm">
          View Details →
        </Link>
      </div>

    </div>
  )
}

export default BookCard;
