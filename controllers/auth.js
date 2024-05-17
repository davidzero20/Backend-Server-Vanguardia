const Usuario = require('../models/usuario');

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida'
            });
        }

        res.json({
            ok: true,
            msg: 'credenciales correctas'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error con el login'
        });
    }
}

module.exports = { login };