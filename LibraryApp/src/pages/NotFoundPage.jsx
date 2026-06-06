import { Link, useLocation } from 'react-router-dom'

function NotFoundPage() {
  // Get the current invalid URL to display it
  const location = useLocation()

  return (
    <div className="not-found-page">
      <div className="not-found-page__inner">

        {/* Large 404 text */}
        <p className="not-found__code">404</p>

        <h1 className="not-found__title">Page Not Found</h1>

        {/* Display the invalid URL */}
        <p className="not-found__url">
          The route <code>{location.pathname}</code> does not exist.
        </p>

        <p className="not-found__message">
          Looks like you wandered into the restricted stacks.
          Let's get you back to familiar territory.
        </p>

        {/* Link back to Home page */}
        <Link to="/" className="btn btn--primary btn--lg">
          ← Back to Home
        </Link>

      </div>
    </div>
  )
}

export default NotFoundPage;