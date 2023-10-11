import {RELOAD,ADD_GAMES,FILTER_GENRES,FILTER_NAMES,FILTER_RATING,RESET,PREV,NEXT,LOOKING,POST_VIDEOGAME,SHOW_DB_GAMES,} from "./actionTypes";

const initialState = {
  videogames: [],
  videogamesBackUp: [],
  gamesFromDB: [],
  page: 1,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_DB_GAMES:
      return{
        ...state,
        videogames: state.gamesFromDB
      }
    case POST_VIDEOGAME:
      return {
        ...state,
        videogames: [payload, ...state.videogames],
        videogamesBackUp: [payload, ...state.videogamesBackUp],
      };
    case ADD_GAMES:
      return {
        ...state,
        videogames: payload.results,
        videogamesBackUp: payload.results,
        gamesFromDB: payload.backup
      };  
    case FILTER_NAMES:
      const namesToFilter = [...state.videogames]
      return {
        ...state,
        videogames:
            payload === "A"
            ? namesToFilter.sort((a, z) => a.nombre.localeCompare(z.nombre))
            : namesToFilter.sort((a, z) => z.nombre.localeCompare(a.nombre)),
        page: 1
      };
    case FILTER_RATING:
      const ratingToFilter = [...state.videogames]
      return {
        ...state,
        videogames:
          payload === "DES"
            ? ratingToFilter.sort((a, z) => z.rating - a.rating)
            : ratingToFilter.sort((a, z) => a.rating - z.rating),
        page: 1
      };
    case FILTER_GENRES:
      let genresToFilter = [...state.videogamesBackUp].filter((videogame) => videogame.genres.find((genre) => genre === payload))    
      return {
        ...state,
        videogames: genresToFilter,
        page: 1    
      }
    case LOOKING:
      return {
        ...state,
        videogames: payload,
        page: 1
      };
    case RESET:
      return {
        ...state,
        videogames: state.videogamesBackUp,
      };
    case PREV:
      return {
        ...state,
        page: state.page - 1,
      };
    case NEXT:
      return {
        ...state,
        page: state.page + 1,
      };
    case RELOAD:
      return {
        ...state,
        videogames: state.videogamesBackUp,
      };
    default:
      return state;
  }
};

export default reducer;
