const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  const review_id = request.params.reviewId;
  const review = await service.read(review_id);
  //if (request.method === "PUT"){
  //console.log(request.body);
//}
  if (review){
      response.locals.review = review;
    //next({});
    next();
  } else {
  //next({statusCode: 404, message: `Movie with id ${movie_id} was not found`})
  // TODO !
  //response.sendStatus(404);
  next({status: 404, message: `ID ${review_id} cannot be found`})
  //next({status: 404})
  //response.json("Nothing");
  }
}

async function destroy(request, response) {
  await service.destroy(request.params.reviewId);
  response.sendStatus(204);
}

async function list(request, response) {
  // TODO: Write your code here
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
  //loan
  console.log(request.body)
  //try {

  const result = await service.update({...request.body.data, review_id: request.params.reviewId});
  //} catch (error) {
  //  console.log(error)
  //}
  //console.log(`result: ${result} 1213`)
  response.json({ data: result });
}


async function listForMovie(request, response) {
  const movie_Id = request.params.movie_Id;
  //console.log(movie_Id);
  const result = await service.list(movie_Id);
  /*  "critic_id": 1,
  "preferred_name": "Chana",
  "surname": "Gibson",
  "organization_name": "Film Frenzy",
  "created_at": "2021-02-23T20:48:13.315Z",
  "updated_at": "2021-02-23T20:48:13.315Z"
  */
  //const formattedResult = result.map(item => ({
  //  ...item,
  //  critic: {surname: item.surname}
  //}));
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
    //console.log(review)
  }
  //const { one, ...rest } = original;
  //3 4
  // Construct the new object
  //const transformed = {
  //  one,
  //  other: rest
  //};
  //console.log(result);
  response.json({data: result });
  //response.json({data: result });
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
