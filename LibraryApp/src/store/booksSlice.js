import {createSlice} from '@reduxjs/toolkit'
import { initialBooks } from '../data/books'

const booksSlice = createSlice({
    name:'books',
    initialState: {
        list: initialBooks,
    },

    reducers:{
     addBook:(state,action)=>{
        const newBook ={
            ...action.payload,
            id: Date.now(),
            popular: false,
            rating: parseFloat(action.payload.rating) || 4.0,
        }
        state.list.unshift(newBook)
     },
    },
})

export const {addBook} = booksSlice.actions
export default booksSlice.reducer

// Selectors

export const selectAllBooks =  (state) => state.books.list
export const selectPopularBooks = (state)=> state.books.list.filter((b)=> b.popular)
export const selectBooksById = (id) => (state)=> state.book.list.find((b) => b.id ===Number (id))

export const selectBooksByCategory = (cat) => (state) =>
    cat && cat !== 'All'
    ?state.books.list.filter((b) => b.category.toLowerCase() === cat.toLowerCase ())
    : state.books.list
    