// // const pool = require('../services/index');
// require('dotenv').config();

// exports.getLogin = async (req, res) => {
//   const userId = req.user?.id;

//   try {
//     const [rows] = await pool.query(
//       'SELECT id, nome, email FROM usuarios WHERE id = ?', [userId]
//     );
//     if (!rows) {
//       return res.status(500).json({ message: 'Erro ao consultar clientes' });
//     }

//     return res.status(200).json({ authorization: true, getLogin: rows });
//   } catch (error) {
//     return res.status(500).json({ error: error });
//   }
// }