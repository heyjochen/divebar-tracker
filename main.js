const express = require("express");
const app = express();

app.set("view engine", "ejs");


app.listen(8000, () => console.log("Server is up, let's go!"));

app.get('/', (req, res) => {
    res.send('Hello Dive Bar Fanatic')
});
