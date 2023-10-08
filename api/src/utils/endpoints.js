const axios = require("axios");
const URL = "https://api.rawg.io/api/";
const {rescaleImageWithCanvas} = require('./resize')
const path = require("path");
const fs = require("fs");

require("dotenv").config();
const { API_KEY } = process.env;

async function getVideogames() {
  try {
    let allResponse = [];
    let response = [];

    response = await Promise.all([axios.get(`${URL}games?key=${API_KEY}&page=${1}`),
      axios.get(`${URL}games?key=${API_KEY}&page=${2}`),
      axios.get(`${URL}games?key=${API_KEY}&page=${3}`), 
      axios.get(`${URL}games?key=${API_KEY}&page=${4}`),
      axios.get(`${URL}games?key=${API_KEY}&page=${5}`)]
    );
      
    response.forEach(element => {
      allResponse = allResponse.concat(element.data.results);
    });

    const mergedArray = [];

    allResponse.forEach((videogame) => {
      const videogameBoilerplate = {
        id: videogame.id,
        nombre: videogame.name, 
        plataformas_padres: videogame.parent_platforms.map(p=>p.platform.name),
        plataformas: videogame.platforms.map(p => p.platform.name),
        imagen: videogame.background_image,
        fecha_lanzamiento: videogame.released,
        rating: videogame.rating,
        genres: videogame.genres.map(genre=>genre.name)
      };
      mergedArray.push(videogameBoilerplate);  
    });

   
   /*  const mergedArray = await Promise.all(
      allResponse.map(async (videogame) => {
        // Call rescaleImageWithCanvas to get the rescaled image buffer and generated name
        const { buffer, name } = await rescaleImageWithCanvas(
          videogame.background_image,
          300,
          300
        );
    
        // Convert the buffer to base64
        const base64Image = buffer.toString("base64");
    
        return {
          id: videogame.id,
          nombre: videogame.name,
          plataformas_padres: videogame.parent_platforms.map((p) => p.platform.name),
          plataformas: videogame.platforms.map((p) => p.platform.name),
          imagen: `data:image/jpeg;base64,${base64Image}`, // Use base64 representation with proper data URI
          fecha_lanzamiento: videogame.released,
          rating: videogame.rating,
          genres: videogame.genres.map((genre) => genre.name),
        };
      })
    );     */
    if(!mergedArray) throw new Error('Ke pso')
    return mergedArray;
  } catch (error) {
    console.log(error)
    throw new Error({error: error.message})
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
    const { data } = await axios.get(`${URL}games?search=${videogameName}&key=${API_KEY}`);

    let arrayOfSearchGame = data.results.map(videogame => ({
      id: videogame.id,
      nombre: videogame.name,
      imagen: videogame.background_image,
      rating: videogame.rating,
      fecha_lanzamiento: videogame.released,
      plataformas: videogame.platforms.map(platforms => platforms.platform.name),
      genres: videogame.genres.map(genre => genre.name),
    }));  

    return arrayOfSearchGame
  } catch (error) {
    throw new Error(error)
  }
}

async function getGenres() {
  try {
    const { data } = await axios.get(`${URL}genres?key=${API_KEY}`);

    const genresArray = [];

    data.results.forEach((genre) => {
      const genreBoilerplate = {
        id: genre.id,
        nombre: genre.name,
      };
      genresArray.push(genreBoilerplate);
    });

    return genresArray;
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getVideogames,
  getVideogameById,
  searchVideogame,
  getGenres,
};
