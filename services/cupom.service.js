const connectToDatabase = require('../config/db.config');

async function getAllUsedCupons() {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.query(`SELECT * FROM cuponsusados`)
        return rows;
    } catch (error) {
        throw new Error(error);
    }

}

async function getAllUsedCuponsByUserId(userId) {
    try {
       const connection = await connectToDatabase();
       const [rows] = await connection.query(`SELECT * FROM cuponsusados WHERE idcliente = ?`, [userId]);
       return rows;
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getAllUsedCupons,
    getAllUsedCuponsByUserId
}