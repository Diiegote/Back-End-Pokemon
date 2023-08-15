
const { allPokemons } = require("../ControlGet");




const getPokemonByName = async (req,res)=> {
 const {name} =req.query
 const dataApi= await allPokemons()
  if(name){
    const recipeName = await dataApi.filter(e =>e.name.toLowerCase()=== name.toLowerCase())
    recipeName.length ? res.send(recipeName) : res.status(404).send("No existe el Nombre")
  } else{
    res.send(dataApi)
  }

}
 
  module.exports={getPokemonByName}