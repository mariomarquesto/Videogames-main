import style from "./CSS/About.module.css"
export default function About() {

    return(<div className={style.AboutContainer}>
        <div className={style.firstParag}>
            <h1 className={style.saludo}>Hello World!</h1>
        <div className={style.parrafo}>My name is José, and for this project, I've stacked up all the technologies I've learned at  <a href="https://www.soyhenry.com/" target='_blank'><img className={style.henryLogo} src="/henry.png" alt="henry-logo" /></a>'s bootcamp!</div>
        <div className={style.parrafo}></div>
        </div>
        <div className={style.tecnologiasContainer}>
            <div className={style.columnasTec}>Frontend
                <div className={style.tecnologias}>
                    <img className={style.nodeLogo} src="/nodejs.png" alt="nodejs" />
                </div>
                <div className={style.tecnologias}>
                    <img src="react.png" alt="react" />
                </div>
                <div className={style.tecnologias}>
                    <img src="/redux.png" alt="redux" />
                </div>
            </div>

            <div className={style.columnasTec}>Backend
                <div className={style.tecnologias}>
                    <img className={style.express} src="/Expressjs.png" alt="express" />
                </div>
                <div className={style.tecnologias}>
                    <img src="/sequelize.png" alt="sequelize" />
                </div>
                <div className={style.tecnologias}>
                    <img src="/postgresql.png" alt="posgresql" />
                </div>
            </div>

            <div className={style.columnasTec}>Testing
                <div className={style.tecnologias}>
                    <img src="/mocha.png" alt="mocha" />
                </div>
            </div>
        </div>
        <div className={style.shoutout}>Big shoutout to: <a href="https://rawg.io/apidocs" target="_blank">RAWG API </a>to make possible this project </div>
        <p className={style.footer}>Thanks for visit Freak-Games</p>
    </div>)
}