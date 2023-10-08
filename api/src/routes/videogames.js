const {Router} = require("express")
const router = Router()
const {getVideogameByIdController, getVideogameByQueryController, getVideogamesController, postVideogameController, genresController, getGamesByGenres} = require("../controllers/indexControllers")


router.get("/videogames", getVideogamesController)

router.get("/videogames/:idVideogame", getVideogameByIdController)

router.get("/search", getVideogameByQueryController)

router.post("/videogame", postVideogameController)

router.get("/genres", genresController)




module.exports = router;