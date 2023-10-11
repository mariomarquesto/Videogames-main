import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {showDBgames} from '../redux/actions'
import style from "./CSS/NavBar.module.css";

export default function NavBar() {
  const location = useLocation()
  const dispatch = useDispatch()

  function handleDBgames(){
    dispatch(showDBgames())
  }

  return (
    <nav className={style.nav}>
      <div className={style.buttons}>
        <NavLink className={style.link} to="/home">
          Home
        </NavLink>
        <NavLink className={style.link} to="/about">
          About
        </NavLink>
      </div>
      <h1 className={style.nombre} >Freak-Games</h1>
      <div className={style.derecha}> 
        { location.pathname !== "/create"
        &&  <SearchBar /> }
        <NavLink className={style.link}  to="/create">Create</NavLink>
        <NavLink className={style.link} onClick={handleDBgames} to='/home' >Created</NavLink>
      </div>
    </nav>
  );
}