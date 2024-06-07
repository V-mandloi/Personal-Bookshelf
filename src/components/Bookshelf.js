// src/components/Bookshelf.js
import React, { useState, useEffect } from "react";

const Bookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(storedBookshelf);
  }, []);

  return (
    <div>
      <h1>My Bookshelf</h1>
      <div className="bookshelf">
        {bookshelf.map((book) => (
          <div key={book.key} className="book-card">
            <h3>{book.title}</h3>
            <p>
              {book.author_name
                ? book.author_name.join(", ")
                : "Unknown Author"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
