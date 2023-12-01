/*Name: Natalia Smith
Date: 11/3/2023
Course: IT302
Section: 001
Assignment: Unit 7
Email: nrs5@njit.edu
*/
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let games

export default class GamesDAO {
  static async injectDB(conn) {
    if(games){ 
      return
    } try {
      //connect to collections
        games = await conn.db(process.env.GAMES_NS).collection('games_nrs5');
    } catch(e) {
      console.error(`unable to connect in GamesDAO: ${e}`)
    }
  }
  static async getGames({
    filters = null,
    page = 0,
    itemsPerPage = 20,
  } = {}) {
    let query = {};
  
    if (filters) {
      if ("external" in filters) {
        // For exact string match
        query.external = filters.external;
      } else if ("cheapest" in filters) {
        query.cheapest = { $eq: filters.cheapest };
      }
    }
  
    let cursor;
    try {
      cursor = await games
        .find(query)
        .limit(itemsPerPage)
        .skip(itemsPerPage * page);
      const gamesList = await cursor.toArray();
      const totalNumGames = await games.countDocuments(query);
      return { gamesList, totalNumGames };
    } catch (e) {
      // Handle errors
      console.error(`Unable to issue find command, ${e}`);
      console.error(e);
      return { gamesList: [], totalNumGames: 0 };
    }
  }
  static async getgameById(id) {
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
    } catch(e) {
      console.error(`something went wrong in getgameById: ${e}`)
      throw e
    }
  }
  static async getRatings() { 
    let ratings = []
    try {
      ratings = await games.distinct("cheapest")
      return ratings
    } catch(e) {
      console.error(`unable to get ratings, $(e)`)
      return ratings
    }
  }
  
  
}

