const checkRole = (role) => {

    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(400).json({
                status: 'fail',
                message: `Seul un : ${role} peux utiliser cette route`
            });
        }
        next()
    }
}

export { checkRole }