const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const videogames = require("./videogames")
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", videogames)

module.exports = router;
