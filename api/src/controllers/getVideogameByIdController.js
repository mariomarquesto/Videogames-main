const { getVideogameById } = require("../utils/endpoints");
const { Videogame, Genres } = require("../db");

async function getVideogameByIdController(req, res) {
  try {
    let { idVideogame } = req.params;
    if (!idVideogame)
      return res.status(404).json({ error: "No Params Recived" });
    console.log(typeof idVideogame);

    let busquedaenDB = await Videogame.findOne({
      where: {
        id: idVideogame,
      },
      include: [
        {
          model: Genres,
          attributes: ["nombre"],
        },
      ],
    });

    if (busquedaenDB) {
      busquedaenDB = busquedaenDB.dataValues;
      busquedaenDB.genres = busquedaenDB.Genres.map((genre) => genre.nombre);
      console.log("mi clg", busquedaenDB);
      return res.status(200).json(busquedaenDB);
    }

    if (!busquedaenDB) {
      const videogame = await getVideogameById(idVideogame);
      return res.status(200).json(videogame);
    }

    return res
      .status(404)
      .json({ error: "El Videojuego con el ID ingresado no existe." });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getVideogameByIdController,
};
