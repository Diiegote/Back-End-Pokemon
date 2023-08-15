const axios = require("axios");
const {Pokemon} = require("../db");
const {Type} = require ("../db");



async function apiPokemons(){
  try {
    let allPokemons =(await axios("https://pokeapi.co/api/v2/pokemon?limit=120")).data.results
    const dataApi =await Promise.all ( allPokemons.map(async e =>{
    const pokemon =  (await axios (e.url)).data
       return pokemon
      }))
      const pokemonFinal = dataApi.map(e =>({
        
          image : e.sprites?.other?.["official-artwork"]?.front_default  ,
          id : e.id,
          name : e.name,
          types: e.types.map(e =>e.type.name).join(", "),
          strength : e.stats[1].base_stat,
          life: e.stats[0].base_stat
        }))
        return pokemonFinal
        
      } catch (error) {
        console.log(error)
      }
    }

    const dataBPoke = async () =>{
      return (await Pokemon.findAll({
        include : {
          model: Type,
          attributes: ["name"],
          through:{
            attributes : [],
          },
        }
      })).map(e => e.toJSON())
    } 


    const allPokemons = async (req,res) =>{
      const pokeApi = await apiPokemons();
      const pokeBd = await dataBPoke();
      const pokeOk =pokeBd?.map(e =>({
        ...e ,
        types : e.types?.map(e =>e.name).join(",") 
      }))
      const allPoke = await pokeApi.concat(pokeOk)
      return allPoke
}
 

module.exports = {allPokemons};

    