//const router = require("express").Router();
const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const thController = require("../theaters/theaters.controller");
const revController = require("../reviews/reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

//router.route("/").get(controller.list);
router.get("/", controller.list);
router.get("/:movie_Id", controller.read);
router.get("/:movie_Id/theaters", thController.listForMovie);
router.get("/:movie_Id/reviews", revController.listForMovie);
router.get("/:movie_Id/*", function (req, res) {
    res.status(404).json({ error: "Unknown" });
    //res.sendStatus(404).json({data: "Unknown"});
  });
//router.get("/:movie_Id/critics", controller.listCritics);


module.exports = router;
