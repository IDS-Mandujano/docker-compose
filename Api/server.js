const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get('/', (req, res) => {
    res.json({ message: '¡La API está viva y funcionando!' });
});

app.get('/Mandujano', async (req, res) => {
    try {
        const sqlQuery = 'SELECT Nombres, ApellidoP, ApellidoM FROM datosusuario WHERE idDatosUsuario = 1';
        const [rows] = await pool.execute(sqlQuery);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        const usuario = rows[0];
        const nombreCompleto = `${usuario.Nombres} ${usuario.ApellidoP} ${usuario.ApellidoM}`;

        res.status(200).json({
            nombreCompleto: nombreCompleto,
            mensaje: 'Datos del usuario obtenidos exitosamente desde la base de datos.'
        });

    } catch (error) {
        console.error('❌ Error en el endpoint /Mandujano:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor.', 
            details: 'No se pudo comunicar con la base de datos.' 
        });
    }
});

async function startServer() {
    try {
        await pool.query('SELECT 1');
        console.log('✅ Conexión a la base de datos MySQL establecida correctamente.');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor API escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('❌ No se pudo conectar a la base de datos al iniciar. Error:', error.message);
        process.exit(1);
    }
}

startServer();