const {Pokemon} = require("../db");

const pokeEdit= async (req,res)=>{
    const {name, life, strength, defense, speed, height, weight,image} = req.body;
    const {id}= req.params;
   try {
    const buscar= await Pokemon.findOne({id:id})
    const edit = await Pokemon.update({name:name?name:buscar.name,
         life:life?life:buscar.life, 
         strength:strength?strength:buscar.strength, 
         defense:defense?defense:buscar.defense, 
         speed:speed?speed:buscar.speed, 
         height:height?height:buscar.height, 
         weight:weight?weight:buscar.weight,
         image:image?image:buscar.image},
         { where: { id:id } });

    edit? res.send("Pokemon actualizado correctamente"):res.status(404).send("No se pudo actualizar");

   } catch (error) {
    console.log(error);
   }
}
module.exports = {pokeEdit};