if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
//const cors = require('cors')
app.use(express.json());
//app.use(cors())

// TODO: Add your code here

app.use("/movies", moviesRouter);

app.use("/theaters", theatersRouter);

app.use("/reviews", reviewsRouter);

app.use((err, req, res, next) => {
    //console.log(req);
    // !!!!
    res.status(err.status).json({ error: err.message });
})


module.exports = app;
