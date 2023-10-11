import axios from "axios";
import style from "./CSS/Detail.module.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {

  const { id } = useParams();
  const [videogame, setVideogame] = useState({});

  useEffect(() => {
    async function inEffect() {
      try {
        let { data } = await axios.get(`http://localhost:3001/videogames/${id}`);
        if (data.plataformas.length > 1)
          data.plataformas = data.plataformas.map((platform, index) => {
            return (
              <p className={style.parrafosPGrupo2} key={index}>
                {platform}
              </p>
            );
          });
        if (data.genres && data.genres.length > 1)
          data.genres = data.genres.map((genres, index) => {
            return (
              <p className={style.parrafosPGrupo2} key={index}>
                {genres}
              </p>
            );
          });
        if (data.desarrolladores)
          data.desarrolladores = data.desarrolladores.map(
            (desarrollador, index) => {
              return (
                <p className={style.parrafosPGrupo2} key={index}>
                  {desarrollador}
                </p>
              );
            }
          );
        
        if (data.tiendas)
          data.tiendas = data.tiendas.map((tienda, index) => {
            const [nombre, link] = tienda.split(": ");
            const url =
              link.startsWith("http://") || link.startsWith("https://")
                ? link
                : `http://${link}`;

            return (
              <p key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {nombre}
                </a>
              </p>
            );
          });

        if (data.nombre) {
          setVideogame(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    inEffect();
    return setVideogame({});
  }, [id]);

  return (
    <div className={style.detail}>
      <div className={style.tiendas}>Stores:{videogame.tiendas}</div>

      <div className={style.grupo2}>
        <div className={style.grupoIntermedio}>
          <div className={style.idYnombre}>
            <h3 className={style.id}>Id: {id}</h3>
            <h1 className={style.nombre}>{videogame.nombre}</h1>
            <div className={style.imagen}>
              <img
                className={style.img}
                src={videogame.imagen}
                alt={videogame.nombre}
              ></img>
            </div>
          </div>
          <div className={style.parrafos}>
            <div className={style.dataParrafos}>
              <h3>Rating</h3>
              <p className={style.parrafosPGrupo2}> {videogame.rating}</p>
              <p className={style.parrafosGrupo2}></p>
              <h3>Lanzamiento</h3>
              <p className={style.parrafosPGrupo2}>
                {" "}
                {videogame.fecha_lanzamiento}
              </p>
            </div>
            <div className={style.dataParrafos}>
              <h3>Plataformas</h3>
              <p> {videogame.plataformas}</p>
            </div>
            <div className={style.dataParrafos}>
              <h3>Generos</h3>
              <div> {videogame.genres}</div>
            </div>
            <div className={style.dataParrafos}>
              <h3>Desarrolladores</h3>
              <p> {videogame.desarrolladores}</p>
            </div>
          </div>
        </div>
        <div className={style.grupo3}>
          <p
            className={style.description}
            dangerouslySetInnerHTML={{ __html: videogame.descripcion }}
          />
        </div>
      </div>
    </div>
  );
}
