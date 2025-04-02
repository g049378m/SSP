"use strict";

import express from "express";
import * as path from "path";
import { fileURLToPath } from "url";

// Directory setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Week 4 Home" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});
