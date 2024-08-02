const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

router.get("/", controller.list).all(methodNotAllowed);
router.get("/:movie_Id", controller.read).all(methodNotAllowed);
router.use("/:movie_Id/theaters", theatersRouter);
router.use("/:movie_Id/reviews", reviewsRouter);


router.get("/:movie_Id/*", function (req, res) {
    res.status(404).json({ error: "Unknown" });
});

module.exports = router;
