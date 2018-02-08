import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component{

    static propTypes = {
        book: PropTypes.array.isRequired,
        books: PropTypes.array.isRequired,
        key : PropTypes.array.isRequired
    }

    render (){
        const {book, books, key } = this.props
        const coverImg = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noCover
        const title = book.title ? book.title : "No title available"

        return(
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{backgroundImage: `url(${coverImg})`}}>

                        </div>
                    </div>
                </div>
            </li>
        )

    }
}

export default Book