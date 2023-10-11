import { useState, useEffect } from "react";
import { postVideogame } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import style from "./CSS/CreateVideogameForm.module.css";
import validation from "./validations/validate";

export default function CreateVideogameForm() {
  const dispatch = useDispatch();
  const  videogames  = useSelector((store) => store.videogames);
  const navigate = useNavigate();

  //----------------- Inputs Submiters ------------------ Inputs Submiters ------------------ Inputs Submiters -----------------
  const [inputs, setInputs] = useState({
    id: 0,
    nombre: "",
    fecha_lanzamiento: "",
    plataformas: [],
    rating: "",
    generos: [],
    imagen: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    fecha_lanzamiento: "",
    plataformas: '',
    rating: "",
    generos: '',
    imagen: "",
    descripcion: "",
  });

  // ---------------- Enable submit ---------------- Enable submit ---------------- Enable submit ---------------- Enable submit
  const [enableSubmit, setEnableSubmit] = useState(false);

  // ---------------- Handle Inputs to Submit ---------------- Handle Inputs to Submit ---------------- Handle Inputs to Submit ---------------- Handle Inputs to Submit
  function handleChange(event) {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });

    const checkingErrors = validation({
      ...inputs,
      [event.target.name]: event.target.value,
    });

    setErrors(checkingErrors);

    const hasErrors = Object.values(checkingErrors).some(
      (error) => error !== ""
    );
    setEnableSubmit(!hasErrors);
  }
  // ---------------- Handle Inputs to Submit ---------------- Handle Inputs to Submit ---------------- Handle Inputs to Submit ---------------- Handle Inputs to Submit


  //----------------- Submit Handler -------------------------- Submit Handler -------------------------- Submit Handler ----------------- Submit Handler -----------------

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.removeItem("formData");

    const existe = videogames.find(
      (videogame) => videogame.nombre === inputs.nombre
    );

    if (existe) {
      return alert(`El videojuego ${existe.nombre} ya existe en el servidor.`);
    }

    inputs.rating = Number(inputs.rating);
    inputs.id = Math.floor(Math.random() * 1000) + 1500000;
   
    dispatch(postVideogame(inputs));
    alert("Videojuego Creado!");
    navigate("/home");
  }
  //-----------------Submit Handler--------------------------Submit Handler--------------------------Submit Handler-----------------

  //-------------Genres Handlers----------------------------Genres Handlers----------------------------Genres Handlers---------------
  const [selectedGenres, setSelectedGenres] = useState([]);

 
  const genres = [{ id: 4, name: "Action" },{ id: 51, name: "Indie" },{ id: 3, name: "Adventure" },{ id: 5, name: "RPG" },{ id: 10, name: "Strategy" },{ id: 2, name: "Shooter" },{ id: 40, name: "Casual" },{ id: 14, name: "Simulation" },{ id: 7, name: "Puzzle" },{ id: 11, name: "Arcade" },{ id: 83, name: "Platformer" },{ id: 59, name: "Massively Multiplayer" },{ id: 1, name: "Racing" },{ id: 15, name: "Sports" },{ id: 6, name: "Fighting" },{ id: 19, name: "Family" },{ id: 28, name: "Board Games" },{ id: 34, name: "Educational" },{ id: 17, name: "Card" },
  ];

  const handleGenreSelect = (event) => {
    const genreId = parseInt(event.target.value);
    const selectedGenre = genres.find((genre) => genre.id === genreId);

    if (!selectedGenres.find(genre => genre.id === selectedGenre.id)) {
      setSelectedGenres((prevGenres) => [...prevGenres, selectedGenre]);
    }
    if(!inputs.generos.find(genre => genre.id === selectedGenre.id)){
      setInputs({
        ...inputs,
        generos: [...inputs.generos, selectedGenre], // Setear el ID del genero en lugar del nombre para poder relacionarla en la DB con la tabla Genres
      });   
    }
  };

  const handleRemoveGenre = (genreId) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.filter((genre) => genre.id !== genreId)
    );
    setInputs({
      ...inputs,
      generos: inputs.generos.filter((genre) => genre.id !== genreId),
    });
  };
  //-------------Genres Handlers----------------------------Genres Handlers----------------------------Genres Handlers---------------

  //-------------- Platforms Handlers ------------------- Platforms Handlers ------------------- Platforms Handlers ------------------
  const allPlatforms = ["PC","PlayStation 5","Xbox One","PlayStation 4","Xbox Series S/X","Nintendo Switch","iOS","Android","Nintendo 3DS","Nintendo DS","Nintendo DSi","macOS","Linux","Xbox 360","Xbox","PlayStation 3","PlayStation 2","PlayStation","PS Vita","PSP","Wii U","Wii","GameCube","Nintendo 64","Game Boy Advance","Game Boy Color","Game Boy","SNES","NES","Classic Macintosh","Apple II","Commodore / Amiga","Atari 7800","Atari 5200","Atari 2600","Atari Flashback","Atari 8-bit","Atari ST","Atari Lynx","Atari XEGS","Genesis","SEGA Saturn","SEGA CD","SEGA 32X","SEGA Master System","Dreamcast","3DO","Jaguar","Game Gear","Neo Geo"];

  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const handlePlatformChange = (event) => {
    const selectedPlatform = event.target.value;
    if (!selectedPlatforms.includes(selectedPlatform)) {
      setSelectedPlatforms([...selectedPlatforms, selectedPlatform]);
    }
    if (!inputs.plataformas.find((plat) => plat === selectedPlatform)) {
      setInputs({
        ...inputs,
        plataformas: [...inputs.plataformas, selectedPlatform],
      });
    }
  };

  const handleRemovePlatform = (platform) => {
    const updatedPlatforms = selectedPlatforms.filter((p) => p !== platform);
    setSelectedPlatforms(updatedPlatforms);
    setInputs({
      ...inputs,
      plataformas: inputs.plataformas.filter((plat) => plat !== platform),
    });
  };
  //-------------- Platforms Handlers ------------------- Platforms Handlers ------------------- Platforms Handlers ------------------

  //------------ Storage Form Data ------------ Storage Form Data ------------ Storage Form Data ------------ Storage Form Data ------------ Storage Form Data ------------ Storage Form Data ------------ Storage Form Data ------------ Storage Form Data ------------ Storage Form Data 
  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));

    if (storedFormData) {
      setInputs(storedFormData);
      setSelectedGenres(storedFormData.generos)
      setSelectedPlatforms(storedFormData.plataformas)
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(inputs));
  }, [inputs]);
  //------------ Storage Form Data ------------ Storage Form Data ------------ Storage Form Data ------------ Storage Form Data ------------ Storage Form Data ------------ Storage Form Data ------------ Storage Form Data ------------ Storage Form Data ------------ Storage Form Data 


  // -----------------------RETURN-----------------------------------RETURN---------------------------------------RETURN-->

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.inputColumn}>

          <label htmlFor="nombre" className={style.label}> Title</label>
          <input className={style.input} type="text" key="nombre" name="nombre" value={inputs.nombre} onChange={handleChange} placeholder="Name:" />
          {errors.nombre ? ( <p className={style.errors}>{errors.nombre}</p> ) : (<p></p> )}

          <label htmlFor="fecha_lanzamiento" className={style.label}>Release</label>
          <input className={style.input} type="text" key="fecha_lanzamiento" name="fecha_lanzamiento" value={inputs.fecha_lanzamiento} onChange={handleChange} placeholder="27/7/23" />
          {errors.fecha_lanzamiento ? ( <p className={style.errors}>{errors.fecha_lanzamiento}</p>) : ( <p></p>)}

          <label htmlFor="rating" className={style.label}>Rating</label>
          <input className={style.input} type="text" key="rating" name="rating" value={inputs.rating} onChange={handleChange} placeholder=" 0"/>
          {errors.rating ? (<p className={style.errors}>{errors.rating}</p>) : (<p></p>)}

          <label htmlFor="imagen" className={style.label}>Image</label>
          <input className={style.input} type="text" key="imagen" name="imagen" value={inputs.imagen} onChange={handleChange} placeholder=" http://www.url.com/..."/>
          {errors.imagen ? (<p className={style.errors}>{errors.imagen}</p>) : (<p></p>)}

          <label htmlFor="descripcion" className={style.label}>Description</label>
          <textarea className={style.textarea} type="text" key="descripcion" name="descripcion" value={inputs.descripcion} onChange={handleChange} placeholder=" enter description..." />
          {errors.descripcion ? (<p className={style.errors}>{errors.descripcion}</p>) : (<p></p>)}

          <button type="submit" className={style.button} disabled={!enableSubmit}> Submit </button>
        </div>
        <div className={style.secondColumn}>

          <div className={style.generos}>

            <label htmlFor="generos" className={style.label}>Genres</label>
            <select name="generos" onChange={handleGenreSelect} className={style.input} defaultValue="" >
              <option value="" disabled> Select genres</option>
              {genres.map((genre) => ( <option key={genre.id} value={genre.id}>{genre.name}</option> ))} 
            </select>

            {selectedGenres.length < 1 ? null : ( <ul className={style.unlistOptions}> {selectedGenres.map((genre) => (<li key={genre.id} className={style.genreTag}>{genre.name}
            <button type="button" onClick={() => handleRemoveGenre(genre.id)} className={style.removeButton}>x</button></li>))} </ul> )}

          </div>
          <div className={style.plataformas}>

          <label className={style.label}>Platforms</label>
          <select onChange={handlePlatformChange} className={style.input} defaultValue="" >
            <option value="" disabled>Select platforms</option>
            {allPlatforms.map((platform) => ( <option key={platform} value={platform}>{platform}</option>))}
          </select>
          {selectedPlatforms.length < 1 ? null : ( <ul className={style.unlistOptions}> {selectedPlatforms.map((platform) => ( <li key={platform} className={style.genreTag}>{platform} <button className={style.removeButton} onClick={() => handleRemovePlatform(platform)} >X</button> </li> ))}
            </ul>
          )}
          </div>
        </div>

      </form>
    </div>
  );
}
