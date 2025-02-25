// Enable strict mode
"use strict";

// Import Express
const express = require("express");

// Create an Express application
const app = express();

// Define the port number
const port = 8080;

// Define routes

// Root route
app.get("/", (req, res) => {
    res.send("<h1>Welcome to the Home Page</h1>");
});

// Login route
app.get("/login", (req, res) => {
    res.send("<h1>Login</h1>");
});

// Tickets route
app.get("/tickets", (req, res) => {
    res.send("<h1>Tickets</h1>");
});

// Users route
app.get("/users", (req, res) => {
    res.send("<h1>Users</h1>");
});

// Start the server
app.listen(port, () => {
    console.log(`Express server is running at http://127.0.0.1:${port}`);
});
