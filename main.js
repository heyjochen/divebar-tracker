const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");

const DiveBar = require("./models/DiveBar");

dotenv.config();

app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");


//MongoDB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");

    app.listen(3000, () => console.log("Server Up and running"));

    //GET
    app.get("/", (req, res) => {
    DiveBar.find({}, (err, dives) => {
    res.render("dive.ejs", { DiveBars: dives });
    });
    });

    //POST
    app.post('/', async (req, res) => {
        const diveBar = new DiveBar({
        content: req.body.content
    });
    try {
    await diveBar.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
    });

    //UPDATE
    app
    .route("/edit/:id")
    .get((req, res) => {
    const id = req.params.id;
    DiveBar.find({}, (err, dives) => {
    res.render("diveEdit.ejs", { DiveBars: dives, idTask: id });
    });
    })
    .post((req, res) => {
    const id = req.params.id;
    DiveBar.findByIdAndUpdate(id, { content: req.body.content }, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
    });

    //DELETE
    app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    DiveBar.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
    });


});

