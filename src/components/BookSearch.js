// src/components/BookSearch.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./BookSearch.module.css";

const BookSearch = () => {
  const [query, setQuery] = useState("Bharat");
  const [books, setBooks] = useState([]);
  const [bookshelf, setBookshelf] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(storedBookshelf);
    fetchBooks(query);
  }, [query]);

  const fetchBooks = (query) => {
    if (query.length > 2) {
      axios
        .get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
        .then((response) => {
          setBooks(response.data.docs);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  };

  const handleAddToBookshelf = (book) => {
    let updatedBookshelf = [...bookshelf];
    if (!updatedBookshelf.some((item) => item.key === book.key)) {
      updatedBookshelf.push(book);
      localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
      setBookshelf(updatedBookshelf);
    }
  };

  const goToBookshelf = () => {
    navigate("/bookshelf");
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search for books"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className={styles.bookResults}>
        {books.map((book) => (
          <div key={book.key} className={styles.bookCard}>
            <h3>{book.title}</h3>
            <p>
              {book.author_name
                ? book.author_name.join(", ")
                : "Unknown Author"}
            </p>
            {bookshelf.some((item) => item.key === book.key) ? (
              <button onClick={goToBookshelf}>Go to Bookshelf</button>
            ) : (
              <button onClick={() => handleAddToBookshelf(book)}>
                Add to Bookshelf
              </button>
            )}
          </div>
        ))}
      </div>
      <button className={styles.goToBookshelf} onClick={goToBookshelf}>
        Go to My Bookshelf
      </button>
    </div>
  );
};

export default BookSearch;
