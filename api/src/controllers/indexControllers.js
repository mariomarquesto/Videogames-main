const {genresController} = require("./genresController")
const {getVideogamesController} = require("./getVideogamesController")
const {postVideogameController} = require("./postVideogameController")
const {getVideogameByQueryController} = require("./getVideogameByQueryController")
const {getVideogameByIdController} = require("./getVideogameByIdController")


module.exports = {
    genresController,
    getVideogamesController,
    postVideogameController,
    getVideogameByQueryController,
    getVideogameByIdController,
}