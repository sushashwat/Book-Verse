import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addBook } from '../store/booksSlice'
import { categories } from '../data/books'

// Empty form initial state
const EMPTY_FORM = {
  title: '',
  author: '',
  category: '',
  description: '',
  rating: '',
  year: '',
  pages: '',
  cover: '',
}

function AddBookPage() {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()

  // Form values
  const [formData, setFormData]   = useState(EMPTY_FORM)
  // Validation errors
  const [errors, setErrors]       = useState({})
  // Success state
  const [submitted, setSubmitted] = useState(false)

  // Update form field on change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // Validate all fields and return errors object
  const validate = () => {
    const newErrors = {}

    if (!formData.title.trim())
      newErrors.title = 'Title is required.'

    if (!formData.author.trim())
      newErrors.author = 'Author is required.'

    if (!formData.category)
      newErrors.category = 'Please select a category.'

    if (!formData.description.trim())
      newErrors.description = 'Description is required.'
    else if (formData.description.trim().length < 20)
      newErrors.description = 'Description must be at least 20 characters.'

    const ratingNum = parseFloat(formData.rating)
    if (!formData.rating)
      newErrors.rating = 'Rating is required.'
    else if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5)
      newErrors.rating = 'Rating must be between 1.0 and 5.0.'

    if (formData.year) {
      const y = parseInt(formData.year)
      if (isNaN(y) || y < 1000 || y > new Date().getFullYear())
        newErrors.year = `Year must be between 1000 and ${new Date().getFullYear()}.`
    }

    if (formData.pages) {
      const p = parseInt(formData.pages)
      if (isNaN(p) || p < 1)
        newErrors.pages = 'Pages must be a positive number.'
    }

    return newErrors
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()

    // If errors exist stop submission and show them
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Dispatch addBook action to Redux store
    dispatch(addBook({
      ...formData,
      year:  formData.year  ? parseInt(formData.year)  : null,
      pages: formData.pages ? parseInt(formData.pages) : null,
    }))

    setSubmitted(true)

    // Redirect to Browse Books after 1.2 seconds
    setTimeout(() => navigate('/books'), 1200)
  }

  return (
    <div className="page add-page">
      <div className="add-page__inner">

        {/* ── Page Header ── */}
        <div className="page-header">
          <h1 className="page-header__title">Add a New Book</h1>
          <p className="page-header__subtitle">
            Share a great read with the community
          </p>
        </div>

        {/* ── Success Banner ── */}
        {submitted && (
          <div className="success-banner">
            ✅ Book added successfully! Redirecting to Browse…
          </div>
        )}

        {/* ── Form ── */}
        <form className="add-form" onSubmit={handleSubmit} noValidate>

          {/* Title */}
          <div className={`form-group ${errors.title ? 'form-group--error' : ''}`}>
            <label htmlFor="title">
              Book Title <span className="required">*</span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. The Great Gatsby"
            />
            {errors.title && <span className="error-msg">{errors.title}</span>}
          </div>

          {/* Author */}
          <div className={`form-group ${errors.author ? 'form-group--error' : ''}`}>
            <label htmlFor="author">
              Author <span className="required">*</span>
            </label>
            <input
              id="author"
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g. F. Scott Fitzgerald"
            />
            {errors.author && <span className="error-msg">{errors.author}</span>}
          </div>

          {/* Category */}
          <div className={`form-group ${errors.category ? 'form-group--error' : ''}`}>
            <label htmlFor="category">
              Category <span className="required">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category…</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="error-msg">{errors.category}</span>}
          </div>

          {/* Description */}
          <div className={`form-group ${errors.description ? 'form-group--error' : ''}`}>
            <label htmlFor="description">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a brief synopsis or review…"
            />
            {errors.description && <span className="error-msg">{errors.description}</span>}
          </div>

          {/* Rating */}
          <div className={`form-group ${errors.rating ? 'form-group--error' : ''}`}>
            <label htmlFor="rating">
              Rating (1.0 – 5.0) <span className="required">*</span>
            </label>
            <input
              id="rating"
              type="number"
              name="rating"
              min="1"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              placeholder="e.g. 4.5"
            />
            {errors.rating && <span className="error-msg">{errors.rating}</span>}
          </div>

          {/* Year and Pages - two columns */}
          <div className="form-row">
            <div className={`form-group ${errors.year ? 'form-group--error' : ''}`}>
              <label htmlFor="year">Publication Year</label>
              <input
                id="year"
                type="number"
                name="year"
                min="1000"
                max={new Date().getFullYear()}
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g. 2021"
              />
              {errors.year && <span className="error-msg">{errors.year}</span>}
            </div>

            <div className={`form-group ${errors.pages ? 'form-group--error' : ''}`}>
              <label htmlFor="pages">Number of Pages</label>
              <input
                id="pages"
                type="number"
                name="pages"
                min="1"
                value={formData.pages}
                onChange={handleChange}
                placeholder="e.g. 320"
              />
              {errors.pages && <span className="error-msg">{errors.pages}</span>}
            </div>
          </div>

          {/* Cover URL - optional */}
          <div className="form-group">
            <label htmlFor="cover">
              Cover Image URL <span className="optional">(optional)</span>
            </label>
            <input
              id="cover"
              type="url"
              name="cover"
              value={formData.cover}
              onChange={handleChange}
              placeholder="https://…"
            />
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => setFormData(EMPTY_FORM)}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn btn--primary btn--lg"
              disabled={submitted}
            >
              {submitted ? 'Adding…' : '+ Add Book'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddBookPage