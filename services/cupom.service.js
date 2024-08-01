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
        console.log('Executing query:', query);
        const [rows] = await connection.query(query);
        console.log('Query result:', rows);
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
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
        console.log('Executing query with userId:', userId);
        console.log('Query:', query);
        const [rows] = await connection.query(query, [userId]);
        console.log('Query result:', rows);
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw new Error(error);
    }
}

module.exports = {
    getAllUsedCupons,
    getAllUsedCuponsByUserId
};
