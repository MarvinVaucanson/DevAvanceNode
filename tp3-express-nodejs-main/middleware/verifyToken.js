import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(400).json({ status: 'fail', message: 'Il manque une info de token' })
    }

    const token = header.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY || 'bapt-secret')
        req.user = decoded
        next()
    } catch (err) {
        return res.status(400).json({ status: 'fail', message: 'token invalide' })
    }
}

export { verifyToken }