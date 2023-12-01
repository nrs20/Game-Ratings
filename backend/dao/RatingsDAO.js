/*Name: Natalia Smith
Date: 11/15/2023
Course: IT302
Section: 001
Assignment: Unit 9
Email: nrs5@njit.edu
*/

import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let games
export default class RatingDAO {
  static async injectDB(conn) {
    if(games) {
      return
    } try {
      games = await conn.db(process.env.GAMES_NS).collection('ratings');
    } catch(e) {
      console.error(`unable to establish connection handle in RatingDAO: ${e}`)
    }
}
    static async addGame(gameID, user, rating, lastModified) {
        try {
          const gameDoc = {
            //grabbing data from image controller
            name: user.name,
            user_id: user._id,
            lastModified: lastModified,
            rating: rating,
            gameID: new ObjectId(gameID)
          }
          return await games.insertOne(gameDoc)
        } catch(e) {
          console.error(`unable to post game: ${e}`)
          console.error(e)
          return { error: e }
        }
      }
      
      static async updateGame(ratingId, userId, rating, lastModified) {
        try {
            const updateResponse = await games.updateOne(
                { _id: new ObjectId(ratingId), user_id: userId },
                { $set: { rating: rating, lastModified: lastModified } }
            );
            return updateResponse;
        } catch (e) {
            console.error(`Unable to update game: ${e}`);
            console.error(e);
            return { error: e };
        }
    }
    
      static async deleteGame(gameID, userId) {
        try {
            const deleteResponse = await games.deleteOne({
                _id: new ObjectId(gameID), // Use _id for MongoDB document ID
                user_id: userId,
            });
            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete game: ${e}`);
            console.error(e);
            return { error: e.message };
        }
    }

      static async getRatingById(id) {
        try {
          return await games.aggregate([
            {
              $match: {
                _id: new ObjectId(id),
              }
            },
            { $lookup:
              {
                from: 'ratings',
                localField: '_id',
                foreignField: 'gameID',
                as: 'ratings'
              }
            }
          ]).next()
        }
      
        catch(e) {
          console.error(`something went wrong in getRatingById: ${e}`)
          throw e
        }
      }
      
      
    }
    