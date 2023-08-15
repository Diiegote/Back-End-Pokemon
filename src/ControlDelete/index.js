const { Pokemon } = require("../db");

const eliminar = async (req, res) => {
    const { id } = req.params;
    try {
        const elimina = await Pokemon.destroy({ where: { id } });
        elimina ? res.send("Pokemon eliminado correctamente") : res.status(404).send("No se pudo eliminar")

    } catch (error) {
        console.error(error)
    }
}
module.exports = { eliminar };