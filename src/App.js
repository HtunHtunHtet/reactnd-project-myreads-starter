import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BookAPI from './BooksAPI'
import BooksList from './BooksList'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  //Load All Books
  componentDidMount(){
    BookAPI.getAll().then((books)=>{
      this.setState({books})
    })
  }

  //change shelf state
  changeShelf = (newBook , newShelf) =>{
    BookAPI.update(newBook,newShelf).then(response=>{

      //update shelf
      newBook.shelf = newShelf

      let updatedBooks = this.state.books.filter(book => book.id !== newBook.id)

      //add book
      updatedBooks.push (newBook);
      this.setState({ books: updatedBooks})

    })
  }

  render() {

    //get books from api
    const {books} = this.state

     //console check for books
    // console.log ({books});

    return (
      <div className="app">
          <Route
              path="/search"
              render={() => (
                  <Search
                    books={books}
                    changeShelf={this.changeShelf}
                  />
              )}
          />
          <Route exact  path="/" render={() => (
              <div className="list-books">
                  <div className="list-books-title">
                      <h1>MyReads</h1>
                  </div>
                  <BooksList books={ books } changeShelf={ this.changeShelf }/>
                  <div className="open-search">
                      <Link to="/search">Search</Link>
                  </div>
              </div>
          )} />
      </div>
    )
  }
}

export default BooksApp
