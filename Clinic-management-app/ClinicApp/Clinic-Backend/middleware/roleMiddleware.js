

const roleMiddleware = (allowedRole)=>{
    return (req, res, next)=>{
        const userRole = req.user?.role;
        if(!allowedRole.includes(userRole)){
            return res.status(403).json({error : 'Access denied, not permitted'})
        }
        next();
    };
};

module.exports = roleMiddleware;