import { NavLink } from "react-router-dom"
import style from "./CSS/Card.module.css"
export default function Card({id, nombre,  imagen}){
    
    return(<NavLink to={`/detail/${id}`} className={style.navLink}>
        <div className={style.cardContainer}>
            <img src={imagen} alt={nombre} className={style.imagen} loading="lazy" />
            <h1 className={style.nombre}>{nombre}</h1>  
        </div>
    </NavLink>)
}