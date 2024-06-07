// src/components/BookSearch.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookSearch = () => {
  const [query, setQuery] = useState("Bharat"); // Set your default search term here
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [query]);

  const handleAddToBookshelf = (book) => {
    let bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    if (!bookshelf.some((item) => item.key === book.key)) {
      bookshelf.push(book);
      localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for books"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="book-results">
        {books.map((book) => (
          <div key={book.key} className="book-card">
            <h3>{book.title}</h3>
            <p>
              {book.author_name
                ? book.author_name.join(", ")
                : "Unknown Author"}
            </p>
            <button onClick={() => handleAddToBookshelf(book)}>
              Add to Bookshelf
            </button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/bookshelf")}>Go to My Bookshelf</button>
    </div>
  );
};

export default BookSearch;
