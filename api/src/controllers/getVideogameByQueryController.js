const { searchVideogame } = require("../utils/endpoints");
const { Videogame, Genres } = require("../db");

async function getVideogameByQueryController(req, res) {
  try {
    const { name } = req.query;

    let arrayOfSearchGame = await searchVideogame(name);
    arrayOfSearchGame = arrayOfSearchGame.slice(0, 15);

    const busquedaenDB = await Videogame.findOne({
      where: {
        nombre: name,
      },
      include: [
        {
          model: Genres,
          attributes: ["nombre"],
        },
      ],
    });

    if (busquedaenDB) {
      return res
        .status(200)
        .json({ results: [busquedaenDB, ...arrayOfSearchGame] });
    }
    if (!busquedaenDB) {
      return res.status(200).json({ results: arrayOfSearchGame });
    } else {
      return res.status(404).json({ error: "El Videojuego buscado no existe" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getVideogameByQueryController,
};
