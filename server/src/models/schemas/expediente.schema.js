import {body, validationResult} from 'express-validator';

export const validationsRecords = [
    body('tipo_expediente_id').exists().isInt().withMessage('Debe elegir un tipo de expediente'),
    body('orden').exists().isInt().withMessage('El número de expediente es requerido'),
    body('localidad_id').exists().isInt().withMessage('Elija una Localidad válida'),
    body('juzgado_id').exists().isInt().withMessage('Elija un Juzgado válido'),
    body('fecha_inicio').exists().isISO8601().withMessage('La fecha de inicio es requerida'),
    body('fecha_origen').exists().isISO8601().withMessage('La fecha de origen es requerida'),
    body('resumen').exists().isString().withMessage('El resumen es requerido'),
    body('secretario').exists().isString().withMessage('El secretario es requerido'),
    body('origenExpediente').exists().isInt().withMessage('El origen del expediente es requerido'),
];

export const validateRecord = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() });   
};