const { Router } = require('express');
const { eliminar } = require('../ControlDelete');
const { getPokemonDbById } = require('../ControlId');
const { getPokemonByName } = require('../ControlName');
const { postPokemon } = require('../ControlPost');
const { pokeEdit } = require('../ControlPut');
const { pokeType } = require('../ControlType');



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
router.get("/pokemons",getPokemonByName);
router.get("/pokemon/:id",getPokemonDbById);
router.get("/type",pokeType);
router.post("/pokemons",postPokemon);
router.put("/pokemons/:id",pokeEdit);
router.delete("/pokemons/:id",eliminar);

module.exports = router;














// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


