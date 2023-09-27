const { Type } = require("../db");
const axios = require("axios");

class TypesController {
   constructor() {

   }

   async getAll(req, res) {
      const { data } = await axios('https://pokeapi.co/api/v2/type');
      const { result } = data;

      const dataTypes = result?.map(e => e.name);

      dataTypes?.forEach(e => {
         Type.findOrCreate({
            where: { name: e }
         })
      });
      const typeDb = await Type.findAll();

      res.json(typeDb);
   }
};

module.exports = new TypesController();