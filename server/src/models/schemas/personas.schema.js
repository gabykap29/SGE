import {body, validationResult} from 'express-validator';

export const validationsPersons = [
    body('dni').exists().isInt().isLength({min:7, max:8}).withMessage('Ingrese un DNI válido!'),
    body('apellido').exists().isString().isLength({min:2 }).withMessage('Ingrese un apellido válido!'),
    body('nombre').exists().isString().isLength({min:2}).withMessage('Ingrese un nombre válido!'),
    body('domicilio').exists().isLength({min:2}).withMessage('Ingrese un domicilio válido!'),
    body('localidad').exists().withMessage('Ingrese una localidad válida!'),
    body('clase').optional().isInt({min:1}).withMessage('Ingrese una clase válida!'),
    body('observaciones').optional().isString().withMessage('Ingrese observaciones válidas!'),
    body('tipo').exists().isInt().withMessage('Ingrese un vinculo de persona -- expediente válido!'),
];

export const validatePerson = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() });
};