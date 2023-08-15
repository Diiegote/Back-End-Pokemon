const {Type} = require ("../db");
const axios = require("axios") ;

const pokeType = async (req,res) =>{
   try{
        const typePokemon = (await axios('https://pokeapi.co/api/v2/type')).data.results
        // console.log(typePokemon)
       const dataTypes = typePokemon.map(e => e.name)
       dataTypes.forEach(e => {
            Type.findOrCreate({
              where: { name: e }
            })
        })
        const typeDb = await Type.findAll()
        res.send(typeDb)
    } catch (error) {
        res.status(404).json({  error })
    }
}
module.exports = {pokeType}
