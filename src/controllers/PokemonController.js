const axios = require('axios');
const { Pokemon } = require("../db");
const { Type } = require("../db");
const { where } = require('sequelize');

class PokemonController {
   constructor() {

   }

   async getAll({ query }, res) {
      const { name } = query;
      const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=120');
      const { results } = data;

      const dataApi = await Promise.all(results.map(async e => {
         const { data } = await axios.get(e.url);
         return data;
      }));
      const allPokemons = dataApi.map(e => ({
         image: e.sprites?.other?.["official-artwork"]?.front_default,
         id: e.id,
         name: e.name,
         types: e.types.map(e => e.type.name).join(", "),
         strength: e.stats[1].base_stat,
         life: e.stats[0].base_stat
      }))
      const dataBPoke = async () => {
         return (await Pokemon.findAll({
            include: {
               model: Type,
               attributes: ["name"],
               through: {
                  attributes: [],
               },
            }
         })).map(e => e.toJSON())
      };
      const pokeDb = await dataBPoke();
      const pokeOk = pokeDb?.map(e => ({
         ...e,
         types: e.types?.map(e => e.name).join(",")
      }));
      const allPoke = await allPokemons.concat(pokeOk);

      if (!name) return res.json(allPoke);

      const nameQuery = allPoke?.filter(e => e.name.toLowerCase() === name.toLowerCase());
      return res.json(nameQuery);

   }

   async getOne({ params }, res) {
      const { id } = params;

      if (!id.includes('-')) {
         const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);

         const pokemonId = {
            id: data.id,
            name: data.name,
            types: data.types.map((t) => t.type.name).join(", "),
            image: data.sprites?.other?.["official-artwork"]?.front_default,
            Life: data.stats[0].base_stat,
            strength: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
         };
         res.json(pokemonId);
      } else {

         const pokemonIdDb = await Pokemon.findByPk(id, {
            include: {
               model: Type,
               attributes: ["name"],
               through: {
                  attributes: []
               }
            }
         })
         res.json(pokemonIdDb);
      }
   };


   async create({ body }, res) {
      const { name, life, strength, defense, speed, height, weight, types, image } = body;
      if (!name) return res.status(400).json({ info: "Faltan campos" });

      const existe = await Pokemon.findOne({ where: { name: name } });

      if (existe) return res.json({ info: "El pokemon ya existe" });

      const pokemon = await Pokemon.create({
         name,
         life,
         strength,
         defense,
         speed,
         height,
         weight,
         image
      });
      await Promise.all(types.map(async e => {
         await pokemon.addType([
            (await Type.findOrCreate({
               where: {
                  name: e
               }, through: {
                  attributes: []
               }
            }))[0].dataValues.id
         ])
      }))
      const relacionTablas = await Pokemon.findOne({
         where: {
            name: name

         }
         ,
         include: {
            model: Type,
            attributes: ["name"],
            through: {
               attributes: []
            }
         }
      })
      res.status(200).json({ message: `Pokemon creado` });
      return relacionTablas;
   }

   async edit(req, res) {
      const { id } = req.params;
      const { body } = req;

      await Pokemon.update(body, { where: { id: id } });
      res.json({ message: "Pokemon editado correctamente" })
   };

   async delete({ params }, res) {
      const { id } = params;

      await Pokemon.destroy({ where: { id } });
      res.json({ message: "Pokemon eliminado correctamente" });


   }

};

module.exports = new PokemonController();