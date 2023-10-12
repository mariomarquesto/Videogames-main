const fetch = require("node-fetch");

const URL = "https://api.rawg.io/api/";
const API_KEY = "fcbc119400684aa5aa9a62a3d0e5c9f0";

async function getVideogames() {
  try {
    let allResponse = [];

    for (let page = 1; page <= 5; page++) {
      const response = await fetch(`${URL}games?key=${API_KEY}&page=${page}`);
      const data = await response.json();
      allResponse = allResponse.concat(data.results);
    }

    const mergedArray = allResponse.map((videogame) => ({
      id: videogame.id,
      nombre: videogame.name,
      plataformas_padres: videogame.parent_platforms.map((p) => p.platform.name),
      plataformas: videogame.platforms.map((p) => p.platform.name),
      imagen: videogame.background_image,
      fecha_lanzamiento: videogame.released,
      rating: videogame.rating,
      genres: videogame.genres.map((genre) => genre.name),
    }));

    if (!mergedArray) throw new Error("Error al obtener datos de videojuegos.");
    return mergedArray;
  } catch (error) {
    console.log(error);
    throw new Error({ error: error.message });
  }
}

async function getVideogameById(id) {
  try {
    const { data } = await axios.get(`${URL}games/${id}?key=${API_KEY}`);

    const videogame = {
      id: data.id,
      nombre: data.name,
      descripcion: data.description,
      rating: data.rating,
      plataformas: data.platforms.map(platform => platform.platform.name),
      imagen: data.background_image,
      imagen_extra: data.background_image_additional,
      fecha_lanzamiento: data.released,
      genres: data.genres.map(genre => genre.name),
      desarrolladores: data.developers.map(dev => dev.name),
      tiendas: data.stores.map(arr => `${arr.store.name}: ${arr.store.domain}`)
      /* requisitos: data.platforms.find(arr => arr.platform.name === "PC").requirements */
    }

    return videogame;  
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}


async function searchVideogame(videogameName) {
  try {
    const response = await fetch(`${URL}games?search=${videogameName}&key=${API_KEY}`);
    const data = await response.json();

    const arrayOfSearchGame = data.results.map((videogame) => ({
      id: videogame.id,
      nombre: videogame.name,
      imagen: videogame.background_image,
      rating: videogame.rating,
      fecha_lanzamiento: videogame.released,
      plataformas: videogame.platforms.map((platforms) => platforms.platform.name),
      genres: videogame.genres.map((genre) => genre.name),
    }));

    return arrayOfSearchGame;
  } catch (error) {
    throw new Error(error);
  }
}


async function getGenres() {
  try {
    const response = await fetch(`${URL}genres?key=${API_KEY}`);
    const data = await response.json();

    const genresArray = data.results.map((genre) => ({
      id: genre.id,
      nombre: genre.name,
    }));

    return genresArray;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getVideogames,
  getVideogameById,
  searchVideogame,
  getGenres,
};
