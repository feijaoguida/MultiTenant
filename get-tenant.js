module.exports = (req, res, next) => { 
  const tenant = req.headers['tenant'];
  if (!tenant) {
    return res.status(400).json({
      message: 'Tenant is required',
    });
  }
  req.body.tenantId = parseInt(tenant);
  return next();
}