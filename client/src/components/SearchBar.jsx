import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searching } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import style from './CSS/SearchBar.module.css'

export default function SearchBar() {
  let [name, setName] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const savedName = localStorage.getItem("searchName");

  useEffect(() => {
    if(savedName){
      setName(savedName);
    }    
  }, [savedName]);
  
  useEffect(() => {
    if(name.length > 1) {
      dispatch(searching(name.trim()))
    }
  }, [name])

  function handleOnChange(event) {
    setName(event.target.value);
    localStorage.setItem("searchName", event.target.value);
  }

  function handleOnKeyPress(event) {
    if (event.key === "Enter") {
      dispatch(searching(name.trim()))
      setName("");
    localStorage.removeItem("searchName");
    navigate('/home')
    }
  } 

  return (
    <div className={style.searchBar}>
      Search: 
      <input className={style.input} type="search" value={name} onChange={handleOnChange} onKeyDown={handleOnKeyPress} />
     
    </div>
  );
}
