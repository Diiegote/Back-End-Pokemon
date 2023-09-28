const { Router } = require('express');
const pokemon = require('../controllers/PokemonController');
const TypesController = require('../controllers/TypesControllers');
const catchedAsync = require('../utils/catchedAsync');


const router = Router();
router.get("/pokemons", catchedAsync(pokemon.getAll));
router.get("/pokemon/:id", catchedAsync(pokemon.getOne));
router.get("/type", catchedAsync(TypesController.getAll));
router.post("/pokemons", catchedAsync(pokemon.create));
router.patch("/pokemons/:id", catchedAsync(pokemon.edit));
router.delete("/pokemons/:id", catchedAsync(pokemon.delete));

module.exports = router;














// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


