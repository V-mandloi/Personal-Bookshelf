// src/components/Bookshelf.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Bookshelf.module.css";

const Bookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const handleRemoveFromBookshelf = (bookKey) => {
    const updatedBookshelf = bookshelf.filter((book) => book.key !== bookKey);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
    setBookshelf(updatedBookshelf);
  };

  const goToSearch = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h2>My Bookshelf</h2>
      {bookshelf.length === 0 ? (
        <p>Your bookshelf is empty.</p>
      ) : (
        <div className={styles.bookshelf}>
          {bookshelf.map((book) => (
            <div key={book.key} className={styles.bookCard}>
              <h3>{book.title}</h3>
              <p>
                {book.author_name
                  ? book.author_name.join(", ")
                  : "Unknown Author"}
              </p>
              <button onClick={() => handleRemoveFromBookshelf(book.key)}>
                Remove from Bookshelf
              </button>
            </div>
          ))}
        </div>
      )}
      <button className={styles.backToSearch} onClick={goToSearch}>
        Back to Search
      </button>
    </div>
  );
};

export default Bookshelf;
