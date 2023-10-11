import {ADD_GAMES,FILTER_GENRES,FILTER_NAMES,FILTER_RATING,RESET,PREV,NEXT,LOOKING,RELOAD,POST_VIDEOGAME,SHOW_DB_GAMES} from "./actionTypes";
import axios from "axios"

export function showDBgames() {
    return {
        type: SHOW_DB_GAMES,
    }
}

export function postVideogame(videogameCreado) {
    return async function(dispatch) {
        try {        
            const {data} = await axios.post('http://localhost:3001/videogame', videogameCreado)
            return dispatch({
                type: POST_VIDEOGAME,
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function addVideogames() {
    return async function(dispatch) {
        try {
            const {data} = await axios.get('http://localhost:3001/videogames')
            return dispatch({
                type: ADD_GAMES,
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterByName(payload) {
    return {
        type: FILTER_NAMES,
        payload: payload
    }
}

export function filterByRating(payload) {
    return {
        type: FILTER_RATING,
        payload: payload
    }
}

export function filterByGenres(genreString) {
    return { 
        type: FILTER_GENRES,
        payload: genreString
    }
} 

export function searching(name) {
    return async function(dispatch) {
        try {
            if(/^\d+/.test(name)) { // name es id
                const { data } = await axios.get(`http://localhost:3001/videogames/${name}`)
                return dispatch({
                    type: LOOKING,
                    payload: [data]
                })
            }

            const { data } = await axios.get(`http://localhost:3001/search?name=${name}`)
            return dispatch({
                type: LOOKING,
                payload: data.results
            })
        } catch (error) {
            console.log(error)
        }

    }
    
}
export function reset() {
  return {
    type: RESET,
  };
}

export function prev() {
  return {
    type: PREV,
  };
}
export function next() {
  return {
    type: NEXT,
  };
}

export function reload() {
    return {
        type: RELOAD,
    }
}

