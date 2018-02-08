import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BookAPI from './BooksAPI'
import BooksList from './BooksList'
import './App.css'

class BooksApp extends React.Component {
  state = {
    book: []
  }

  //Load All Books
  componentDidMount(){
    BookAPI.getAll().then((book)=>{
      this.setState({book})
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

    return (
      <div className="app">
          <Route exact path="/" render ={() =>(
              <div className="list-books">
                <div className="list-books-title">
                    <h1> My Reads </h1>
                </div>
                  <BooksList
                      books={ books }
                      changeShelf={ this.changeShelf }
                  />
              </div>
          )} />
      </div>
    )
  }
}

export default BooksApp
