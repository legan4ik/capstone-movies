const db = require("../db/connection");

const tableName = "reviews";

async function destroy(reviewId) {
  return db('reviews')
    .where({'review_id': reviewId}).del();
}

async function list(movie_id) {
  return db('reviews')
    .select('reviews.*')
    .where({'movie_id': movie_id})
    .then(results => {
      return Promise.all(results.map(record => {
        return setCritic(record);
      }))
    });
    /*
    or
      return Promise.all(results.map(record => {
        return setField(record);
      }));
      return Promise.all(results.map(async (record) => {
        return await setCritic(record);
      }));
    */
}

async function read(reviewId) {
  return db('reviews')
    .select('*')
    .where({'review_id': reviewId}).first();
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
