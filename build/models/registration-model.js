"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registration = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const registrationSchema = new mongoose_1.default.Schema({
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
        maxLength: 200
    },
    registrant: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    session: {
        type: String,
        required: true,
        maxLength: 100
    },
    semester: {
        type: String,
        required: true,
        enum: ['Harmattan', 'Rain']
    },
    courses: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        }]
});
/* registrationSchema.statics.Create = (registrationData: RegistrationType) => {
    return new Registration(registrationData)
}



const Registration = mongoose.model<RegistrationDoc, RegistrationModel>('Registration', registrationSchema) //Second parameter will put into consideration all we did to the drone schema before binding

*/
const Registration = mongoose_1.default.model('Registration', registrationSchema);
exports.Registration = Registration;
