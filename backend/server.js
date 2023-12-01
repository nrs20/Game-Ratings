/*Name: Natalia Smith
Date: 11/3/2023
Course: IT302
Section: 001
Assignment: Unit 7
Email: nrs5@njit.edu
*/
import express from 'express'
import cors from 'cors'
import games from './api/games.route.js'

//connect app
const app = express()

app.use(cors())
app.use(express.json())

//link
app.use("/api/v1/nrs5/games", games)

app.use('*', (req,res) => {
  res.status(404).json({error: "not found"})
})

export default app
