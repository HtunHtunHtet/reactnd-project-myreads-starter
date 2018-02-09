import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeShelf : PropTypes.func.isRequired
    }

    state = {
        query :'',
        newBooks : [],
        searchErr:false
    }

    getBooks = (event) =>{
        const query = event.target.value.trim()
        this.setState ({query: query})

        //find book base on user import
        if (query){
            BooksAPI.search(query, 20).then((books) =>{
                books.length > 0 ? this.setState({newBooks: books, searchErr: false}) : this.setState({newBooks: [], searchErr:true})
            })
        }else this.setState({ newBooks:[] , searchErr: false })
    }

    render() {
        const { query, newBooks, searchErr} = this.state
        const { books, changeShelf } = this.props

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search By Title Or Author"
                            value={query}
                            onChange={this.getBooks}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    { newBooks.length > 0 &&(
                        <div>
                            <div className=''>
                                <h3>Search returned {newBooks.length} books</h3>
                            </div>
                            <ol className="books-grid">
                                {newBooks.map((book) => (
                                    <Book book={ book } key={book.id} books={ books } changeShelf={ changeShelf }/>
                                ))}
                            </ol>
                        </div>
                    )}
                    { searchErr && (
                        <div>
                            <div className=''>
                                <h3>0 books found. try again</h3>
                            </div>
                        </div>
                    )
                    }


                </div>
            </div>
        )
    }
}

export default Search