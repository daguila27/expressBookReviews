const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
}

const authenticatedUser = (username, password) => { //returns boolean
    //write code to check if username and password match the one we have in records.
    const authUsers = users.filter((user) => user.username === username && user.password === password)
    return authUsers.length > 0;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }
    if (authenticatedUser(username, password)) {
        //Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(400).json({ message: "Incorrect username or password!" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const isbn = req.params.isbn;
    const username = req.body.username;
    const review = req.body.review;

    const findBook = books[isbn];
    if(!findBook) {
        return res.status(400).json({ message: "Book not found!" });
    }
    // if review for username doesn't exists will be created
    findBook.reviews[username] = review; 
    books[isbn] = findBook;
    return res.status(300).json(`Updated book: ${JSON.stringify(books[isbn])}`);
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const isbn = req.params.isbn;
    const username = req.body.username;

    const findBook = books[isbn];
    if(!findBook) {
        return res.status(400).json({ message: "Book not found!" });
    }
    delete findBook.reviews[username]; 
    books[isbn] = findBook;
    return res.status(300).json(`Updated book: ${JSON.stringify(books[isbn])}`);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
