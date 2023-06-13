import Joi from "joi";

const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5),
    confirmPassword: Joi.string().required().valid(Joi.ref("password"))
})
const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(5),
})

export { signUpSchema, signInSchema }