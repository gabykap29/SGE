import bcrypt from 'bcryptjs';
import Usuario from '../models/usuarios/Usuarios.js';
import  generarJWT from '../helpers/generarJWT.js';

const MaxIntentos = 5;
let intentos = 0;

export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    try {
        const usuario = await Usuario.findOne({
            where: {
                username,
            },
        });
        if (!usuario) {
            return res.status(400).json({
                message: 'Usuario / Password no son correctos - usuario',
            });
        };
        if(usuario.estado === false){
            return res.status(400).json({
                message: 'Usuario Bloqueado!, comuniquese con un administrador!',
            });
        };

        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            intentos++;
            if(intentos >= MaxIntentos){
                usuario.estado = false;
                await usuario.save();
                return res.status(400).json({
                    message: 'Usuario Bloqueado!, comuniquese con un administrador!',
                });
            }
            return res.status(400).json({
                message: 'Usuario / Password no son correctos - password',
            });
        };
        const token = await generarJWT(usuario.id, usuario.rol_id);
        return res.status(200).json({
            usuario,
            token,
        });

    } catch (error) {
        console.log(error);
    }
};

