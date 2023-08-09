function ip(req, res, next) {
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  req.clientIp =
    typeof clientIp === "string" ? clientIp.split(",")[0] : undefined;
  next();
}

module.exports = ip;
