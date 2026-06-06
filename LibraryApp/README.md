 📚 BookVerse — Online Library System

A full-featured online library system built as a React assignment.
It allows users to browse books, search by title or author,
view book details, and add new books to the library.

---

## 🛠️ Tech Stack

- **Vite** — used to set up and run the React project
- **React 18** — for building the user interface
- **React Router v6** — for navigating between pages without reloading
- **Redux Toolkit** — for managing the books list globally across all pages
- **react-redux** — connects React components to the Redux store
- **CSS** — custom styling with CSS variables for colors and fonts

---

## 📁 Project Structure
src/
├── components/
│   ├── Layout.jsx         → wraps all pages with Header and Footer
│   ├── Header.jsx         → navigation bar (Home, Browse Books, Add Book)
│   └── BookCard.jsx       → reusable card shown in book grids
│
├── pages/
│   ├── HomePage.jsx       → landing page with hero, categories, popular books
│   ├── BrowseBooksPage.jsx→ all books with category filter and search bar
│   ├── BookDetailsPage.jsx→ full info for a single book
│   ├── AddBookPage.jsx    → form to add a new book with validation
│   └── NotFoundPage.jsx   → 404 page showing the invalid URL
│
├── store/
│   ├── store.js           → Redux store setup
│   └── booksSlice.js      → books state, addBook action, and selectors
│
├── data/
│   └── books.js           → seed data (12 books + categories list)
│
├── styles/
│   └── global.css         → all styles in one file
│
├── App.jsx                → all route definitions
└── main.jsx               → entry point, sets up Redux and Router

---

## 📄 Pages Explained

### 1. Home Page ( / )
- Shows a welcome hero section with two buttons
- Lists all book categories as clickable chips
- Each category chip links to /books/:category
- Shows popular books in a card grid

### 2. Browse Books Page ( /books or /books/:category )
- Shows all books or filters by category from the URL
- Has a search bar to filter books by title or author
- Each book card has a View Details button
- Shows empty state when no books match

### 3. Book Details Page ( /book/:id )
- Shows full info — title, author, description, rating
- Shows year, pages, and category as pills
- Has a Back to Browse button
- Shows not found message if book doesn't exist

### 4. Add Book Page ( /add-book )
- Form with fields — title, author, category, description,
  rating, year, pages, cover URL
- Validates all required fields before submitting
- Uses Redux to add the new book to the top of the list
- Redirects to Browse Books after success

### 5. 404 Page ( any unknown route )
- Does not show the Header
- Displays the invalid URL the user typed
- Has a link back to the Home page

---

## 🚀 How to Run

### Step 1 — Clone the repository
git clone https://github.com/sushashwat/Book-Verse
cd online-library-system

### Step 2 — Install dependencies
npm install

### Step 3 — Start the development server
npm run dev

### Step 4 — Open in browser
http://localhost:5173

---

## 🏗️ Build for Production

npm run build
npm run preview

---

## 💡 How Redux Works in This Project

1. books.js has the initial list of 12 books
2. booksSlice.js loads that list as the initial Redux state
3. store.js registers the slice
4. main.jsx wraps the app in Provider so all components can access it
5. Components use useSelector to read books from the store
6. AddBookPage uses useDispatch to add a new book to the store
7. The new book appears at the top of the Browse Books page

---

## ✅ Features Checklist

- [x] Home page with hero, categories and popular books
- [x] Browse books with category filter via URL
- [x] Search books by title or author
- [x] View full book details
- [x] Add a new book with form validation
- [x] Redux state management
- [x] 404 page with invalid URL display
- [x] Responsive design for mobile and desktop

## GITHUB Repo Link - https://github.com/sushashwat/Book-Verse