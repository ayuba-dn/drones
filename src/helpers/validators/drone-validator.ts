
import {body} from 'express-validator'

 const DroneValidator = [
    body('weight')
    .isFloat({ min: 0, max: 500 }),

    body('battery')
    .isFloat(),

    body('serialNumber')
    .isLength({ min: 0, max:100 })
    .withMessage('Serial Number Should Not Exceed 100 characters'),

    body('model')
    .isString(),

    body('state')
    .isString(),
]


export default DroneValidator