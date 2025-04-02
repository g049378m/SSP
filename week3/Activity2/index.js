//npm init -y
//npm install express ejs

// Directives
"use strict";

// Imports
import express from "express";
import * as path from "path";
import { fileURLToPath } from "url";

// Configure Directory Relative to Index
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Application Constants
const app = express();
const port = 8080;

// Configuration
app.disable("x-powered-by");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ====================
// MIDDLEWARE FOR STATIC FILES
// ====================




// Serve everything inside "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Serve a specific favicon (optional)
app.use("/favicon.ico", express.static(path.join(__dirname, "public/assets/ico/SSP.ico")));

// ====================
// ROUTES
// ====================

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/unauth-it", unauth_user);

app.get("/break-it", (req, res) => {
  throw new Error("Simulated server crash 💥");
});




// Middleware that always returns 401 (unauthorised)
function unauth_user(req, res, next) {
    res.status(401);
    res.render("error", {
        code: 401,
        message: "You are not authorised to view this page.",
        url: req.protocol + "://" + req.hostname + req.originalUrl
    });
}

app.get("/data", (req, res) => {
  res.json({
    name: "Selim",
    module: "Server-Side Programming",
    week: 16,
    timestamp: new Date().toISOString()
  });
});

app.get("/students", (req, res) => {
  res.json([
    { id: 1, name: "Alice", course: "Computer Science", level: 5 },
    { id: 2, name: "Bob", course: "Cyber Security", level: 6 },
    { id: 3, name: "Selim", course: "Server-Side Programming", level: 5 }
  ]);
});


app.get("/message", (req, res) => {
  res.render("message", {
    title: "Server-Side Programming",
    greeting: "Hello, Selim! This message came from the server 🚀"
  });
});

app.get("/projects", (req, res) => {
  const projectList = [
    { id: 1, name: "Quiz Game App", tech: "Flutter + Firestore" },
    { id: 2, name: "Portfolio Website", tech: "HTML + CSS + JavaScript" },
    { id: 3, name: "Student Management System", tech: "Node.js + EJS" }
  ];

  res.render("projects", {
    title: "Selim’s Projects",
    projects: projectList
  });
});


// 404 Error Handler
app.use((req, res, next) => {
  res.status(404);
  res.format({
      html: () => {
          res.render("error", {
              code: 404,
              message: "Page Not Found",
              url: req.protocol + "://" + req.hostname + req.originalUrl
          });
      },
      json: () => {
          res.json({ error: "Not found" });
      },
      default: () => {
          res.type("txt").send("Not found");
      }
  });
});


  // 500 Error Handler (Server crash)
app.use((err, req, res, next) => {
  console.error("500 error:", err.stack);
  res.status(500);
  res.render("error", {
      code: 500,
      message: "Internal Server Error",
      url: req.protocol + "://" + req.hostname + req.originalUrl
  });
});


// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`);
});
