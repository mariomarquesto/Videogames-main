import axios from "axios"
const create1 = {
    nombre: 'MyNewGame',
    fecha_lanzamiento: "01/01/01",
    plataformas: "Xbox, PlayStation",
    rating: 4.9,
    generos: "Accion, Plataforma",
    imagen: "https://www.elpais.com.co/resizer/mBPF0ANIhK9C8OBjoh-0-3RA_5c=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/ES4YNNALTVAY3I5RENIXL5WIQI.jpg"
}

async function ta() {
    try {
        let platforms = []
        const {data} = await axios.get(`https://api.rawg.io/api/platforms?key=2ed1cbc206f94950abfb03e2e872af32`)
        
        data.results.forEach(platform => platforms.push(platform.name))
        console.log(platforms)
    } catch (error) {
        console.log(error)
    }
}
ta()
