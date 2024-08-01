const connectToDatabase = require('../config/db.config');

async function getAllCupons() {
    try {
        const connection = await connectToDatabase();
        const query = `
            SELECT cuponsusados.*, restaurantes.nome AS restauranteNome
            FROM cuponsusados
            JOIN restaurantes ON cuponsusados.idrestaurante = restaurantes.id
        `;
        const [rows] = await connection.query(query);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}

async function getAllCuponsByUserId(userId) {
    try {
        const connection = await connectToDatabase();
        const query = `
            SELECT cuponsusados.*, restaurantes.nome AS restauranteNome
            FROM cuponsusados
            JOIN restaurantes ON cuponsusados.idrestaurante = restaurantes.id
            WHERE cuponsusados.idcliente = ?
        `;
        const [rows] = await connection.query(query, [userId]);
        return rows;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getAllCupons,
    getAllCuponsByUserId
};
