import style from './CSS/LandingPage.module.css'

export default function LandingPage({goingHome}) {

    return(<div className={style.background}>
        <div className={style.landingContainer}>
        <h1 className={style.h1}>Welcome to Freak-Games</h1>
        <p className={style.p}>Search any videogame you want from more than 500.000 games available.</p>
        <button  onClick={goingHome} className={style.landingButton} >Explore Videogames</button>
        </div>
    </div>)
}