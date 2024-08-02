const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const knex = require("../db/connection");


async function movieExists(request, response, next) {
  const movie_id = request.params.movie_Id;
  const movie = await service.read(movie_id);
  //console.log(movie);
  if (movie.length > 0){
      response.locals.movie = movie[0];
    //next({});
    next();
  } else {
  //next({statusCode: 404, message: `Movie with id ${movie_id} was not found`})
  // TODO !
  //response.sendStatus(404);
  next({status: 404, message: `ID ${movie_id} cannot be found`})
  //next({status: 404})
  //response.json("Nothing");
  }
}
//pr

async function read(request, response) {
  response.json({ data: response.locals.movie });
}

async function list(request, response) {
  const isShowing = request.query.is_showing;
  const result = await service.list(isShowing);
  response.json({data: result });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
};
