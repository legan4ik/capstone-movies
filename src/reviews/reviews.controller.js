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
  response.json({ data: response.locals.review });
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  const result = await service.update({...request.body.data, review_id: request.params.reviewId});
  response.json({ data: result });
}


async function listForMovie(request, response) {
  const movie_Id = request.params.movie_Id;
  const result = await service.list(movie_Id);
  for (review of result) {
    review.critic = {
      critic_id: review.critic_id,
      preferred_name: review.preferred_name,
      surname: review.surname,
      organization_name: review.organization_name,
      created_at: review.created_at,
      updated_at: review.updated_at
    }
    delete review.critic_id;
    delete review.preferred_name;
    delete review.surname;
    delete review.organization_name;
    delete review.created_at;
    delete review.updated_at;
  }
  response.json({data: result });
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  listForMovie: listForMovie,
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
