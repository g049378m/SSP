"use strict";

// Imports
import express from "express";
import * as path from "path";
import { fileURLToPath } from "url";

// File system helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App setup
const app = express();
const port = 8080;

// Tell Express to use EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
    res.send("<h1>Welcome to the home page</h1>");
});

// Breaker route (this will crash on purpose)
app.get("/breaker", (req, res) => {
    throw new Error("BORKED");
});

// 404 Handler (if no route matched)
app.use((req, res, next) => {
    res.status(404);
    res.format({
        html: () => {
            res.render("404", { url: req.url });
        },
        json: () => {
            res.json({ error: "Not found" });
        },
        default: () => {
            res.type("txt").send("Not found");
        }
    });
});

// 500 Handler (for exceptions)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.format({
        html: () => {
            res.render("500", { url: req.url });
        },
        json: () => {
            res.json({ error: "Internal Server Error" });
        },
        default: () => {
            res.type("txt").send("Internal Server Error");
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});
