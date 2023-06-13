import Product from "../models/product";
import productSchema from "../validation/product";

export const getAll = async (req, res) => {
    try {
        const products = await Product.find()
        if (products.length == 0) {
            res.status(400).json({
                message: "Không có sản phẩm nào"
            })
        }
        res.status(200).json({
            message: "Tìm sản phẩm thành công",
            datas: products
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server"
        })
    }
}
export const getOne = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id)
        if (!products) {
            res.status(400).json({
                message: "Không tìm thấy sản phẩm"
            })
        }
        res.status(200).json({
            message: "Tìm sản phẩm thành công",
            datas: products
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server"
        })
    }
}

export const create = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                message: error.details[0].message,
                datas: []
            })
        }
        const products = await Product.create(req.body)
        if (!products) {
            res.status(400).json({
                message: "Không thêm được sản phẩm"
            })
        }
        res.status(200).json({
            message: "Thêm sản phẩm thành công",
            datas: products
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server"
        })
    }
}

export const update = async (req, res) => {
    try {
        const data = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (!data) {
            return res.status(400).json({
                message: "Cập nhật sản phẩm thất bại",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

export const remove = async (req, res) => {
    try {
        const products = await Product.findByIdAndDelete(req.params.id)
        if (!products) {
            res.status(400).json({
                message: "Xóa không thành công"
            })
        }
        res.status(200).json({
            message: "Xóa sản phẩm thành công",
            datas: products
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server"
        })
    }
}
