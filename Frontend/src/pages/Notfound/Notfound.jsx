import React from 'react'
import { Link } from 'react-router'
import './found.css'
import Header from '../../Componenet/Header'

function NotFound() {
return (
<>
<title>Not Found</title>
<Header/>
<div className="not-found-page">
<div className="not-found-content">
<div className="not-found-code">404</div>

    <h1>Page Not Found</h1>

    <p>
      Sorry, the page you are looking for doesn't exist
      or may have been moved.
    </p>

    <Link to="/" className="home-button">
      Go Back Home
    </Link>
  </div>
</div>
</>


)
}

export default NotFound