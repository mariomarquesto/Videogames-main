const {getGenres} = require("../utils/endpoints")
const {Genres} = require("../db")

async function genresController(req,res) {
    try {
        const genres = await getGenres()  
        const chequeandoGenres = await Genres.count()
        if(chequeandoGenres === 0) {
            await Genres.bulkCreate(genres)
            return res.status(200).json({genres: genres})

        } else {
            const genresOfDb = await Genres.findAll()
            return res.status(200).json({genres: genresOfDb})
        }
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

module.exports = {
    genresController
}