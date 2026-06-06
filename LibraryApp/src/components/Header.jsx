import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => setMenuOpen((prev) => !prev)
    const closeMenu = () => setMenuOpen(false)

    return (
        < header className="header">
            <div className="header-inner">
                {/* Brand Logo */}
                <Link to="/" className="logo" onClick={closeMenu}>

                    <span className="logo-icon">📚</span>
                    <span className="logo-text">BookVerse</span>
                </Link>

                {/* Navigation Links */}
                <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        onClick={closeMenu}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/books"
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        onClick={closeMenu}
                    >
                        Browse Books
                    </NavLink>
                    <NavLink
                        to="/add-book"
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        onClick={closeMenu}
                    >
                        Add Book
                    </NavLink>
                </nav>

                {/* Hamburger button — mobile only */}
                <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
                    <span className={`ham-bar ${menuOpen ? 'open' : ''}`}></span>
                    <span className={`ham-bar ${menuOpen ? 'open' : ''}`}></span>
                    <span className={`ham-bar ${menuOpen ? 'open' : ''}`}></span>
                </button>

            </div>
        </header>
    )
}

export default Header