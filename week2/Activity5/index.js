// Enable strict mode
"use strict";

//Import Express
import express from "express";

//Consts

const app = express();
const port = 8080;


// ====== MIDDLEWARE: Logging requests ======
app.use((req, res, next) => {

    console.log(`Request made from IP: ${req.ip}`);
    console.log(`Requested URL: ${req.originalUrl}`);
    next();
});

// ====== MIDDLEWARE FUNCTION: auth_user ======

function auth_user(req, res, next) {
    res.redirect("/login");
}

app.get("/", (req, res) => {
    res.send(`
        <h1>Welcome</h1>
        <p><a href="/tickets">Tickets</a></p>
        <p><a href="/users">Users</a></p>
    `);
});

app.get("/login", (req, res) => {
    res.send("<h1>Login Page</h1>");
});

// Apply the auth_user middleware to these routes:
app.get("/tickets", auth_user, (req, res) => {
    res.send("<h1>Tickets</h1>");
});

app.get("/users", auth_user, (req, res) => {
    res.send("<h1>Users</h1>");
});

// ====== START SERVER ======
app.listen(port, () => {
    console.log(`Express server running at http://127.0.0.1:${port}`);
});