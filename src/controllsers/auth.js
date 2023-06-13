import User from '../models/auth'
import { signInSchema, signUpSchema } from '../validation/auth';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const signUp = async (req, res) => {
    try {
        const { email, password } = req.body
        const { error } = signUpSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                datas: [],
            })
        }
        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            return res.status(400).json({
                message: "Email đã tồn tại"
            })
        }
        const hashedPassword = await bcryptjs.hash(password, 10)
        const user = await User.create({
            ...req.body,
            password: hashedPassword
        });
        return res.status(200).json({
            message: "Đăng kí thành công",
            datas: user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server"
        })
    }
}
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const { error } = signInSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                datas: [],
            })
        }
        const checkEmail = await User.findOne({ email })
        if (!checkEmail) {
            return res.status(400).json({
                message: "Email không tồn tại"
            })
        }
        const checkPassword = await bcryptjs.compare(password, checkEmail.password)
        if (!checkPassword) {
            return res.status(200).json({
                message: "Mật khẩu không chính xác",
            })
        }
        const token = jwt.sign({ id: checkEmail._id }, "svfpoly", { expiresIn: "1d" })
        return res.status(200).json({
            message: "Đăng nhập thành công",
            datas: {
                ...checkEmail,
                token: token
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server"
        })
    }
}