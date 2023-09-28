const { Router } = require('express');
const pokemon = require('../controllers/PokemonController');
const TypesController = require('../controllers/TypesControllers');


const router = Router();
router.get("/pokemons", pokemon.getAll);
router.get("/pokemon/:id", pokemon.getOne);
router.get("/type", TypesController.getAll);
router.post("/pokemons", pokemon.create);
router.patch("/pokemons/:id", pokemon.edit);
router.delete("/pokemons/:id", pokemon.delete);

module.exports = router;














// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


