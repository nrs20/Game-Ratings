/*Name: Natalia Smith
Date: 11/15/2023
Course: IT302
Section: 001
Assignment: Unit 9
Email: nrs5@njit.edu
*/


import RatingDAO from '../dao/RatingsDAO.js'

export default class RatingController {

  static async apiPostGame(req,res,next) {
    try {
    //grabbing data from request body
      const gameID = req.body.game_id
      const rating = req.body.rating
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }
      const lastModified = new Date()

      const GameResponse = await RatingDAO.addGame(
        gameID,
        userInfo,
        rating,
        lastModified
      )
    res.json(GameResponse)
    } catch(e) {
    res.status(500).json({ error: e.message })
    }
  }
  static async apiUpdateGame(req, res, next) {
    try {
        const ratingId = req.body.rating_id; // Use rating_id instead of game_id
        const rating = req.body.rating;
        const userId = req.body.user_id;
        const lastModified = new Date();
        
        const GameResponse = await RatingDAO.updateGame(
          ratingId, // Pass rating_id instead of gameID
            userId,
            rating,
            lastModified
        );

        var { error } = GameResponse;
        if (error) {
            res.status.json({ error });
        }
        if (GameResponse.modifiedCount === 0) {
            throw new Error("Unable to update game. User may not be the original poster");
        }
        res.json(GameResponse);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

  static async apiDeleteGame(req,res,next) {
    try {
      const _id = req.body._id
      console.log("THIS IS THE ID INSIDE DELETE GAME", _id)
      const userId = req.body.user_id
     // console.log(gameID);
      console.log(userId);
      const GameResponse = await RatingDAO.deleteGame(
        _id,
        userId,
      )
      res.json(GameResponse)
    } catch(e) {
      res.status(500).json({ error: e.message})
    }
  }
  static async apiGetRatingById(req, res, next) {
    try {
      let id = req.params.id || {}
      let rating = await RatingDAO.getRatingById(id)
      console.log(rating);
      if(!rating) {
        res.status(404).json({ error: "not found"})
        return
      }
      res.json(rating)
    } catch(e) {
        console.log(`api, ${e}`)
        res.status(500).json({error: e})
      }
    }
  
  
  }
