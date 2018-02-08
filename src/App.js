import React from 'react'
import { Route } from 'react-router-dom'
import * as BookAPI from './BooksAPI'
import BooksList from './BooksList'

// import * as BooksAPI from './BooksAPI'
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

  render() {

    //get books from api
    const {books} = this.state

    return (
      <div className="app">
          <BooksList
              books={ books }
          />
      </div>
    )
  }
}

export default BooksApp
