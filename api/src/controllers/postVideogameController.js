const e = require("express")
const { Videogame, Genres } = require("../db")

async function postVideogameController(req,res) {
    try {
        const { id, nombre, descripcion, plataformas, imagen, fecha_lanzamiento, rating, generos } = req.body
        
        if(!id || !nombre || !imagen || !generos) return res.status(404).json({error: `Los campos: ID, nombre, imagen, generos, son requeridos.`})
        const genresID = generos.map(obj => obj.id)
        const genresName = generos.map(obj => obj.name)
        console.log(genresID)
        const videogame = {
            id: +id,
            nombre,
            descripcion,
            plataformas,
            imagen,
            fecha_lanzamiento,
            rating,
        }

        const siYaExiste = await Videogame.findOne({
            where:{
                nombre: videogame.nombre
            }
        })
        
        if(siYaExiste) return res.status(404).json({error: 'El videojuego que intentas crear, ya existe.'})      

        const gameCreated = await Videogame.create(videogame)
        await gameCreated.addGenres(genresID)

        return res.status(200).json({...videogame, genres: genresName})     
    } catch (error) {
        console.log(error)
        return res.status(404).json({error: error})
    }
    

}

module.exports = {
    postVideogameController
}