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

// Start the server
app.listen(port, () => {
  console.log("Server listening at http://127.0.0.1:" + port);
});
