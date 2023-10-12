const fetch = require("node-fetch"); // Asegúrate de importar 'node-fetch' en tu archivo

const { URL, API_KEY } = require("./endpoints");

async function searchVideogame(videogameName) {
  try {
    const response = await fetch(`${URL}games?search=${videogameName}&key=${API_KEY}`);
    const data = await response.json();

    let arrayOfSearchGame = data.results.map((videogame) => ({
      id: videogame.id,
      nombre: videogame.name,
      imagen: videogame.background_image,
      rating: videogame.rating,
      fecha_lanzamiento: videogame.released,
      plataformas: videogame.platforms.map(
        (platforms) => platforms.platform.name
      ),
      genres: videogame.genres.map((genre) => genre.name),
    }));

    return arrayOfSearchGame;
  } catch (error) {
    throw new Error(error);
  }
}
