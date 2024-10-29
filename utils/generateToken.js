import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
    res.cookie("token", token, {
        httpOnly: true,// client side js cannot access the cookie prevents xss attack
        sameSite: "strict",// CSRF attack
        maxAge: 15* 24 * 60 * 60 * 1000, // 15 day in milliseconds
        secure: process.env.NODE_ENV === "production" ? true : false
    });
}

export default generateTokenAndSetCookie;