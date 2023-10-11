import './App.css';
import LandingPage from "./components/LandingPage"
import Detail from "./components/Detail"
import Cards from "./components/Cards"
import CreateVideogameForm from "./components/CreateVideogameForm"
import NavBar from "./components/NavBar"
import About from "./components/About"
import RefreshRedirect from './components/RefreshRedirect';

import {Routes, Route, useLocation, useNavigate } from "react-router-dom"

import { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { addVideogames } from './redux/actions';
import axios from "axios"

export default function App() {
  
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function goingHome() {
    navigate('/home')
  }

  useEffect(() => {
    dispatch(addVideogames()) 
  }, [])

  useEffect(() => {
    (async function inEffect() {
      try {
        await axios.get('http://localhost:3001/genres')
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  


  return (
    <div className="App">
      {(location.pathname !== "/") && <NavBar />}
      <RefreshRedirect />
      <Routes>
        <Route path="/" element={<LandingPage goingHome={goingHome} />}/>
        <Route path="/home" element={<Cards  />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<CreateVideogameForm />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}


