const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  const review_id = request.params.reviewId;
  const review = await service.read(review_id);
  if (review){
    response.locals.review = review;
    next();
  } else {
    next({status: 404, message: `ID ${review_id} cannot be found`})
  }
}

async function destroy(request, response) {
  await service.destroy(request.params.reviewId);
  response.sendStatus(204);
}

async function list(request, response) {
  const result = await service.list(request.params.movie_Id);
  // or {one, ...rest} for critics 
  response.json({data: result });
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movie_Id) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movie_Id) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  const result = await service.update({...request.body.data, review_id: request.params.reviewId});
  response.json({ data: result });
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
