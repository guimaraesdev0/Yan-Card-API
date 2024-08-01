const connectToDatabase = require('../config/db.config');

async function getAllCupons() {
    try {
        const connection = await connectToDatabase();
        const query = `
            SELECT cuponsusados.*, restaurantes.nome AS restauranteNome
            FROM cuponsusados
            JOIN restaurantes ON cuponsusados.idrestaurante = restaurantes.id
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

async function getAllCuponsByUserId(userId) {
    try {
        if (!userId) {
            throw new Error('userId is required');
        }
        const connection = await connectToDatabase();
        const query = `
            SELECT cuponsusados.*, restaurantes.nome AS restauranteNome
            FROM cuponsusados
            JOIN restaurantes ON cuponsusados.idrestaurante = restaurantes.id
            WHERE cuponsusados.idcliente = ?
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
    getAllCupons,
    getAllCuponsByUserId
};
