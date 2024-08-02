const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.delete("/:reviewId", controller.destroy);
router.put("/:reviewId", controller.update);

module.exports = router;
