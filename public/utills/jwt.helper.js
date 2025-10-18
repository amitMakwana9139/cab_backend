import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// generate token 
export const authToken = async (obj) => {
    try {
        const token = jwt.sign(obj, process.env.SECRET_KEY, {
            expiresIn: "24h",
        })
        return token;
    } catch (error) {
        return error
    }
}

// verify token
export const verifytoken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || typeof token !== "string") {
        return res.status(500).json({ status: 500, success: false, message: "You are not authorized!", data: [{ isExpire: 1 }] });
    }
    jwt.verify(
        token.replace("Bearer ", ""),
        process.env.SECRET_KEY,
        async (err, user) => {
            if (err) {
                return res.status(200).json({ status: 401, success: false, message: "User is unAuthorized!" });
            } else {
                const getUser = await User.findById({ _id: user._id })
                if (getUser) {
                    req.user = getUser;
                    next();
                }
                else {
                    return res.status(500).json({ status: 500, success: false, message: "User not found!" })
                }
            }
        }
    );
};


// generate refresh token
export const refreshToken = async (obj) => {
    try {
        const token = jwt.sign(obj, process.env.REFRESH_TOKEN_SECRETE_KEY, {
            expiresIn: "24h",
        })
        return token
    } catch (error) {
        return error
    }
}

// Verify refresh token
export const refreshVerifytoken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || typeof token !== "string") {
        return res.json({ success: false, message: "You are not authorized!" });
    }
    jwt.verify(
        token.replace("Bearer ", ""),
        process.env.REFRESH_TOKEN_SECRETE_KEY,
        (err, user) => {
            if (err) {
                return res.send("token is not valid");
            }
            req.user = user;
            next();
        }
    );
};