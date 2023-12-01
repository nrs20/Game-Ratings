/*Name: Natalia Smith
Date: 11/3/2023
Course: IT302
Section: 001
Assignment: Unit 7
Email: nrs5@njit.edu
*/
import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import GamesDAO from './dao/gamesDAO.js'
import RatingDAO from './dao/RatingsDAO.js'

async function main() {

  dotenv.config()

  const client = new mongodb.MongoClient( process.env.GAMES_DB_URI)

  const port = process.env.PORT || 8000

  try {
    await client.connect()
    //call GamesDAO
    await GamesDAO.injectDB(client)
    await RatingDAO.injectDB(client)
    app.listen(port, () => {
      //check if app running
        console.log('server is running on port:' + port);
        })
    
      } catch (e) {
        console.error(e);
        process.exit(1)
      }
    }
    main().catch(console.error);
    