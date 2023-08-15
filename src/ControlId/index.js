const axios = require("axios");
const { Pokemon } = require("../db");
const { Type } = require("../db");

async function getPokemonDbById(req, res) {
  const { id } = req.params;
  console.log(id)
  try {
    if (!id.includes("-")) {
      const api = (await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
      const pokemonId = {
        id: api.id,
        name: api.name,
        types: api.types.map((t) => t.type.name).join(", "),
        image: api.sprites?.other?.["official-artwork"]?.front_default,
        Life: api.stats[0].base_stat,
        strength: api.stats[1].base_stat,
        defense: api.stats[2].base_stat,
        speed: api.stats[5].base_stat,
        height: api.height,
        weight: api.weight,
      };
      return pokemonId ? res.status(200).json(pokemonId) : res.status(400).send("Pokemon no encontrado")
    } else {

      try {
        const pokemonIdDb = await Pokemon.findByPk(id, {
          include: {
            model: Type,
            attributes: ["name"],
            through: {
              attributes: []
            }
          }
        })
        return pokemonIdDb ? res.status(200).json(pokemonIdDb) : res.status(400).send("Pokemon no encontrado")
      } catch (error) {
        console.log(error)
      }
    }
  } catch (error) {
    console.log(error)
  }


}
module.exports = { getPokemonDbById }