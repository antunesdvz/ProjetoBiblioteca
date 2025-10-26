export function adminMiddleware(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Acesso negado: apenas admins" });
  }
  next();
}
