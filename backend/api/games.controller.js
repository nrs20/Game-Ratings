/*Name: Natalia Smith
Date: 11/3/2023
Course: IT302
Section: 001
Assignment: Unit 7
Email: nrs5@njit.edu
*/


import GamesDAO from '../dao/gamesDAO.js'

export default class GamesController {
  static async apiGetGames(req,res,next) {
    const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage) : 20
    const pageNumber = req.query.pageNumber ?   parseInt(req.query.pageNumber) : 0
    let filters = {}
    //apply filters
    if(req.query.external){
      filters.external = String(req.query.external)
    } else if(req.query.cheapest){
      filters.cheapest = req.query.cheapest
    }
    const { gamesList, totalNumGames } = await GamesDAO.getGames({
        filters, pageNumber, itemsPerPage})
    
        let response ={
          //fill out JSON response body
          games: gamesList,
          page: pageNumber,
          filters: filters,
          entries_per_page: itemsPerPage,
          total_results: totalNumGames,
        }
        res.json(response)
       }
       static async apiGetGameById(req, res, next) {
        try {
          let id = req.params.id || {}
          let game = await GamesDAO.getgameById(id)
          if(!game) {
            res.status(404).json({ error: "not found"})
            return
          }
          res.json(game)
        } catch(e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
          }
        }
        static async apiGetRatings(req, res, next) {
          try {
            let propertyTypes = await GamesDAO.getRatings()
            res.json(propertyTypes)
          } catch(e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
          }
        }
        
      
    }
    