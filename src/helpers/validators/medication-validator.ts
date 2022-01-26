
import {body} from 'express-validator'

 const DroneValidator = [
    body('name')
    .isString()
    .notEmpty()
    .matches(/^[A-Za-z0-9 - _]+$/)
    .withMessage("Please enter a valid name allowed only letters, numbers,- and _"),

    body('weight')
    .isFloat()
    .notEmpty()
    .withMessage("THe Weight field is required"),

    body('serialNumber')
    .isLength({ min: 0, max:100 })
    .withMessage('Serial Number Should Not Exceed 100 characters'),

    body('code')
    .isString()
    .notEmpty()
    .matches(/^[A-Za-z0-9  _]+$/)
    .withMessage("Please enter a valid name allowed only letters, numbers, and underscore"),

    body('image')
    .isString()
    .notEmpty(),
]


export default DroneValidator