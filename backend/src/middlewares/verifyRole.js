export const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        message: `Acceso denegado. Requiere rol: ${allowedRoles.join(", ")}`,
      });
    }
    next();
  };
};
// le paso el rol por parametro 