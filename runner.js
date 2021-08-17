/**
 * Don't worry too much about what this file does!
 * 
 * This is a simple script that tells Repl.it that they
 * should show you the content inside the ./public folder
 * when you click "run".
 */

const express = require('express');

const app = express();

app.use(express.static("public"))

app.listen(3000, () => {
  console.log('Preview ready!');
});