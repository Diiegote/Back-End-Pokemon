
const { Pokemon } = require("../db");
const { Type } = require("../db");

const postPokemon = async (req, res) => {
  let { name, life, strength, defense, speed, height, weight, types, image } = req.body;
  if (!name) return res.json({ info: "El nombre es obligatorio" });

  const existe = await Pokemon.findOne({ where: { name: name } })
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
          name:e
        },  through: {
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
  res.json({ info: "Pokemon Creado" })
  return relacionTablas


};
module.exports = { postPokemon }