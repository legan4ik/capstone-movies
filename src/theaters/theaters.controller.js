const service = require("./theaters.service");
const reduceProperties = require("../utils/reduce-properties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  const result = await service.list();


  /*
  const reduceTheaterAndMovies = reduceProperties("theater_id", {
    theater_id: ["theater", "theater_id"],
    name: ["theater", "name"],
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
  });
  */

  // FE data fetch

  //console.log(JSON.stringify(reduceTheaterAndMovies(result), null, 4));

  //response.json({data: reduceTheaterAndMovies(result) });
  response.json({data: result });
}


async function listForMovie(request, response) {
  const movie_Id = request.params.movie_Id;
  //console.log(movie_Id);
  const result = await service.listForMovie(movie_Id);
  //console.log(result);
  response.json({data: result });
  //response.json({data: result });
}

module.exports = {
  list: asyncErrorBoundary(list),
  listForMovie: asyncErrorBoundary(listForMovie)
};
