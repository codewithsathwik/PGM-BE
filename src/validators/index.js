import { body } from "express-validator";

const userRegisterValidator = () => {
    return [
        body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Email is invalid"),
        body("username").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Email is invalid")
    ]
}


export {userRegisterValidator}