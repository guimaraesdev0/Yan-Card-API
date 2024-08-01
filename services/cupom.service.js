const connectToDatabase = require('../config/db.config');

async function getAllUsedCupons() {
    try {
        const connection = await connectToDatabase();
        const query = `
            SELECT cuponsusados.*, restaurantes.nome AS restauranteNome
            FROM cuponsusados
            JOIN restaurantes ON cuponsusados.idrestaurante = restaurantes.id
            WHERE cuponsusados.usado = 1
        `;
        const [rows] = await connection.query(query);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}

async function getAllUsedCuponsByUserId(userId) {
    try {
        const connection = await connectToDatabase();
        const query = `
            SELECT cuponsusados.*, restaurantes.nome AS restauranteNome
            FROM cuponsusados
            JOIN restaurantes ON cuponsusados.idrestaurante = restaurantes.id
            WHERE cuponsusados.idcliente = ? AND cuponsusados.usado = 1
        `;
        const [rows] = await connection.query(query, [userId]);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getAllUsedCupons,
    getAllUsedCuponsByUserId
};
