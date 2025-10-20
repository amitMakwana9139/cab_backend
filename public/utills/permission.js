export const checkPermission = (module, action) => {
    return (req, res, next) => {
        const user = req.user; // assuming you set req.user from JWT middleware

        if (user.role === "superAdmin") return next(); // full access

        const hasAccess = user?.permissions?.[module]?.[action];

        if (!hasAccess) {
            return res.status(403).json({ message: "Permission denied!" });
        }

        next();
    };
};
