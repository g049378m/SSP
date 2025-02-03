"use strict";

import * as http from "http";  // Import the HTTP module
import chalk from "chalk";  // Import the chalk module


const PORT = 8080;  // Define the port number

// Create a server
const server = http.createServer((req, res) => {
    if (req.url === "/COMP50016") {
        console.log(chalk.green("COMP50016 route was accessed."));
        res.end("Server-Side Programming");
    } else if (req.url === "/favicon.ico") {
        console.log(chalk.yellow("Favicon request received."));
        res.end("Favicon request");
    } else if (req.url === "/") {
        console.log(chalk.blue("No route was used"));
        console.log("No route was used");
        res.end("Hello World");
    } else {
        console.log(chalk.red("404 - Not Found: " + req.url));
        res.end("404 - Not Found");
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
