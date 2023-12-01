/*Name: Natalia Smith
Date: 11/3/2023
Course: IT302
Section: 001
Assignment: Unit 7
Email: nrs5@njit.edu
*/
import express from 'express'
import GamesController from './games.controller.js'
import RatingController from './Ratings.controller.js'
const router = express.Router()

//router.route('/').get((req,res) => res.send('hello world'))
router.route('/').get(GamesController.apiGetGames)
  router.route("/id/:id").get(GamesController.apiGetGameById)
  router
  .route("/rating")
  .post(RatingController.apiPostGame)
  .put(RatingController.apiUpdateGame)
  .delete(RatingController.apiDeleteGame)

  router.route("/ratings").get(GamesController.apiGetRatings)

export default router
