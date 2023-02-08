import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    
    // mengambil token dari respon json
    const token = req.headers.authorization.split(' ')[1];

    // jika token tidak ditemukan
    if (!token) {
        return res.status(400).json({
            status: 'fail',
            message: 'Access denied',
        });
    }

    try {
        const verified = jwt.verify(token, 'agjdagjsdvjhadvhacsk');
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Token tidak valid',
        })
    }
}

export default verifyToken;