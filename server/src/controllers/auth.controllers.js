import bcrypt from 'bcryptjs';
import Usuario from '../models/usuarios/Usuarios.js';
import  generarJWT from '../helpers/generarJWT.js';
import Rol from '../models/usuarios/Roles.js';
import Permisos from '../models/usuarios/Permisos.js';

const MaxIntentos = 5;
let intentos = 0;

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const usuario = await Usuario.findOne({
            where: {
                username,
            },
            include:{
                model: Rol,
                as: 'rol',
                include: {
                    model: Permisos,
                    as: 'permisos'
                },
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
        console.log(usuario);
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
        let permisos = [];
        usuario.rol.permisos.forEach(permiso => {
            permisos.push(permiso.nombre);
        });
        const token = await generarJWT(usuario.id, usuario.rol_id);
        const cookieExpires = process.env.CookiesExpireTime || 1;

        const ExpirationEnd = new Date(Date.now() + cookieExpires * 60 * 60 * 1000);

        const cookiesOptions = {
            expires: ExpirationEnd,
            httpOnly: true,
            sameSite: "strict",
          };
          res.cookie('userSession', token, cookiesOptions);
          res.cookie('username',usuario.username)
        return res.status(200).json({
            message:'Inicio de sesion exitoso!',
            permisos:permisos,
            rol:usuario.rol.nombre,
            fullname: usuario.nombre + ' ' + usuario.apellido,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Hable con el administrador',
        });
    }
};

export const cerrarSesion = async (req, res) => {
    res.clearCookie('userSession');
    return res.status(200).json({
        message: 'Sesion cerrada!'
    });
};