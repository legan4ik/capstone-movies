const service = require("./theaters.service");
const reduceProperties = require("../utils/reduce-properties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  const result = await service.list();
  response.json({data: result });
}

/* not needed
async function listForMovie(request, response) {
  const movie_Id = request.params.movie_Id;
  const result = await service.listForMovie(movie_Id);
  response.json({data: result });
}
*/

module.exports = {
  list: asyncErrorBoundary(list),
  //listForMovie: asyncErrorBoundary(listForMovie)
};
