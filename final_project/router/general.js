const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if(!username || !password) {
      return res.status(400).json({message: "Username or password are not provided!"});
  }

  users.push({username, password});

  return res.status(300).json({message: "User register successfully!"});
});

const axios = require('axios');
// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    axios.get('https://api-url.com/books')
    .then(response => {
        // Returning the books data
        return res.status(200).json(JSON.stringify(response.data)); 
    })
    .catch(error => {
      return res.status(500).json({ error: 'Failed to fetch books' });
    });
    //return res.status(300).json(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  axios.get('https://api-url.com/books/'+isbn)
    .then(response => {
        // Returning the books data
        return res.status(200).json(JSON.stringify(response.data)); 
    })
    .catch(error => {
      return res.status(500).json({ error: 'Failed to fetch book' });
    });
  //return res.status(300).json(JSON.stringify(books[req.params.isbn]));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  axios.get('https://api-url.com/books/author/'+author)
    .then(response => {
        // Returning the books data
        return res.status(200).json(JSON.stringify(response.data)); 
    })
    .catch(error => {
      return res.status(500).json({ error: 'Failed to fetch book' });
    });
  //const findBook = Object.values(books).filter((book) => book.author === author);
  //return res.status(300).json(JSON.stringify(findBook));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  axios.get('https://api-url.com/books/title/'+title)
    .then(response => {
        // Returning the books data
        return res.status(200).json(JSON.stringify(response.data)); 
    })
    .catch(error => {
      return res.status(500).json({ error: 'Failed to fetch book' });
    });
  //const findBook = Object.values(books).find((book) => book.title === title);
  //return res.status(300).json(JSON.stringify(findBook));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const findReview = books[isbn].reviews;
  return res.status(300).json(JSON.stringify(findReview));
});

module.exports.general = public_users;
