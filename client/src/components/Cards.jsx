import Card from "./Card";
import Paginate from "./Paginate";
import style from "./CSS/Cards.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {filterByName,filterByGenres, filterByRating, reset } from "../redux/actions";


export default function Cards() {

  const videogames = useSelector((state) => state.videogames)
  const page = useSelector(state => state.page)
  
  const dispatch = useDispatch();

  let videoGamesPage = [];
  let cantPage = 1;

  if (videogames.length > 0) {
    const cantCharPerPage = 15;
    let desde = (page - 1) * cantCharPerPage;
    let hasta = page * cantCharPerPage;

    cantPage = Math.floor(videogames.length / cantCharPerPage);
    videoGamesPage = videogames?.slice(desde, hasta);
  } 

  function handleOrder(event) {
    dispatch(filterByName(event.target.value));
    
  }
  function handleGenres(event) {
    dispatch(filterByGenres(event.target.value));
  }

  function handleRating(event) {
    dispatch(filterByRating(event.target.value));
  }

  function handleReset() {
    dispatch(reset());

    const selectElements = document.getElementsByTagName("select");
    for (let select of selectElements) {
      select.selectedIndex = 0;
    }
  }

 

  return (
    <div className={style.cardsContainer}>
      <div className={style.filterOptions}>
        <p className={style.ordenarPor}>Sort by: </p>
        <div className={style.options}>
          <label htmlFor="a-z">Abc </label>
          <select name="a-z" onChange={handleOrder} defaultValue="">
            <option value="" disabled>
              --Select--
            </option>
            <option value="A"> A - Z </option>
            <option value="D"> Z - A </option>
          </select>
        </div>

        <div className={style.options}>
          <label htmlFor="genero">Genres </label>
          <select name="genero" onChange={handleGenres} defaultValue="">
            <option value="" disabled>
              --Select--
            </option>
            <option value="Action">Action</option>
            <option value="Inide">Inide</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            <option value="Strategy">Strategy</option>
            <option value="Shooter">Shooter</option>
            <option value="Casual">Casual</option>
            <option value="Simulation">Simulation</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Arcade">Arcade</option>
            <option value="Platformer">Platformer</option>
            <option value="Massively Multiplayer">Massively Multiplayer</option>
            <option value="Racing">Racing</option>
            <option value="Sports">Sports</option>
            <option value="Fighting">Fighting</option>
            <option value="Board Games">Board Games</option>
            <option value="Educational">Educational</option>
            <option value="Card">Card</option>
          </select>
        </div>

        <div className={style.options}>
          <label htmlFor="rating">Rating </label>
          <select name="rating" onChange={handleRating} defaultValue="">
            <option value="" disabled>
              --Select--
            </option>
            <option value="ASC">Lowest</option>
            <option value="DES">Best</option>
          </select>
        </div>

        <button className={style.button} onClick={handleReset}> Reset </button>
      </div>

      <div className={style.cards}>
        {videoGamesPage.length > 0
        ? videoGamesPage.map((videogame, index) => {
          return (
            <Card
              key={index}
              id={videogame.id}
              nombre={videogame.nombre}
              imagen={videogame.imagen}
            />
          );
        })
        : <div className={style.notFound}>No videogames found.</div>

      }
      </div>

      <Paginate page={page} cantPage={cantPage} />
    </div>
  );
}
